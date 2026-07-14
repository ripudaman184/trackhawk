/* TrackHawk — Job Hunter: board, insights, library */

const JOBS = (() => {

  const STAGES = ["Wishlist", "Applied", "Screen", "Interview", "Offer", "Rejected"];
  const COLORS = {
    "Wishlist":  "var(--s-wishlist)",
    "Applied":   "var(--s-applied)",
    "Screen":    "var(--s-screen)",
    "Interview": "var(--s-interview)",
    "Offer":     "var(--s-offer)",
    "Rejected":  "var(--s-rejected)",
  };

  /* the stack you actually apply with — one tap instead of typing it out */
  const STACK_PICKS = [
    "Java", "Spring Boot", "Microservices", "REST", "Hibernate", "JPA", "SQL",
    "Kafka", "Docker", "Kubernetes", "AWS", "Jenkins", "Maven", "JUnit",
    "Selenium", "TestNG", "REST Assured", "Cucumber", "Playwright", "Cypress",
    "Appium", "Postman", "CI/CD", "Git",
  ];

  /* JD words that matter more than the rest, for the keyword check */
  const WEIGHTED = new Set(STACK_PICKS.map(s => s.toLowerCase()).concat([
    "spring", "boot", "junit", "mockito", "bdd", "tdd", "pom", "framework",
    "automation", "backend", "api", "sdet", "regression", "agile", "scrum",
    "multithreading", "collections", "streams", "solid", "design", "patterns",
  ]));

  const SEED_SNIPS = [
    {title: "Salutation — named recruiter", tags: "salutation",
     body: "Hi {Name},\n\nHope your week's going well."},
    {title: "Salutation — no name", tags: "salutation",
     body: "Hi {Company} hiring team,"},
    {title: "Salutation — referral", tags: "salutation",
     body: "Hi {Name},\n\n{Referrer} suggested I reach out about the {Role} opening."},

    {title: "Opener — Java backend", tags: "opener",
     body: "I'm a Java backend developer with {X} years on Spring Boot microservices, and the {Role} role at {Company} lines up closely with what I've been building — REST APIs, JPA/Hibernate persistence, and services that have to stay up under real load."},
    {title: "Opener — automation / SDET", tags: "opener",
     body: "I build test automation for a living — Selenium + TestNG on the UI, REST Assured on the API layer, wired into Jenkins so a regression run is a build step and not a Friday afternoon. The {Role} opening at {Company} is exactly that shape of problem."},
    {title: "Opener — career pivot into automation", tags: "opener",
     body: "I came to automation from writing the backend I was testing, which turns out to be the useful direction: I read the service before I write the test for it."},

    {title: "Proof paragraph — Java backend", tags: "java",
     body: "At {Company}, I own {N} Spring Boot services behind an API gateway. Recent work: cut p95 latency on the {X} endpoint from {a}ms to {b}ms by replacing an N+1 fetch with a projection query, and moved our async flows onto Kafka so a slow downstream stops being our outage."},
    {title: "Proof paragraph — automation", tags: "automation",
     body: "I rebuilt our regression suite as a Page Object framework (Selenium + TestNG + Maven), added REST Assured coverage for the {N} core APIs, and put the whole thing on a Jenkins pipeline. Suite runtime went from {a} hours to {b} minutes with parallel execution, and flaky tests dropped once I killed every Thread.sleep in favour of explicit waits."},
    {title: "Proof paragraph — CI/CD", tags: "automation",
     body: "Every PR runs unit + API + smoke on Jenkins; nightly runs the full regression against a Dockerised environment and posts the report to Slack. Nobody has to remember to run the tests, which is the only way tests actually get run."},

    {title: "Why this company", tags: "opener",
     body: "What pulled me to {Company} specifically: {one concrete thing — their engineering blog post, their scale, the product itself}. I'd rather work on {that} than on another CRUD layer."},

    {title: "Closer — standard", tags: "closer",
     body: "I've attached my resume. Happy to walk through any of the above, or to take a code/automation exercise if that's a faster way to judge the fit.\n\nThanks for your time,\n{Your name}"},
    {title: "Closer — follow-up nudge", tags: "closer",
     body: "Just floating this back to the top of your inbox — still very interested in the {Role} role, and happy to work around your timeline. Anything you need from my side?"},
    {title: "Salary — deflect early", tags: "closer",
     body: "I'd rather understand the scope first, but to keep things moving: my expectation is in the {X}–{Y} range, and I'm flexible for the right team and problem."},
  ];

  /* ------------------------------------------------------------ helpers */
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g,
    c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));
  const money = n => n ? Number(n).toLocaleString("en-IN") : "—";
  const days = iso => iso ? Math.round((Date.now() - new Date(iso)) / 864e5) : null;
  const today = () => new Date().toISOString().slice(0, 10);

  let query = "";
  let mobileStage = "Wishlist";
  let docFilter = "all";
  let snipFilter = "all";

  /* ------------------------------------------------------------- board */
  function jobList() {
    return TH.list("jobs").filter(j => {
      if (!query) return true;
      const hay = [j.company, j.role, j.notes, j.location, j.stack, j.source, j.track]
        .join(" ").toLowerCase();
      return hay.includes(query);
    });
  }

  function renderBoard() {
    const jobs = jobList();
    const board = $("#board");
    board.innerHTML = "";

    /* spine */
    $("#spine").innerHTML = STAGES.map(s => {
      const n = jobs.filter(j => j.status === s).length;
      const pct = jobs.length ? Math.round(100 * n / jobs.length) : 0;
      return `<div class="seg-cell"><span>${s}</span><b>${n}</b>
        <i style="background:${COLORS[s]};width:${Math.max(6, pct)}%"></i></div>`;
    }).join("");

    /* mobile stage picker */
    $("#stage-picker").innerHTML = STAGES.map(s => {
      const n = jobs.filter(j => j.status === s).length;
      return `<button class="chip ${s === mobileStage ? "is-on" : ""}" data-stage="${s}">${s} ${n}</button>`;
    }).join("");
    $$("#stage-picker .chip").forEach(b => b.onclick = () => {
      mobileStage = b.dataset.stage; renderBoard();
    });

    STAGES.forEach(stage => {
      const list = jobs.filter(j => j.status === stage);
      const col = document.createElement("div");
      col.className = "col" + (stage === mobileStage ? " is-shown" : "");
      col.dataset.stage = stage;
      col.innerHTML = `
        <div class="col-head">
          <span class="dot" style="background:${COLORS[stage]}"></span>
          <span class="col-name">${stage}</span><span class="col-n">${list.length}</span>
        </div>
        <button class="col-add">+ add here</button>
        <div class="col-body"></div>`;
      const body = col.querySelector(".col-body");
      if (!list.length) body.innerHTML = `<p class="empty">nothing here</p>`;
      list.forEach(j => body.appendChild(jobCard(j)));

      col.querySelector(".col-add").onclick = () => openJob(null, stage);
      col.ondragover = e => { e.preventDefault(); col.classList.add("over"); };
      col.ondragleave = () => col.classList.remove("over");
      col.ondrop = e => {
        e.preventDefault(); col.classList.remove("over");
        const id = e.dataTransfer.getData("text/plain");
        const job = TH.S.data.jobs[id];
        if (!job || job.status === stage) return;
        moveJob(job, stage);
      };
      board.appendChild(col);
    });
  }

  function moveJob(job, stage) {
    const next = {...job, status: stage};
    if (stage !== "Wishlist" && !next.applied) next.applied = today();
    TH.put("jobs", next, `trackhawk: ${job.company} → ${stage}`);
    UI.toast(`${job.company} → ${stage}`);
  }

  function jobCard(j) {
    const el = document.createElement("div");
    el.className = "jcard";
    el.draggable = true;
    el.style.borderLeftColor = COLORS[j.status];
    const m = j.match ? Number(j.match) : null;
    const cls = m == null ? "" : m >= 75 ? "hi" : m >= 50 ? "mid" : "lo";
    const stack = (j.stack || "").split(",").map(s => s.trim()).filter(Boolean).slice(0, 5);
    const d = days(j.applied);

    el.innerHTML = `
      <div class="jc-top">
        <div><div class="jc-role">${esc(j.role)}</div><div class="jc-co">${esc(j.company)}</div></div>
        ${m == null ? "" : `<span class="jc-match ${cls}">${m}%</span>`}
      </div>
      ${stack.length ? `<div class="stackrow">${stack.map((s, i) =>
        `<span class="tech ${i % 3 === 1 ? "t2" : i % 3 === 2 ? "t3" : ""}">${esc(s)}</span>`).join("")}</div>` : ""}
      <div class="jc-foot">
        <span>${j.salary ? "₹" + money(j.salary) : esc(j.source || j.track || "")}</span>
        <span class="hype">${"★".repeat(Number(j.hype) || 0)}</span>
      </div>
      <div class="jc-foot">
        <span>${d == null ? "not applied" : d === 0 ? "applied today" : `applied ${d}d ago`}</span>
        ${j.nextAt ? `<span style="color:var(--amber)">${esc(j.nextAt)}</span>` : ""}
      </div>`;

    el.ondragstart = e => { e.dataTransfer.setData("text/plain", j.id); el.classList.add("dragging"); };
    el.ondragend = () => el.classList.remove("dragging");
    el.onclick = () => openJob(j);
    return el;
  }

  /* ---------------------------------------------------------- insights */
  function renderInsights() {
    const jobs = TH.list("jobs");
    const out = jobs.filter(j => j.status !== "Wishlist");
    const n = s => jobs.filter(j => j.status === s).length;
    const applied = out.length;
    const heard = out.filter(j => ["Screen", "Interview", "Offer"].includes(j.status)).length;
    const inter = out.filter(j => ["Interview", "Offer"].includes(j.status)).length;
    const offer = n("Offer");
    const pct = (a, b) => b ? Math.round(100 * a / b) : 0;

    $("#kpis").innerHTML = [
      ["Tracked", jobs.length, "violet"], ["Applied", applied, "ink"],
      ["Alive", applied - n("Rejected"), "cyan"],
      ["Response", pct(heard, applied) + "%", "lime"],
      ["Interview", pct(inter, applied) + "%", "amber"],
      ["Offer", pct(offer, applied) + "%", "pink"],
    ].map(([l, v, c]) => `<div class="kpi ${c}"><b>${v}</b><span>${l}</span></div>`).join("");

    const funnel = [
      ["Applied", applied, "var(--s-applied)"], ["Screened", heard, "var(--s-screen)"],
      ["Interviewed", inter, "var(--s-interview)"], ["Offer", offer, "var(--s-offer)"],
    ];
    const top = Math.max(...funnel.map(f => f[1]), 1);
    $("#funnel").innerHTML = funnel.map(([l, v, c]) => `
      <div class="frow"><span class="lab">${l}</span>
        <span class="fbar"><i style="width:${Math.max(2, 100 * v / top)}%;background:${c}"></i></span>
        <span class="val">${v} · ${pct(v, applied)}%</span></div>`).join("");

    /* 12 weeks */
    const weeks = {};
    out.forEach(j => {
      if (!j.applied) return;
      const d = new Date(j.applied);
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      const k = d.toISOString().slice(0, 10);
      weeks[k] = (weeks[k] || 0) + 1;
    });
    const start = new Date(); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const bars = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(start); d.setDate(d.getDate() - i * 7);
      const k = d.toISOString().slice(0, 10);
      bars.push([`${d.getDate()}/${d.getMonth() + 1}`, weeks[k] || 0]);
    }
    const tmax = Math.max(...bars.map(b => b[1]), 1);
    $("#timeline").innerHTML = bars.map(([l, v]) =>
      `<div class="tl"><b>${v || ""}</b><i style="height:${v / tmax * 100}%"></i><span>${l}</span></div>`).join("");

    donut(jobs);

    /* stack demand */
    const tally = {};
    jobs.forEach(j => (j.stack || "").split(",").map(s => s.trim()).filter(Boolean)
      .forEach(s => tally[s] = (tally[s] || 0) + 1));
    bars2("#stackbars", tally, "var(--ink)",
      "Add a stack to your jobs and the demand shows up here.");

    const src = {};
    jobs.forEach(j => { if (j.source) src[j.source] = (src[j.source] || 0) + 1; });
    bars2("#sources", src, "var(--cyan)", "Fill in \"Found on\" to see which channel actually works.");

    const sal = jobs.map(j => Number(j.salary)).filter(Boolean).sort((a, b) => a - b);
    $("#salary").innerHTML = sal.length
      ? [["Lowest", sal[0], "cyan"], ["Median", sal[Math.floor(sal.length / 2)], "lime"],
         ["Average", Math.round(sal.reduce((a, b) => a + b, 0) / sal.length), "ink"],
         ["Highest", sal[sal.length - 1], "pink"]]
        .map(([l, v, c]) => `<div class="kpi ${c}"><b style="font-size:15px">₹${money(v)}</b><span>${l}</span></div>`).join("")
      : `<p class="phint">Add CTC to your jobs to see the range.</p>`;

    const stale = jobs.filter(j => j.status === "Applied" && days(j.applied) >= 14)
      .sort((a, b) => days(b.applied) - days(a.applied)).slice(0, 6);
    $("#stale").innerHTML = stale.length
      ? stale.map(j => `<li data-id="${j.id}">
          <span><span class="who">${esc(j.company)}</span><br><span class="what">${esc(j.role)}</span></span>
          <span class="when">${days(j.applied)}d silent</span></li>`).join("")
      : `<p class="phint">Nothing has gone quiet. Enjoy it.</p>`;
    $$("#stale li").forEach(li => li.onclick = () => openJob(TH.S.data.jobs[li.dataset.id]));
  }

  function bars2(sel, tally, color, emptyMsg) {
    const rows = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 7);
    const max = Math.max(...rows.map(r => r[1]), 1);
    $(sel).innerHTML = rows.length
      ? rows.map(([l, v]) => `<div class="brow"><span class="lab">${esc(l)}</span>
          <span class="track"><i style="width:${100 * v / max}%;background:${color}"></i></span>
          <span class="n">${v}</span></div>`).join("")
      : `<p class="phint">${emptyMsg}</p>`;
  }

  function donut(jobs) {
    const svg = $("#donut");
    const rows = STAGES.map(s => [s, jobs.filter(j => j.status === s).length]).filter(r => r[1]);
    const total = rows.reduce((a, r) => a + r[1], 0);
    svg.innerHTML = "";
    if (!total) {
      svg.innerHTML = `<circle cx="100" cy="100" r="70" fill="none" stroke="#17171E" stroke-width="26"/>`;
      $("#donut-legend").innerHTML = `<p class="phint">Add a job to see the mix.</p>`;
      return;
    }
    const C = 2 * Math.PI * 70;
    let off = 0;
    rows.forEach(([s, v]) => {
      const len = C * v / total;
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      Object.entries({cx: 100, cy: 100, r: 70, fill: "none", "stroke-width": 26,
        stroke: COLORS[s], "stroke-dasharray": `${len} ${C - len}`,
        "stroke-dashoffset": -off, transform: "rotate(-90 100 100)"})
        .forEach(([k, v2]) => c.setAttribute(k, v2));
      svg.appendChild(c);
      off += len;
    });
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    Object.entries({x: 100, y: 107, "text-anchor": "middle", fill: "#F2F2F4",
      "font-family": "JetBrains Mono, monospace", "font-size": 26, "font-weight": 700})
      .forEach(([k, v]) => t.setAttribute(k, v));
    t.textContent = total;
    svg.appendChild(t);
    $("#donut-legend").innerHTML = rows.map(([s, v]) =>
      `<li><span class="sw" style="background:${COLORS[s]}"></span>${s}
       <span class="n">${v} · ${Math.round(100 * v / total)}%</span></li>`).join("");
  }

  /* ----------------------------------------------------------- library */
  function renderLibrary() {
    const docs = TH.list("docs").filter(d => d.kind !== "snippet");
    const shown = docs.filter(d => docFilter === "all" || d.kind === docFilter);
    $("#docs").innerHTML = shown.length ? shown.map(d => `
      <div class="doc">
        <span class="kind">${esc(d.kind.replace("_", " "))}</span>
        <h3>${esc(d.title)}</h3>
        ${d.body ? `<p class="prev">${esc(d.body)}</p>` : ""}
        ${d.tags ? `<div class="stackrow">${d.tags.split(",").filter(Boolean)
            .map(t => `<span class="tech">${esc(t.trim())}</span>`).join("")}</div>` : ""}
        <div class="foot">
          ${d.file ? `<button class="mini" data-dl="${d.id}">↓ ${esc(d.file.name)}</button>` : ""}
          <span class="grow"></span>
          ${d.body ? `<button class="mini" data-copy="${d.id}">copy text</button>` : ""}
          <button class="mini" data-edit="${d.id}">edit</button>
        </div>
      </div>`).join("")
      : `<p class="phint">Nothing here yet. Add your ATS resume first — the keyword check uses its text.</p>`;

    $$("#docs [data-edit]").forEach(b => b.onclick = () => openDoc(TH.S.data.docs[b.dataset.edit]));
    $$("#docs [data-copy]").forEach(b => b.onclick = () => {
      navigator.clipboard.writeText(TH.S.data.docs[b.dataset.copy].body);
      UI.toast("Copied");
    });
    $$("#docs [data-dl]").forEach(b => b.onclick = async () => {
      const d = TH.S.data.docs[b.dataset.dl];
      b.textContent = "decrypting…";
      try {
        const blob = await TH.getAttachment(d.file);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = d.file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      } catch (e) { UI.toast(e.message, true); }
      b.textContent = "↓ " + d.file.name;
    });

    /* snippets */
    const snips = TH.list("docs").filter(d => d.kind === "snippet")
      .filter(d => snipFilter === "all" || (d.tags || "").includes(snipFilter));
    $("#snips").innerHTML = snips.map(s => `
      <div class="snip" data-id="${s.id}">
        <span class="tagline">${esc(s.tags || "line")}</span>
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.body)}</p>
        <button class="mini copy">copy</button>
      </div>`).join("");
    $$("#snips .snip").forEach(el => {
      const s = TH.S.data.docs[el.dataset.id];
      el.querySelector(".copy").onclick = e => {
        e.stopPropagation();
        navigator.clipboard.writeText(s.body);
        UI.toast("Copied — swap the {placeholders}");
      };
      el.onclick = () => openSnip(s);
    });
  }

  function seedSnippets() {
    if (TH.list("docs").some(d => d.kind === "snippet")) return;
    SEED_SNIPS.forEach(s => {
      const id = TH.uid();
      TH.S.data.docs[id] = {...s, id, kind: "snippet", at: TH.now()};
    });
    TH.save("trackhawk: seed handy lines").catch(() => {});
  }

  /* ------------------------------------------------------ keyword check */
  const STOP = new Set(`a an the and or of to in for with on at by from as is are be will you your we our us this
    that it they their have has who what which more than into using use used able across strong plus work working
    experience years year team teams role job company candidate must should including etc new all any own can may
    other well look looking join help great good ability skills skill need needs want building build make making
    about within per like also them but not have had were was`.split(/\s+/));

  function runMatch() {
    const resume = $("#m-resume").value.toLowerCase();
    const jd = $("#m-jd").value.toLowerCase();
    const out = $("#match-out");
    if (!resume || !jd) { out.innerHTML = `<p class="phint">Paste both sides.</p>`; return; }

    const words = t => (t.match(/[a-z][a-z+#.\-]{1,}/g) || [])
      .filter(w => !STOP.has(w) && w.length > 2);
    const freq = {};
    words(jd).forEach(w => freq[w] = (freq[w] || 0) + 1 + (WEIGHTED.has(w) ? 3 : 0));
    const keys = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 40).map(k => k[0]);
    const have = new Set(words(resume));
    const hit = keys.filter(k => have.has(k));
    const miss = keys.filter(k => !have.has(k));
    const score = Math.round(100 * hit.length / (keys.length || 1));

    out.innerHTML = `
      <div class="kpi ${score >= 70 ? "lime" : score >= 45 ? "amber" : "pink"}" style="max-width:190px">
        <b>${score}%</b><span>keyword overlap</span></div>
      <div><h3 class="stitle">In your resume</h3>
        ${hit.map(w => `<span class="kw hit ${WEIGHTED.has(w) ? "key" : ""}">${esc(w)}</span>`).join("") || "<p class='phint'>None matched.</p>"}</div>
      <div><h3 class="stitle">Missing — outlined ones are stack terms, weigh those first</h3>
        ${miss.slice(0, 24).map(w => `<span class="kw miss ${WEIGHTED.has(w) ? "key" : ""}">${esc(w)}</span>`).join("") || "<p class='phint'>Nothing missing.</p>"}</div>
      <p class="phint">Only work in the ones that are actually true of you. A resume that lies gets caught in round one.</p>`;
  }

  /* ------------------------------------------------------------- modals */
  function openJob(job, stage) {
    const f = $("#job-form");
    f.reset();
    $("#job-title").textContent = job ? "Edit job" : "Add a job";
    $("#del-job").classList.toggle("is-hidden", !job);
    $("#job-status").innerHTML = STAGES.map(s => `<option>${s}</option>`).join("");
    if (job) Object.entries(job).forEach(([k, v]) => { if (f.elements[k] && v != null) f.elements[k].value = v; });
    else { f.elements.status.value = stage || "Wishlist"; f.elements.hype.value = "3"; }
    UI.openModal("#job-modal");
  }

  function openDoc(doc) {
    const f = $("#doc-form");
    f.reset();
    $("#doc-title").textContent = doc ? "Edit document" : "Add document";
    $("#del-doc").classList.toggle("is-hidden", !doc);
    if (doc) ["id", "kind", "title", "body", "tags"].forEach(k => f.elements[k].value = doc[k] || "");
    UI.openModal("#doc-modal");
  }

  function openSnip(s) {
    const f = $("#snip-form");
    f.reset();
    $("#snip-title").textContent = s ? "Edit line" : "Add a line";
    $("#del-snip").classList.toggle("is-hidden", !s);
    if (s) ["id", "title", "body", "tags"].forEach(k => f.elements[k].value = s[k] || "");
    UI.openModal("#snip-modal");
  }

  /* --------------------------------------------------------------- wire */
  function init() {
    $("#stackpicks").innerHTML = STACK_PICKS
      .map(s => `<button type="button" class="stackpick">${s}</button>`).join("");
    $$("#stackpicks .stackpick").forEach(b => b.onclick = () => {
      const el = $("#job-form").elements.stack;
      const have = el.value.split(",").map(s => s.trim()).filter(Boolean);
      if (!have.includes(b.textContent)) have.push(b.textContent);
      el.value = have.join(", ");
    });

    $("#add-job").onclick = () => openJob(null);
    $("#add-doc").onclick = () => openDoc(null);
    $("#add-snip").onclick = () => openSnip(null);
    $("#run-match").onclick = runMatch;

    $("#search").oninput = e => { query = e.target.value.trim().toLowerCase(); renderBoard(); };

    $("#doc-filters").onclick = e => {
      const c = e.target.closest(".chip"); if (!c) return;
      $$("#doc-filters .chip").forEach(x => x.classList.toggle("is-on", x === c));
      docFilter = c.dataset.kind; renderLibrary();
    };
    $("#snip-filters").onclick = e => {
      const c = e.target.closest(".chip"); if (!c) return;
      $$("#snip-filters .chip").forEach(x => x.classList.toggle("is-on", x === c));
      snipFilter = c.dataset.tag; renderLibrary();
    };

    $("#job-form").onsubmit = e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      if (!d.id) delete d.id;
      if (d.status !== "Wishlist" && !d.applied) d.applied = today();
      TH.put("jobs", d, `trackhawk: ${d.company}`);
      UI.closeModals(); UI.toast("Saved");
    };
    $("#del-job").onclick = () => {
      const id = $("#job-form").elements.id.value;
      if (id && confirm("Delete this job?")) { TH.drop("jobs", id); UI.closeModals(); }
    };

    $("#doc-form").onsubmit = async e => {
      e.preventDefault();
      const f = e.target;
      const d = Object.fromEntries(new FormData(f));
      const file = f.elements.file.files[0];
      delete d.file;
      if (!d.id) delete d.id;
      const prev = d.id ? TH.S.data.docs[d.id] : null;
      d.file = prev ? prev.file : undefined;
      UI.toast("Encrypting…");
      try {
        if (file) {
          if (file.size > 12e6) throw new Error("Keep attachments under 12 MB.");
          d.file = await TH.putAttachment(file);
        }
        TH.put("docs", d, "trackhawk: document");
        UI.closeModals(); UI.toast("Saved");
      } catch (err) { UI.toast(err.message, true); }
    };
    $("#del-doc").onclick = () => {
      const id = $("#doc-form").elements.id.value;
      if (id && confirm("Delete this document?")) { TH.drop("docs", id); UI.closeModals(); }
    };

    $("#snip-form").onsubmit = e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.target));
      if (!d.id) delete d.id;
      d.kind = "snippet";
      TH.put("docs", d, "trackhawk: line");
      UI.closeModals(); UI.toast("Saved");
    };
    $("#del-snip").onclick = () => {
      const id = $("#snip-form").elements.id.value;
      if (id && confirm("Delete this line?")) { TH.drop("docs", id); UI.closeModals(); }
    };
  }

  function render() {
    renderBoard();
    renderInsights();
    renderLibrary();
  }

  return {init, render, seedSnippets, STAGES};
})();
