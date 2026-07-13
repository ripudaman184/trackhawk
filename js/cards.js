/* TrackHawk — flashcards: decks → sections → cards, same deck design as your DSA set */

const CARDS = (() => {

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g,
    c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));

  const st = {deck: null, section: "All", order: [], idx: 0, flipped: false};

  /* ------------------------------------------------------------- decks */
  function decks() { return TH.list("decks"); }

  function ensureDeck() {
    if (!decks().length) {
      const id = TH.uid();
      TH.S.data.decks[id] = {id, name: "DSA", at: TH.now()};
      TH.save("trackhawk: first deck").catch(() => {});
    }
    if (!st.deck || !TH.S.data.decks[st.deck] || TH.S.data.decks[st.deck].del) {
      st.deck = decks()[0].id;
    }
  }

  const deckCards = () => TH.list("cards").filter(c => c.deckId === st.deck);
  const sections = () => ["All", ...new Set(deckCards().map(c => c.section).filter(Boolean))];

  /* ------------------------------------------------------------- render */
  function render() {
    ensureDeck();

    $("#deck-select").innerHTML = decks()
      .map(d => `<option value="${d.id}" ${d.id === st.deck ? "selected" : ""}>${esc(d.name)}</option>`).join("");
    $("#section-list").innerHTML = sections().filter(s => s !== "All")
      .map(s => `<option value="${esc(s)}">`).join("");

    const all = deckCards();
    $("#deck-empty").classList.toggle("is-hidden", all.length > 0);
    $("#deck-study").classList.toggle("is-hidden", all.length === 0);
    if (!all.length) return;

    $("#sections").innerHTML = sections().map(s =>
      `<button class="chip ${s === st.section ? "is-on" : ""}" data-s="${esc(s)}">${esc(s)}</button>`).join("");
    $$("#sections .chip").forEach(b => b.onclick = () => {
      st.section = b.dataset.s; buildOrder(); render();
    });

    if (!st.order.length || st.order.some(id => !TH.S.data.cards[id] || TH.S.data.cards[id].del)) buildOrder();
    if (!st.order.length) { buildOrder(); }
    if (st.idx >= st.order.length) st.idx = 0;

    const c = TH.S.data.cards[st.order[st.idx]];
    if (!c) return;
    const prog = TH.S.data.progress[c.id] || {};

    $("#flashcard").classList.toggle("flipped", st.flipped);
    $("#fTag").textContent = `${c.section || "card"} · ${st.idx + 1} of ${st.order.length}`;
    $("#fQ").textContent = c.q || "";
    $("#fHint").textContent = c.hint ? "hint — " + c.hint : "tap to reveal";
    $("#bTag").textContent = `${c.section || "card"} · answer`;
    $("#bIdea").innerHTML = (c.idea || "") +
      (c.added ? `<span class="addedby">added — not in your notes</span>` : "");
    const steps = (c.steps || []);
    $("#bSteps").innerHTML = steps.map(s => `<li>${s}</li>`).join("");
    $("#bSteps").style.display = steps.length ? "" : "none";
    $("#bCode").textContent = c.code || "";
    $("#bCode").style.display = c.code ? "" : "none";
    $("#bTime").textContent = c.time ? "time " + c.time : "";
    $("#bTime").style.display = c.time ? "" : "none";
    $("#bSpace").textContent = c.space ? "space " + c.space : "";
    $("#bSpace").style.display = c.space ? "" : "none";
    $("#bExtra").textContent = c.extra || "";
    $("#bExtra").style.display = c.extra ? "" : "none";
    $("#bPage").classList.toggle("is-hidden", !c.scan);
    $("#bPage").onclick = e => { e.stopPropagation(); openScan(c); };
    $("#bEdit").onclick = e => { e.stopPropagation(); openCard(c); };

    const known = st.order.filter(id => (TH.S.data.progress[id] || {}).known).length;
    $("#count").textContent = `${known} / ${st.order.length} known`;
    $("#fill").style.width = (st.order.length ? known / st.order.length * 100 : 0) + "%";
    $("#flashcard").style.opacity = prog.known ? .78 : 1;
  }

  function buildOrder() {
    st.order = deckCards()
      .filter(c => st.section === "All" || c.section === st.section)
      .map(c => c.id);
    st.idx = 0; st.flipped = false;
  }

  function move(step) {
    if (!st.order.length) return;
    st.flipped = false;
    st.idx = (st.idx + step + st.order.length) % st.order.length;
    render();
  }

  function mark(known) {
    const id = st.order[st.idx];
    if (!id) return;
    const p = TH.S.data.progress[id] || {id};
    p.known = known;
    p.reps = (p.reps || 0) + 1;
    TH.put("progress", p, "trackhawk: study progress");
    move(1);
  }

  /* ------------------------------------------------------------- editor */
  function openCard(c) {
    const f = $("#card-form");
    f.reset();
    $("#card-title").textContent = c ? "Edit card" : "Add a card";
    $("#del-card").classList.toggle("is-hidden", !c);
    if (c) {
      f.elements.id.value = c.id;
      ["section", "q", "hint", "idea", "code", "time", "space", "extra", "lang"]
        .forEach(k => { if (f.elements[k]) f.elements[k].value = c[k] || ""; });
      f.elements.steps.value = (c.steps || []).join("\n");
    } else {
      f.elements.section.value = st.section === "All" ? "" : st.section;
    }
    UI.openModal("#card-modal");
  }

  function saveCard(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    if (!d.id) delete d.id;
    d.deckId = st.deck;
    d.steps = (d.steps || "").split("\n").map(s => s.trim()).filter(Boolean);
    TH.put("cards", d, "trackhawk: card");
    buildOrder(); UI.closeModals(); render(); UI.toast("Card saved");
  }

  /* ----------------------------------------------------------- import */
  function importCards(arr, section, deckId) {
    if (!Array.isArray(arr)) throw new Error("That JSON isn't an array of cards.");
    let n = 0;
    arr.forEach(c => {
      if (!c.q) return;
      const id = TH.uid();
      TH.S.data.cards[id] = {
        id, deckId: deckId || st.deck,
        /* decks from chat use `topic`; the app calls it `section` */
        section: section || c.section || c.topic || "General",
        q: c.q, hint: c.hint || "", idea: c.idea || "",
        steps: c.steps || [], code: c.code || "", lang: c.lang || "Java",
        time: c.time || "", space: c.space || "", extra: c.extra || "",
        added: !!c.added,
        scan: c.scan || null,          // encrypted attachment meta, if any
        at: TH.now(),
      };
      n++;
    });
    TH.save(`trackhawk: import ${n} cards`).catch(() => {});
    buildOrder(); render();
    return n;
  }

  /* --------------------------------------------- parse a deck .html file */
  /* Pulls `const CARDS = [...]` (and `const PAGES = [...]`, if the scans were
     embedded) out of the file Claude hands you in chat. Bracket-counting rather
     than a regex, because the code fields are full of brackets and backticks.  */
  function sliceArray(src, name) {
    const at = src.indexOf(`const ${name}`);
    if (at === -1) return null;
    const open = src.indexOf("[", at);
    if (open === -1) return null;
    let depth = 0, str = null, esc = false;
    for (let i = open; i < src.length; i++) {
      const ch = src[i];
      if (esc) { esc = false; continue; }
      if (str) {
        if (ch === "\\") esc = true;
        else if (ch === str) str = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") { str = ch; continue; }
      if (ch === "[") depth++;
      else if (ch === "]") {
        depth--;
        if (depth === 0) return src.slice(open, i + 1);
      }
    }
    return null;
  }

  function parseDeckHtml(text) {
    const cardsSrc = sliceArray(text, "CARDS");
    if (!cardsSrc) {
      throw new Error("Couldn't find a CARDS array in that file. Is it the flashcard HTML?");
    }
    let cards, pages = [];
    try {
      cards = Function(`"use strict"; return (${cardsSrc});`)();
    } catch (e) {
      throw new Error("The CARDS array in that file wouldn't parse: " + e.message);
    }
    const pagesSrc = sliceArray(text, "PAGES");
    if (pagesSrc) {
      try { pages = Function(`"use strict"; return (${pagesSrc});`)(); } catch { pages = []; }
    }
    if (!Array.isArray(cards) || !cards.length) throw new Error("That file has no cards in it.");
    return {cards, pages};
  }

  /* ------------------------------------------------------- import modal */
  let staged = null;   // {cards, pages, fileName}

  function refreshImportUI() {
    const sel = $("#import-deck");
    sel.innerHTML = decks()
      .map(d => `<option value="${d.id}" ${d.id === st.deck ? "selected" : ""}>${esc(d.name)}</option>`).join("");
    $("#import-secwrap").classList.toggle("is-hidden", $("#import-secmode").value !== "one");
    const hasScans = staged && staged.pages && staged.pages.length;
    $("#import-scans-wrap").classList.toggle("is-hidden", !hasScans);
  }

  async function loadImportFile(file) {
    const out = $("#import-out");
    const sum = $("#import-summary");
    out.textContent = "";
    staged = null;
    if (!file) return;

    const text = await file.text();
    try {
      if (/\.json$/i.test(file.name)) {
        staged = {cards: JSON.parse(text), pages: [], fileName: file.name};
      } else {
        staged = {...parseDeckHtml(text), fileName: file.name};
      }
    } catch (e) {
      sum.classList.add("is-hidden");
      $("#import-opts").classList.add("is-hidden");
      out.textContent = e.message;
      return;
    }

    const topics = [...new Set(staged.cards.map(c => c.section || c.topic).filter(Boolean))];
    sum.innerHTML = `
      <b>${staged.cards.length}</b> cards
      ${topics.length ? `· sections: ${topics.map(t => `<span class="tech">${esc(t)}</span>`).join(" ")}` : ""}
      ${staged.pages.length ? `<br><b>${staged.pages.length}</b> handwritten source pages found` : ""}`;
    sum.classList.remove("is-hidden");
    $("#import-opts").classList.remove("is-hidden");
    refreshImportUI();
  }

  async function runImport() {
    const out = $("#import-out");

    /* pasted JSON path */
    if (!staged) {
      const raw = $("#import-text").value.trim();
      if (!raw) { out.textContent = "Choose a file, or paste some JSON."; return; }
      try {
        const n = importCards(JSON.parse(raw));
        UI.closeModals(); UI.toast(`${n} cards added`);
      } catch (e) { out.textContent = e.message; }
      return;
    }

    /* deck target */
    let deckId = $("#import-deck").value;
    const newDeck = $("#import-newdeck").value.trim();
    if (newDeck) deckId = TH.put("decks", {name: newDeck}, "trackhawk: deck").id;

    /* section target */
    const oneSection = $("#import-secmode").value === "one";
    const section = oneSection ? ($("#import-section").value.trim() || "General") : null;

    const cards = staged.cards.map(c => ({...c}));

    /* scans → encrypted attachments, one per page, then linked to their cards */
    const wantScans = staged.pages.length && $("#import-scans").checked;
    let failed = [];
    if (wantScans) {
      const byId = {};
      for (let i = 0; i < staged.pages.length; i++) {
        const p = staged.pages[i];
        out.textContent = `Encrypting scan ${i + 1} of ${staged.pages.length}…`;
        try {
          const {bytes, type} = TH.dataUrlToBytes(p.src);
          byId[p.id] = await TH.putAttachment({
            bytes, type, name: p.label || `page-${p.id}.png`,
          });
        } catch (e) {
          /* one bad page shouldn't sink the import — but you should hear about it */
          failed.push(p.label || `page ${p.id}`);
          console.error("scan failed", p.id, e);
        }
      }
      cards.forEach(c => { if (c.page != null && byId[c.page]) c.scan = byId[c.page]; });
    }

    out.textContent = "Saving…";
    const n = importCards(cards, section, deckId);
    st.deck = deckId; st.section = "All"; buildOrder(); render();
    UI.closeModals();
    if (failed.length) {
      UI.toast(`${n} cards added — but ${failed.length} scan(s) failed`, true);
    } else {
      UI.toast(`${n} cards added${wantScans ? ` + ${staged.pages.length} scans` : ""}`);
    }
  }

  /* --------------------------------------------------------- scan viewer */
  function openImport() {
    staged = null;
    $("#import-file").value = "";
    $("#import-text").value = "";
    $("#import-newdeck").value = "";
    $("#import-section").value = "";
    $("#import-out").textContent = "";
    $("#import-summary").classList.add("is-hidden");
    $("#import-opts").classList.add("is-hidden");
    $("#import-text").classList.add("is-hidden");
    refreshImportUI();
    UI.openModal("#import-modal");
  }

  async function openScan(card) {
    const dlg = $("#scan-viewer");
    $("#scan-title").textContent = card.scan.name || "Source page";
    $("#scan-img").removeAttribute("src");
    dlg.showModal();
    try {
      const blob = await TH.getAttachment(card.scan);
      $("#scan-img").src = URL.createObjectURL(blob);
    } catch (e) {
      UI.toast("Couldn't decrypt that scan", true);
      dlg.close();
    }
  }

  /* --------------------------------------------------------------- wire */
  function init() {
    $("#deck-select").onchange = e => { st.deck = e.target.value; st.section = "All"; buildOrder(); render(); };
    $("#new-deck").onclick = () => {
      const name = prompt("Deck name — e.g. Java Backend, Spring, System Design");
      if (!name) return;
      const d = TH.put("decks", {name}, "trackhawk: deck");
      st.deck = d.id; st.section = "All"; buildOrder(); render();
    };
    $("#add-card").onclick = () => openCard(null);
    $("#card-form").onsubmit = saveCard;
    $("#del-card").onclick = () => {
      const id = $("#card-form").elements.id.value;
      if (id && confirm("Delete this card?")) {
        TH.drop("cards", id); UI.closeModals(); buildOrder(); render();
      }
    };

    $("#flashcard").onclick = () => { st.flipped = !st.flipped; render(); };
    $("#prev").onclick = () => move(-1);
    $("#next").onclick = () => move(1);
    $("#know").onclick = () => mark(true);
    $("#again").onclick = () => mark(false);
    $("#shuffle").onclick = () => {
      for (let i = st.order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [st.order[i], st.order[j]] = [st.order[j], st.order[i]];
      }
      st.idx = 0; st.flipped = false; render();
    };
    $("#reset-prog").onclick = () => {
      if (!confirm("Reset known/unknown for this deck?")) return;
      deckCards().forEach(c => { if (TH.S.data.progress[c.id]) TH.drop("progress", c.id); });
      render();
    };

    $("#import-cards").onclick = openImport;
    $("#empty-upload").onclick = openImport;

    /* drag the .html straight onto the empty deck */
    const dz = $("#dropzone");
    if (dz) {
      ["dragenter", "dragover"].forEach(ev => dz.addEventListener(ev, e => {
        e.preventDefault(); dz.classList.add("over");
      }));
      ["dragleave", "drop"].forEach(ev => dz.addEventListener(ev, e => {
        e.preventDefault(); dz.classList.remove("over");
      }));
      dz.addEventListener("drop", async e => {
        const file = e.dataTransfer.files[0];
        if (!file) return;
        openImport();
        await loadImportFile(file);
      });
    }

    $("#import-file").onchange = e => loadImportFile(e.target.files[0]);
    $("#import-secmode").onchange = refreshImportUI;
    $("#import-paste-toggle").onclick = () => {
      const t = $("#import-text");
      t.classList.toggle("is-hidden");
      $("#import-opts").classList.add("is-hidden");
      $("#import-summary").classList.add("is-hidden");
      staged = null;
    };
    $("#import-run").onclick = () => runImport().catch(e => {
      $("#import-out").textContent = e.message;
    });

    $("#scan-close").onclick = () => $("#scan-viewer").close();
    $("#scan-viewer").onclick = e => { if (e.target.id === "scan-viewer") $("#scan-viewer").close(); };

    document.addEventListener("keydown", e => {
      if ($("#view-cards").classList.contains("is-hidden")) return;
      if (!$("#veil").classList.contains("is-hidden")) return;
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === " ") { e.preventDefault(); st.flipped = !st.flipped; render(); }
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key.toLowerCase() === "k") mark(true);
      else if (e.key.toLowerCase() === "r") mark(false);
    });
  }

  return {init, render, importCards};
})();
