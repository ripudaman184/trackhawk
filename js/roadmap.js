/* TrackHawk — Project: the 3-week roadmap that turns this app into a Java artifact.
   Checkbox state lives in the encrypted vault (TH.data.tasks), so it syncs across
   devices exactly like jobs and cards do.                                        */

const ROADMAP = (() => {

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g,
    c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c]));

  /* day 0 = Mon 21 Sep 2026 */
  const DNUM = [21,22,23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11];
  const WEEKS = [["Week 1","21 – 27 Sep"], ["Week 2","28 Sep – 4 Oct"], ["Week 3","5 – 11 Oct"]];

  const LADDER = [
    {score: "4.0", label: "today — JS, no tests",    color: "var(--rejected, #6C7080)"},
    {score: "6.5", label: "+ Spring Boot · JPA · JWT", color: "var(--s-applied)"},
    {score: "7.5", label: "+ JUnit · Testcontainers", color: "var(--s-screen)"},
    {score: "8.0", label: "+ Docker · CI",            color: "var(--s-interview)"},
    {score: "8.5", label: "+ locking · the pitch",    color: "var(--marker)"},
  ];

  const MILES = [
    {when: "Sun 27 Sep", what: "Auth → create → list, end to end", color: "var(--s-applied)"},
    {when: "Sun 4 Oct",  what: "mvn verify green + coverage",      color: "var(--s-screen)"},
    {when: "Sun 11 Oct", what: "Shipped · pitched · pinned",       color: "var(--marker)"},
  ];

  const PHASES = [
    {
      id: "p0", tag: "Phase 0 · harden", name: "Fix the JS you already shipped",
      when: "Mon 21 – Tue 22 Sep · 2 evenings", color: "var(--violet)",
      bar: {s: 0, e: 1, text: "Phase 0"},
      tasks: [
        "Sanitize the card <code>idea</code> field — whitelist &lt;b&gt; only (closes the import XSS)",
        "Replace <code>Function()</code> eval with a strict JSON parser",
        "Debounce study-progress saves (~30s) — kills the write amplification",
        "Garbage-collect tombstones older than 30 days",
        "Delete orphaned <code>files/*.enc</code> when a document is deleted",
      ],
    },
    {
      id: "p1", tag: "Phase 1 · spring", name: "The Java backend",
      when: "Wed 23 – Sun 27 Sep · 3 evenings + weekend", color: "var(--ink)",
      bar: {s: 2, e: 6, text: "Phase 1 — entities · JPA · auth"},
      tasks: [
        "Initializr: Web, Data JPA, Security, Validation, Postgres, Flyway, Actuator",
        "Package structure: controller / service / repository / entity / dto / config",
        "Job → entity, repository, service, controller. Flyway <code>V1__jobs.sql</code>",
        "<code>@ControllerAdvice</code> global exception handler + validation errors as JSON",
        "JWT: token provider, auth filter, SecurityConfig, register + login",
        "Deck / Card / Document entities, full CRUD behind auth, DTOs everywhere",
        "<b>Sunday gate:</b> curl register → login → create job → list jobs",
      ],
    },
    {
      id: "p2", tag: "Phase 2 · tests", name: "The part that gets you hired",
      when: "Mon 28 Sep – Fri 2 Oct · 5 evenings", color: "var(--cyan)",
      bar: {s: 7, e: 11, text: "Phase 2 — JUnit · Testcontainers"},
      tasks: [
        "JUnit 5 + Mockito per service — happy path <i>and</i> one failure path each",
        "Testcontainers base class: real Postgres, not H2",
        "Integration tests: auth flow, job CRUD, one 4xx path",
        "JaCoCo coverage report — meaningful, not 100%",
        "Stretch: PIT mutation testing on the service layer",
        "<b>Sunday gate:</b> <code>mvn verify</code> green, coverage report exists",
      ],
    },
    {
      id: "ps", tag: "Stretch · cut me first", name: "Wire the PWA to the API",
      when: "Sat 3 – Sun 4 Oct · weekend", color: "var(--mute)", ghost: true,
      bar: {s: 12, e: 13, text: "stretch", ghost: true},
      tasks: [
        "\"Backend mode\" adapter in <code>core.js</code> (GitHub mode stays)",
        "Hard stop: if this rabbit-holes past Saturday lunch, abandon it",
      ],
    },
    {
      id: "p3", tag: "Phase 3 · ops", name: "Runnable by a stranger",
      when: "Mon 5 – Tue 6 Oct · 2 evenings", color: "var(--amber)",
      bar: {s: 14, e: 15, text: "Phase 3"},
      tasks: [
        "Multi-stage Dockerfile",
        "docker-compose: api + postgres",
        "GitHub Actions — build + full suite on every push/PR",
        "Actuator health/info endpoints",
      ],
    },
    {
      id: "p4", tag: "Phase 4 · the hard thing", name: "One thing done properly",
      when: "Wed 7 – Fri 9 Oct · 3 evenings", color: "var(--marker)",
      bar: {s: 16, e: 18, text: "Phase 4"},
      tasks: [
        "<code>@Version</code> optimistic locking on Job and Card",
        "ETag / <code>If-Match</code> on updates → <b>412 on a stale write</b>",
        "<code>Idempotency-Key</code> support on job creation",
        "A test proving each of the above actually fires",
        "Deploy to a free tier (or settle for the compose demo)",
      ],
    },
    {
      id: "p5", tag: "Phase 5 · the pitch", name: "Nobody reads code they can't run",
      when: "Sat 10 – Sun 11 Oct · weekend", color: "var(--lime)",
      bar: {s: 19, e: 20, text: "Phase 5"},
      tasks: [
        "README: problem → constraint → architecture diagram → tradeoffs",
        "<b>Known limitations</b>, named unprompted: LWW clock skew · shared github.io origin · history bloat",
        "Write the 90-second pitch. Record yourself delivering it once",
        "10-min deep dive: salt bug → false-passing 1 MB test → base64 stack overflow",
        "Pin <code>trackhawk</code> and <code>trackhawk-api</code> on your profile",
      ],
    },
  ];

  /* ------------------------------------------------------------- state */
  const isDone = id => !!(TH.S.data.tasks[id] || {}).done;

  function toggle(id) {
    const rec = TH.S.data.tasks[id] || {id};
    rec.done = !rec.done;
    TH.put("tasks", rec, `trackhawk: roadmap ${rec.done ? "✓" : "✗"} ${id}`);
    render();
  }

  const allTaskIds = () => {
    const ids = [];
    PHASES.forEach(p => p.tasks.forEach((_, i) => ids.push(`${p.id}-${i}`)));
    for (let w = 1; w <= 3; w++) for (let a = 1; a <= 5; a++) ids.push(`app-w${w}-${a}`);
    return ids;
  };

  /* ------------------------------------------------------------ render */
  function render() {
    /* overall progress */
    const ids = allTaskIds();
    const done = ids.filter(isDone).length;
    $("#rm-fill").style.width = (done / ids.length * 100) + "%";
    $("#rm-count").textContent = `${done} / ${ids.length} done`;

    /* score ladder */
    $("#ladder").innerHTML = LADDER.map(l => `
      <div class="rung">
        <i style="background:${l.color}"></i>
        <b>${l.score}</b><span>${l.label}</span>
      </div>`).join("");

    /* gantt */
    let g = `<div></div>`;
    WEEKS.forEach(w => g += `<div class="wkhead"><b>${w[0]}</b> · ${w[1]}</div>`);
    g += `<div></div>`;
    DNUM.forEach((d, i) => g += `<div class="dnum${i % 7 > 4 ? " we" : ""}">${d}</div>`);

    PHASES.forEach(p => {
      const b = p.bar;
      const pct = Math.round(100 * p.tasks.filter((_, i) => isDone(`${p.id}-${i}`)).length / p.tasks.length);
      g += `<div class="lane">${esc(p.name.split(" ").slice(0, 3).join(" "))}</div>`;
      for (let d = 0; d < 21; d++) {
        if (d === b.s) {
          const span = b.e - b.s + 1;
          const style = b.ghost ? "" : `background:${p.color};`;
          g += `<div class="gbar ${b.ghost ? "ghost" : ""} ${pct === 100 ? "done" : ""}"
                     style="${style}grid-column:${2 + d} / span ${span}">
                  <span>${esc(b.text)}</span><em>${pct}%</em>
                </div>`;
          d = b.e;
        } else {
          g += `<div class="slot${d % 7 > 4 ? " we" : ""}${d % 7 === 0 ? " w0" : ""}"></div>`;
        }
      }
    });
    $("#gantt").innerHTML = g;

    /* phones can't fit a 21-column gantt — same data, stacked by week */
    const WK = [[0, 6], [7, 13], [14, 20]];
    $("#rm-weeks").innerHTML = WK.map((w, i) => {
      const inWeek = PHASES.filter(p => p.bar.s <= w[1] && p.bar.e >= w[0]);
      const ids = inWeek.flatMap(p => p.tasks.map((_, j) => `${p.id}-${j}`));
      const n = ids.filter(isDone).length;
      return `
        <div class="rmw">
          <div class="rmw-top">
            <b>${WEEKS[i][0]}</b>
            <span>${WEEKS[i][1]} · ${n}/${ids.length}</span>
          </div>
          <div class="rmw-bars">
            ${inWeek.map(p => {
              const d = p.tasks.filter((_, j) => isDone(`${p.id}-${j}`)).length;
              const pct = Math.round(100 * d / p.tasks.length);
              return `<div class="rmw-bar ${p.ghost ? "ghost" : ""}">
                        <i style="background:${p.color}"></i>${esc(p.bar.text)}
                        <em>${pct}%</em>
                      </div>`;
            }).join("")}
          </div>
        </div>`;
    }).join("");

    $("#miles").innerHTML = MILES.map(m => `
      <div class="mile" style="background:${m.color}">
        <b>${m.when}</b><span>${m.what}</span>
      </div>`).join("");

    /* phase cards with real checkboxes */
    $("#phases").innerHTML = PHASES.map(p => {
      const n = p.tasks.filter((_, i) => isDone(`${p.id}-${i}`)).length;
      const complete = n === p.tasks.length;
      return `
        <section class="phase ${p.ghost ? "is-ghost" : ""} ${complete ? "is-done" : ""}"
                 style="border-top-color:${p.color}">
          <div class="ph-top">
            <span class="ph-tag" style="color:${p.color}">${esc(p.tag)}</span>
            <span class="ph-n">${n}/${p.tasks.length}</span>
          </div>
          <h3>${esc(p.name)}</h3>
          <p class="ph-when">${esc(p.when)}</p>
          <ul class="checks">
            ${p.tasks.map((t, i) => {
              const id = `${p.id}-${i}`;
              return `<li class="${isDone(id) ? "on" : ""}" data-task="${id}">
                        <span class="box"></span><span class="txt">${t}</span>
                      </li>`;
            }).join("")}
          </ul>
        </section>`;
    }).join("");

    /* five applications a week */
    $("#apps").innerHTML = [1, 2, 3, 4, 5].map(() => "").length ? [1, 2, 3].map(w => {
      const sent = [1, 2, 3, 4, 5].filter(a => isDone(`app-w${w}-${a}`)).length;
      return `
        <div class="week">
          <span class="wk">Week ${w}</span>
          <div class="dots">
            ${[1, 2, 3, 4, 5].map(a => {
              const id = `app-w${w}-${a}`;
              return `<button class="dot ${isDone(id) ? "on" : ""}" data-task="${id}"
                              aria-label="Application ${a}, week ${w}"></button>`;
            }).join("")}
          </div>
          <span class="wk-n">${sent}/5 sent</span>
        </div>`;
    }).join("") : "";

    /* one handler for every checkbox on the page */
    $$("#view-project [data-task]").forEach(el =>
      el.onclick = () => toggle(el.dataset.task));
  }

  return {render};
})();
