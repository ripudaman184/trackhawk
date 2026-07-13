/* TrackHawk — shell: gate, routing, sync status, settings */

const UI = (() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  function toast(msg, bad) {
    const t = $("#toast");
    t.textContent = msg;
    t.className = "toast" + (bad ? " bad" : "");
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.add("is-hidden"), 2400);
  }
  function openModal(sel) {
    $("#veil").classList.remove("is-hidden");
    $(sel).classList.remove("is-hidden");
  }
  function closeModals() {
    $("#veil").classList.add("is-hidden");
    $$(".modal").forEach(m => m.classList.add("is-hidden"));
  }
  return {toast, openModal, closeModals};
})();

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* --------------------------------------------------------------- gate */
  let pairMode = "github";

  function showGate() {
    $("#gate").classList.remove("is-hidden");
    $("#app").classList.add("is-hidden");
    const paired = TH.isPaired();
    $("#unlock-form").classList.toggle("is-hidden", !paired);
    $("#pair-form").classList.toggle("is-hidden", paired);
    if (paired) setTimeout(() => $("#unlock-pass").focus(), 60);
  }

  function enterApp() {
    $("#gate").classList.add("is-hidden");
    $("#app").classList.remove("is-hidden");
    JOBS.seedSnippets();
    JOBS.render();
    CARDS.render();
    TH.startSync(10);
    badge("ok", TH.S.mode === "github" ? "synced" : "local");
  }

  $("#mode-seg").onclick = e => {
    const b = e.target.closest(".seg-btn"); if (!b) return;
    $$("#mode-seg .seg-btn").forEach(x => x.classList.toggle("is-on", x === b));
    pairMode = b.dataset.mode;
    $("#gh-fields").classList.toggle("is-hidden", pairMode !== "github");
  };

  $("#pair-form").onsubmit = async e => {
    e.preventDefault();
    const err = $("#pair-err");
    err.textContent = "";
    const p1 = $("#pair-pass").value, p2 = $("#pair-pass2").value;
    if (p1.length < 8) { err.textContent = "Use at least 8 characters."; return; }
    if (p1 !== p2) { err.textContent = "The two passwords don't match."; return; }
    const owner = $("#pair-owner").value.trim();
    const repo = $("#pair-repo").value.trim();
    const token = $("#pair-token").value.trim();
    if (pairMode === "github" && (!owner || !repo || !token)) {
      err.textContent = "Owner, repo and token are all needed for GitHub sync.";
      return;
    }
    err.textContent = "Creating the vault…";
    try {
      await TH.pair({password: p1, token, owner, repo, mode: pairMode,
                     path: "trackhawk.enc.json", branch: "main"});
      enterApp();
    } catch (ex) { err.textContent = ex.message; }
  };

  $("#unlock-form").onsubmit = async e => {
    e.preventDefault();
    const err = $("#unlock-err");
    err.textContent = "Decrypting…";
    try {
      await TH.unlock($("#unlock-pass").value);
      $("#unlock-pass").value = "";
      err.textContent = "";
      enterApp();
    } catch (ex) { err.textContent = ex.message; }
  };

  $("#reset-device").onclick = () => {
    if (!confirm("This clears the vault and token from THIS device only. Your data stays in the repo. Continue?")) return;
    TH.cfg.clear();
    location.reload();
  };

  /* -------------------------------------------------------------- chrome */
  $("#tabs").onclick = e => {
    const t = e.target.closest(".tab"); if (!t) return;
    $$(".tab").forEach(x => x.classList.toggle("is-active", x === t));
    $("#view-jobs").classList.toggle("is-hidden", t.dataset.view !== "jobs");
    $("#view-cards").classList.toggle("is-hidden", t.dataset.view !== "cards");
    if (t.dataset.view === "cards") CARDS.render();
  };

  $("#subtabs").onclick = e => {
    const t = e.target.closest(".subtab"); if (!t) return;
    $$(".subtab").forEach(x => x.classList.toggle("is-active", x === t));
    ["board", "insights", "library"].forEach(s =>
      $("#sub-" + s).classList.toggle("is-hidden", s !== t.dataset.sub));
  };

  $("#btn-lock").onclick = () => { TH.stopSync(); TH.lock(); showGate(); };

  $("#veil").onclick = UI.closeModals;
  $$("[data-close]").forEach(b => b.onclick = UI.closeModals);
  document.addEventListener("keydown", e => { if (e.key === "Escape") UI.closeModals(); });

  /* ------------------------------------------------------------ settings */
  $("#btn-settings").onclick = () => {
    const c = TH.S.cfg;
    const jobs = TH.list("jobs").length, cards = TH.list("cards").length,
          docs = TH.list("docs").length;
    $("#settings-info").innerHTML = `
      mode <b>${TH.S.mode === "github" ? "GitHub sync" : "this device only"}</b><br>
      ${TH.S.mode === "github" ? `repo <b>${c.owner}/${c.repo}</b><br>file <b>${c.path}</b><br>` : ""}
      encryption <b>AES-256-GCM · PBKDF2 310k</b><br>
      ${jobs} jobs · ${cards} cards · ${docs} library items`;
    UI.openModal("#settings-modal");
  };
  $("#force-pull").onclick = async () => {
    try { const moved = await TH.pull(); UI.toast(moved ? "Pulled changes" : "Already up to date"); }
    catch (e) { UI.toast(e.message, true); }
  };
  $("#force-push").onclick = async () => {
    try { await TH.save("trackhawk: manual push"); UI.toast("Pushed"); }
    catch (e) { UI.toast(e.message, true); }
  };
  $("#export-data").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(TH.exportJSON());
    a.download = `trackhawk-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };
  $("#wipe-device").onclick = () => {
    if (!confirm("Unpair this device? The encrypted data stays in your repo — you can pair again with the same password.")) return;
    TH.cfg.clear();
    location.reload();
  };

  /* ---------------------------------------------------------- sync badge */
  function badge(cls, text) {
    const b = $("#sync-badge");
    b.className = "sync " + cls;
    b.textContent = text;
  }

  TH.on(evt => {
    if (evt === "sync")  badge("busy", "syncing");
    if (evt === "saved") badge("ok", TH.S.mode === "github" ? "synced" : "saved");
    if (evt === "error") badge("bad", "offline");
    if (evt === "change" || evt === "saved") {
      if (!$("#app").classList.contains("is-hidden")) {
        JOBS.render();
        if (!$("#view-cards").classList.contains("is-hidden")) CARDS.render();
      }
    }
  });

  window.addEventListener("online",  () => badge("ok", "online"));
  window.addEventListener("offline", () => badge("bad", "offline"));

  /* auto-lock after 30 min in the background */
  let awayAt = null;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) awayAt = Date.now();
    else if (awayAt && Date.now() - awayAt > 30 * 60 * 1000 && TH.S.key) {
      TH.stopSync(); TH.lock(); showGate();
    }
  });

  /* ---------------------------------------------------------------- boot */
  JOBS.init();
  CARDS.init();
  showGate();
})();
