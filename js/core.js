/* TrackHawk — core: encryption vault + GitHub-as-database sync
   ------------------------------------------------------------
   Nothing leaves this device unencrypted. The password never leaves the device
   at all; it derives an AES-GCM key via PBKDF2, and only ciphertext is ever
   written to GitHub.                                                          */

const TH = (() => {

  /* ---------------------------------------------------------------- crypto */
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const PBKDF2_ROUNDS = 310000;

  /* Chunked on purpose: String.fromCharCode(...bytes) spreads every byte as an
     argument, so a 250 KB file blows the call stack. Real resumes are bigger
     than that. Walk it in 32 KB slices instead.                               */
  const b64 = {
    from(buf) {
      const bytes = new Uint8Array(buf);
      const CHUNK = 0x8000;
      let s = "";
      for (let i = 0; i < bytes.length; i += CHUNK) {
        s += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
      }
      return btoa(s);
    },
    to: str => Uint8Array.from(atob(str), c => c.charCodeAt(0)),
  };

  async function deriveKey(password, salt) {
    const base = await crypto.subtle.importKey(
      "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      {name: "PBKDF2", salt, iterations: PBKDF2_ROUNDS, hash: "SHA-256"},
      base,
      {name: "AES-GCM", length: 256},
      false,
      ["encrypt", "decrypt"],
    );
  }

  /* envelope = { v, salt, iv, ct }  — safe to store anywhere, including a repo */
  async function seal(key, salt, obj) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt(
      {name: "AES-GCM", iv}, key, enc.encode(JSON.stringify(obj)));
    return {v: 1, salt: b64.from(salt), iv: b64.from(iv), ct: b64.from(ct)};
  }

  async function open(key, env) {
    const pt = await crypto.subtle.decrypt(
      {name: "AES-GCM", iv: b64.to(env.iv)}, key, b64.to(env.ct));
    return JSON.parse(dec.decode(pt));
  }

  /* raw bytes (resume PDFs) get their own envelope so the main file stays small */
  async function sealBytes(key, salt, bytes) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({name: "AES-GCM", iv}, key, bytes);
    return {v: 1, salt: b64.from(salt), iv: b64.from(iv), ct: b64.from(ct)};
  }
  async function openBytes(key, env) {
    return new Uint8Array(await crypto.subtle.decrypt(
      {name: "AES-GCM", iv: b64.to(env.iv)}, key, b64.to(env.ct)));
  }

  /* ------------------------------------------------------------ local vault */
  /* The GitHub token lives here, encrypted with the same password. It never
     goes into the repo, so the repo is useless to anyone who steals it.      */
  const VAULT_KEY = "trackhawk.vault";
  const CFG_KEY   = "trackhawk.cfg";     // non-secret: repo, path, mode

  const cfg = {
    get()  { try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
             catch { return {}; } },
    set(o) { localStorage.setItem(CFG_KEY, JSON.stringify({...cfg.get(), ...o})); },
    clear(){ localStorage.removeItem(CFG_KEY); localStorage.removeItem(VAULT_KEY);
             localStorage.removeItem(LOCAL_DATA); },
  };
  const LOCAL_DATA = "trackhawk.data";   // used only in local-only mode

  const isPaired = () => !!localStorage.getItem(VAULT_KEY);

  /* ------------------------------------------------------------ github i/o */
  const GH = {
    async req(path, opts = {}) {
      const res = await fetch(`https://api.github.com${path}`, {
        ...opts,
        headers: {
          "Authorization": `Bearer ${S.token}`,
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(opts.headers || {}),
        },
      });
      if (res.status === 404) return null;
      if (res.status === 401 || res.status === 403) {
        throw new Error("GitHub rejected the token. Check it has Contents: read & write on the data repo.");
      }
      if (res.status === 409 || res.status === 422) {
        const e = new Error("conflict"); e.conflict = true; throw e;
      }
      if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 140)}`);
      return res.json();
    },

    /* The Contents API refuses to inline anything over 1 MB — it returns the
       metadata with an empty body and encoding:"none". The sha is still there,
       and the Blobs API will serve the same file up to 100 MB. So: try the
       cheap path, fall back to blobs when the vault outgrows it.             */
    async getFile(path) {
      const {owner, repo} = S.cfg;
      const j = await GH.req(`/repos/${owner}/${repo}/contents/${path}?ref=${S.cfg.branch || "main"}`);
      if (!j) return null;
      if (!j.content || j.encoding === "none") {
        return {sha: j.sha, json: await GH.getBlob(j.sha)};
      }
      return {sha: j.sha, json: JSON.parse(atob(j.content.replace(/\n/g, "")))};
    },

    async putFile(path, obj, sha, message) {
      const {owner, repo} = S.cfg;
      const body = {
        message: message || "trackhawk: update",
        content: b64.from(enc.encode(JSON.stringify(obj))),
        branch: S.cfg.branch || "main",
      };
      if (sha) body.sha = sha;
      const j = await GH.req(`/repos/${owner}/${repo}/contents/${path}`, {
        method: "PUT", body: JSON.stringify(body),
      });
      /* A 404 on a write means the token can't reach this repo — GitHub hides
         private repos behind 404 rather than 403. Don't let that surface as a
         null-pointer error three layers up.                                   */
      if (!j || !j.content) {
        throw new Error(
          `GitHub won't let this token write to ${owner}/${repo}. Regenerate a ` +
          `fine-grained token with Repository access = Only select repositories ` +
          `→ ${repo}, and Repository permissions → Contents = Read and write.`);
      }
      return j.content.sha;
    },

    /* the Contents API caps reads at 1 MB, so attachments come back via blobs */
    async getBlob(sha) {
      const {owner, repo} = S.cfg;
      const j = await GH.req(`/repos/${owner}/${repo}/git/blobs/${sha}`);
      return JSON.parse(atob(j.content.replace(/\n/g, "")));
    },

    /* just the sha — used to detect "did the other device push?" cheaply */
    async headSha(path) {
      const {owner, repo} = S.cfg;
      const j = await GH.req(
        `/repos/${owner}/${repo}/commits?path=${encodeURIComponent(path)}&per_page=1&sha=${S.cfg.branch || "main"}`);
      return j && j.length ? j[0].sha : null;
    },

    async whoami() {
      const j = await GH.req("/user");
      return j && j.login;
    },

    /* Does this token actually reach this repo, and can it write?
       /user succeeds for ANY valid token, so it proves nothing on its own. */
    async checkRepo() {
      const {owner, repo} = S.cfg;
      const j = await GH.req(`/repos/${owner}/${repo}`);
      if (!j) {
        throw new Error(
          `Can't see ${owner}/${repo} with this token. Either the repo name is wrong, ` +
          `or the token wasn't scoped to it — regenerate it with Repository access = ` +
          `Only select repositories → ${repo}.`);
      }
      if (j.permissions && j.permissions.push === false) {
        throw new Error(
          `This token can read ${owner}/${repo} but not write to it. Set Repository ` +
          `permissions → Contents = Read and write.`);
      }
      return j.default_branch || "main";
    },
  };

  /* ------------------------------------------------------------ data model */
  /* Every record carries `at` (epoch ms) and an optional `del` tombstone.
     Merging two devices is then a per-record last-write-wins — no clobbering
     of the whole file when both sides edited different things.               */
  const EMPTY = () => ({
    v: 1,
    jobs: {},      // id -> job
    docs: {},      // id -> document (resume / cover / snippet), file lives separately
    decks: {},     // id -> {name}
    cards: {},     // id -> {deckId, section, q, ...}
    progress: {},  // cardId -> {known, reps, at}
    tasks: {},     // roadmap taskId -> {done, at}
    prefs: {},
  });

  const MAPS = ["jobs", "docs", "decks", "cards", "progress", "tasks"];

  function merge(a, b) {
    const out = EMPTY();
    out.prefs = {...(a.prefs || {}), ...(b.prefs || {})};
    for (const m of MAPS) {
      const ids = new Set([...Object.keys(a[m] || {}), ...Object.keys(b[m] || {})]);
      for (const id of ids) {
        const x = (a[m] || {})[id], y = (b[m] || {})[id];
        if (!x) { out[m][id] = y; continue; }
        if (!y) { out[m][id] = x; continue; }
        out[m][id] = (y.at || 0) >= (x.at || 0) ? y : x;
      }
    }
    return out;
  }

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const now = () => Date.now();

  /* ---------------------------------------------------------------- session */
  const S = {
    pw: null,           // password, memory only — needed to re-derive per-salt
    key: null,          // data key (from the salt inside the repo file)
    salt: null,
    vaultKey: null,     // device-local key, for the token vault
    vaultSalt: null,
    token: null,        // GitHub PAT, memory only
    cfg: {},
    data: EMPTY(),
    sha: null,          // sha of the state file we last read
    mode: "local",      // "github" | "local"
    dirty: false,
    syncing: false,
    listeners: new Set(),
  };

  /* The salt lives INSIDE the encrypted file, not on the device. Every device
     must derive its data key from that same salt, or device B would generate a
     fresh salt, derive a different key, and fail to read anything device A
     wrote. So: adopt the file's salt whenever we open one.                    */
  async function adoptSalt(env) {
    const salt = b64.to(env.salt);
    const same = S.salt && salt.length === S.salt.length &&
                 salt.every((v, i) => v === S.salt[i]);
    if (!same) {
      S.salt = salt;
      S.key = await deriveKey(S.pw, salt);
    }
  }

  const on = fn => { S.listeners.add(fn); return () => S.listeners.delete(fn); };
  const emit = (evt = "change") => S.listeners.forEach(f => f(evt));

  /* ------------------------------------------------------------ pair / unlock */
  /* First run on a device: password + (optional) GitHub token + repo.
     The token is encrypted with the password and kept on THIS device only.   */
  async function pair({password, token, owner, repo, path, branch, mode}) {
    /* two independent salts:
       - vaultSalt: device-local, protects the GitHub token in localStorage
       - salt:      protects the data. If the repo already has a file, we adopt
                    ITS salt in load(); this fresh one is only used if we're the
                    first device to ever write.                                */
    const vaultSalt = crypto.getRandomValues(new Uint8Array(16));
    const vaultKey = await deriveKey(password, vaultSalt);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(password, salt);

    S.pw = password;
    S.vaultKey = vaultKey; S.vaultSalt = vaultSalt;
    S.key = key; S.salt = salt;
    S.token = token || "";
    S.cfg = {owner, repo, path: path || "trackhawk.enc.json",
             branch: branch || "main", mode};
    S.mode = mode;

    try {
      if (mode === "github") {
        const login = await GH.whoami();
        if (!login) {
          throw new Error("That token didn't work. Generate a fine-grained token with Contents: read & write.");
        }
        S.cfg.branch = await GH.checkRepo();
      }

      const vault = await seal(vaultKey, vaultSalt, {token: token || "", check: "trackhawk"});
      localStorage.setItem(VAULT_KEY, JSON.stringify(vault));
      cfg.set(S.cfg);

      await load();
      return true;
    } catch (e) {
      localStorage.removeItem(VAULT_KEY);
      S.pw = null; S.key = null; S.token = null; S.data = EMPTY(); S.sha = null;
      throw e;
    }
  }

  async function unlock(password) {
    const vault = JSON.parse(localStorage.getItem(VAULT_KEY) || "null");
    if (!vault) throw new Error("This device isn't set up yet.");
    const vaultSalt = b64.to(vault.salt);
    const vaultKey = await deriveKey(password, vaultSalt);
    let payload;
    try { payload = await open(vaultKey, vault); }
    catch { throw new Error("Wrong password."); }
    if (payload.check !== "trackhawk") throw new Error("Wrong password.");

    S.pw = password;
    S.vaultKey = vaultKey; S.vaultSalt = vaultSalt;
    S.token = payload.token;
    S.cfg = cfg.get(); S.mode = S.cfg.mode || "local";

    /* start from the vault's salt; load() will adopt the data file's salt */
    S.salt = vaultSalt;
    S.key = await deriveKey(password, vaultSalt);

    await load();
    return true;
  }

  function lock() {
    S.pw = null; S.key = null; S.vaultKey = null;
    S.token = null; S.data = EMPTY(); S.sha = null;
    emit("lock");
  }

  /* ---------------------------------------------------------------- load/save */
  async function load() {
    if (S.mode === "local") {
      const raw = localStorage.getItem(LOCAL_DATA);
      if (raw) {
        const env = JSON.parse(raw);
        await adoptSalt(env);
        S.data = await open(S.key, env);
      } else {
        S.data = EMPTY();
      }
      emit();
      return;
    }
    const f = await GH.getFile(S.cfg.path);
    if (!f) {                       // first ever write — our fresh salt stands
      S.data = EMPTY(); S.sha = null;
      await save("trackhawk: create vault");
    } else {
      S.sha = f.sha;
      await adoptSalt(f.json);      // every device converges on the file's salt
      try {
        S.data = await open(S.key, f.json);
      } catch {
        throw new Error(
          "Couldn't decrypt the data in your repo. That means this password isn't the " +
          "one the vault was created with — use the same password you set on your first device.");
      }
    }
    emit();
  }

  /* Save = pull, merge, push. If the remote moved under us (the phone pushed
     while the laptop was writing), GitHub rejects the stale sha and we retry
     on top of the newer state, so nothing is lost either way.                */
  async function save(message, attempt = 0) {
    if (!S.key) return;
    if (S.mode === "local") {
      localStorage.setItem(LOCAL_DATA, JSON.stringify(await seal(S.key, S.salt, S.data)));
      S.dirty = false; emit("saved");
      return;
    }
    try {
      S.syncing = true; emit("sync");
      const remote = await GH.getFile(S.cfg.path);
      if (remote && remote.sha !== S.sha) {
        await adoptSalt(remote.json);
        S.data = merge(await open(S.key, remote.json), S.data);
      }
      const env = await seal(S.key, S.salt, S.data);
      S.sha = await GH.putFile(S.cfg.path, env, remote ? remote.sha : null, message);
      S.dirty = false;
      S.syncing = false;
      emit("saved");
    } catch (e) {
      S.syncing = false;
      if (e.conflict && attempt < 3) return save(message, attempt + 1);
      S.dirty = true;
      emit("error");
      throw e;
    }
  }

  /* Pull: cheap poll used by the sync loop. Only decrypts when the sha moved. */
  async function pull() {
    if (!S.key || S.mode === "local" || S.syncing) return false;
    const f = await GH.getFile(S.cfg.path);
    if (!f || f.sha === S.sha) return false;
    await adoptSalt(f.json);
    S.data = merge(S.data, await open(S.key, f.json));
    S.sha = f.sha;
    emit();
    return true;
  }

  /* ------------------------------------------------------------ attachments */
  /* Accepts a File (resume upload) or {bytes, name, type} (a scan pulled out of
     a deck HTML). Either way it is encrypted before it leaves this function.  */
  async function putAttachment(input) {
    let bytes, name, type;
    if (input instanceof Blob) {
      bytes = new Uint8Array(await input.arrayBuffer());
      name = input.name || "file";
      type = input.type;
    } else {
      bytes = input.bytes;
      name = input.name || "file";
      type = input.type || "application/octet-stream";
    }
    const env = await sealBytes(S.key, S.salt, bytes);
    const id = uid();
    const meta = {id, name, size: bytes.length, type};
    if (S.mode === "local") {
      localStorage.setItem("trackhawk.file." + id, JSON.stringify(env));
      return meta;
    }
    const path = `files/${id}.enc`;
    meta.sha = await GH.putFile(path, env, null, `trackhawk: add ${name}`);
    meta.path = path;
    return meta;
  }

  /* data:image/png;base64,… → raw bytes */
  function dataUrlToBytes(dataUrl) {
    const [head, b64s] = String(dataUrl).split(",");
    const type = (head.match(/data:([^;]+)/) || [, "application/octet-stream"])[1];
    return {bytes: b64.to(b64s), type};
  }

  async function getAttachment(meta) {
    let env;
    if (S.mode === "local") {
      env = JSON.parse(localStorage.getItem("trackhawk.file." + meta.id));
    } else {
      env = await GH.getBlob(meta.sha);
    }
    const bytes = await openBytes(S.key, env);
    return new Blob([bytes], {type: meta.type || "application/octet-stream"});
  }

  /* -------------------------------------------------------------- mutations */
  function put(map, rec, message) {
    rec.at = now();
    if (!rec.id) rec.id = uid();
    S.data[map][rec.id] = rec;
    emit();
    save(message || `trackhawk: update ${map}`).catch(() => {});
    return rec;
  }

  function drop(map, id) {
    S.data[map][id] = {id, at: now(), del: true};
    emit();
    save(`trackhawk: delete ${map}`).catch(() => {});
  }

  const list = map => Object.values(S.data[map] || {}).filter(r => !r.del);

  /* ------------------------------------------------------------- sync loop */
  let timer = null;
  function startSync(seconds = 10) {
    stopSync();
    if (S.mode === "local") return;
    timer = setInterval(() => pull().catch(() => {}), seconds * 1000);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
  }
  function onFocus() { if (!document.hidden) pull().catch(() => {}); }
  function stopSync() {
    clearInterval(timer);
    window.removeEventListener("focus", onFocus);
    document.removeEventListener("visibilitychange", onFocus);
  }

  /* ------------------------------------------------------------ export/import */
  function exportJSON() {
    return new Blob([JSON.stringify(S.data, null, 2)], {type: "application/json"});
  }
  async function importJSON(obj) {
    S.data = merge(S.data, obj);
    await save("trackhawk: import");
    emit();
  }

  return {
    S, on, emit, uid, now,
    cfg, isPaired, pair, unlock, lock,
    load, save, pull, startSync, stopSync,
    put, drop, list,
    putAttachment, getAttachment, dataUrlToBytes,
    exportJSON, importJSON,
  };
})();
