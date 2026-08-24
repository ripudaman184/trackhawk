/* TrackHawk — Study: the 51-day runway (Aug 5 – Sep 24). Weekday mornings apply to fresh
   postings, weekday evenings study (1.5h course + 1h DSA + LeetCode), weekends do the deep
   job-hunt & flashcard work. Interview-prep priority rises from the midpoint to the finish.
   DSA/LeetCode, Spring Boot and the job hunt on schedule. Every tick, minute and
   note lives in the encrypted vault (TH.data.study, one record per day), so it
   syncs across devices exactly like jobs, cards and the roadmap do.            */

const RUNWAY = (() => {
  const $  = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g,
    c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const SESSIONS = [{"n":1,"mainTask":"[JAVA] S1 — Core Java — collections deep-dive (1/2)","adv":[],"dsaTask":"[DSA] Barik S1 — Big-O & runtime analysis","dsaAdv":[1],"lcTask":"[LC] Ch1 — Intro & Big-O — solve 1–2 problems","lcChapter":1,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":2,"mainTask":"[JAVA] S1 — Core Java — collections deep-dive (2/2)","adv":[["sp",1]],"dsaTask":"[DSA] Barik S1 — Big-O & runtime analysis","dsaAdv":[1],"lcTask":"[LC] Ch1 — Intro & Big-O — solve 1–2 problems","lcChapter":1,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":3,"mainTask":"[JAVA] S2 — Core Java — generics, equals/hashCode (1/2)","adv":[],"dsaTask":"[DSA] Barik S1 — Big-O & runtime analysis","dsaAdv":[1],"lcTask":"[LC] Ch1 — Intro & Big-O — solve 1–2 problems","lcChapter":1,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":4,"mainTask":"[JAVA] S2 — Core Java — generics, equals/hashCode (2/2)","adv":[["sp",2]],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":5,"mainTask":"[JAVA] S3 — Core Java — streams & lambdas (1/2)","adv":[],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":6,"mainTask":"[JAVA] S3 — Core Java — streams & lambdas (2/2)","adv":[["sp",3]],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":7,"mainTask":"[JAVA] S4 — Core Java — threads & concurrency (1/2)","adv":[],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":8,"mainTask":"[JAVA] S4 — Core Java — threads & concurrency (2/2)","adv":[["sp",4]],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":9,"mainTask":"[JAVA] S5 — Exceptions, I/O & files","adv":[["sp",5]],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":10,"mainTask":"[JAVA] Build day — Core Java katas — no tutorial, just code","adv":[],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":11,"mainTask":"[JAVA] S6 — Maven, project layout & dependency scopes","adv":[["sp",6]],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":12,"mainTask":"[JAVA] S7 — JUnit 5 + Mockito (1/2)","adv":[],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":13,"mainTask":"[JAVA] S7 — JUnit 5 + Mockito (2/2)","adv":[["sp",7]],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"SCAFFOLD"},{"n":14,"mainTask":"[JAVA] Build day — Write tests for yesterday's katas","adv":[],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":15,"mainTask":"[JAVA] S8 — Spring Core — IoC & DI (1/2)","adv":[],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":16,"mainTask":"[JAVA] S8 — Spring Core — IoC & DI (2/2)","adv":[["sp",8]],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":17,"mainTask":"[JAVA] S9 — Spring Core — bean scopes & lifecycle","adv":[["sp",9]],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":18,"mainTask":"[JAVA] S10 — Spring Boot — starters & autoconfiguration (1/2)","adv":[],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":19,"mainTask":"[JAVA] S10 — Spring Boot — starters & autoconfiguration (2/2)","adv":[["sp",10]],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"BOOT"},{"n":20,"mainTask":"[JAVA] Build day — First Boot app — hello endpoint, wired by hand","adv":[],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":21,"mainTask":"[JAVA] S11 — REST controllers & request mapping (1/2)","adv":[],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"prep":1,"morning":"Apply to 1 fresh role","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"n":22,"mainTask":"[JAVA] S11 — REST controllers & request mapping (2/2)","adv":[["sp",11]],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":23,"mainTask":"[JAVA] S12 — DTOs, validation & mapping","adv":[["sp",12]],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":24,"mainTask":"[JAVA] S13 — Global error handling (@ControllerAdvice)","adv":[["sp",13]],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15},"milestone":"REST"},{"n":25,"mainTask":"[JAVA] Build day — Full REST resource: GET/POST/PUT/DELETE + validation","adv":[],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":26,"mainTask":"[JAVA] S14 — JDBC & DataSource","adv":[["sp",14]],"dsaTask":"[DSA] Barik S7 — Heaps & priority queues","dsaAdv":[7],"lcTask":"[LC] Ch7 — Heaps — solve 1–2 problems","lcChapter":7,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":27,"mainTask":"[JAVA] S15 — Spring Data JPA — entities & repositories (1/2)","adv":[],"dsaTask":"[DSA] Barik S7 — Heaps & priority queues","dsaAdv":[7],"lcTask":"[LC] Ch7 — Heaps — solve 1–2 problems","lcChapter":7,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":28,"mainTask":"[JAVA] S15 — Spring Data JPA — entities & repositories (2/2)","adv":[["sp",15]],"dsaTask":"[DSA] Barik S7 — Heaps & priority queues","dsaAdv":[7],"lcTask":"[LC] Ch7 — Heaps — solve 1–2 problems","lcChapter":7,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15},"milestone":"DB"},{"n":29,"mainTask":"[JAVA] Build day — Wire a repository over a real Postgres","adv":[],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":30,"mainTask":"[JAVA] S16 — JPA relationships & fetch strategies (1/2)","adv":[],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":31,"mainTask":"[JAVA] S16 — JPA relationships & fetch strategies (2/2)","adv":[["sp",16]],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":32,"mainTask":"[JAVA] S17 — Transactions & @Transactional (1/2)","adv":[],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"prep":2,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"n":33,"mainTask":"[JAVA] S17 — Transactions & @Transactional (2/2)","adv":[["sp",17]],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":34,"mainTask":"[JAVA] S18 — JPQL, query methods & pagination","adv":[["sp",18]],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15},"milestone":"BUILDABLE"},{"n":35,"mainTask":"[JAVA] Build day — Model relationships — then break them on purpose","adv":[],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":36,"mainTask":"[JAVA] S19 — Hibernate performance — N+1, caching","adv":[["sp",19]],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":37,"mainTask":"[JAVA] S20 — Spring Security — authentication (1/2)","adv":[],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":38,"mainTask":"[JAVA] S20 — Spring Security — authentication (2/2)","adv":[["sp",20]],"dsaTask":"[DSA] Barik S10 — Searching & binary search","dsaAdv":[10],"lcTask":"[LC] Ch10 — Binary Search — solve 1–2 problems","lcChapter":10,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":39,"mainTask":"[JAVA] S21 — Spring Security — JWT & method authorization (1/2)","adv":[],"dsaTask":"[DSA] Barik S10 — Searching & binary search","dsaAdv":[10],"lcTask":"[LC] Ch10 — Binary Search — solve 1–2 problems","lcChapter":10,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":40,"mainTask":"[JAVA] S21 — Spring Security — JWT & method authorization (2/2)","adv":[["sp",21]],"dsaTask":"[DSA] Barik S10 — Searching & binary search","dsaAdv":[10],"lcTask":"[LC] Ch10 — Binary Search — solve 1–2 problems","lcChapter":10,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15},"milestone":"AUTH"},{"n":41,"mainTask":"[JAVA] Build day — Lock the endpoints down, then try to break in","adv":[],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":42,"mainTask":"[JAVA] S22 — Testing — MockMvc & slice tests (1/2)","adv":[],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"prep":3,"morning":"Apply to 2 fresh roles","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"n":43,"mainTask":"[JAVA] S22 — Testing — MockMvc & slice tests (2/2)","adv":[["sp",22]],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"n":44,"mainTask":"[JAVA] S23 — Testing — Testcontainers","adv":[["sp",23]],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15},"milestone":"TESTS"},{"n":45,"mainTask":"[JAVA] Build day — Integration test the whole slice","adv":[],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"n":46,"mainTask":"[JAVA] S24 — Caching with Redis","adv":[["sp",24]],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"n":47,"mainTask":"[JAVA] S25 — Docker — containerising the service","adv":[["sp",25]],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"n":48,"mainTask":"[JAVA] Build day — docker-compose the stack end to end","adv":[],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"n":49,"mainTask":"[JAVA] S26 — CI with GitHub Actions","adv":[["sp",26]],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"n":50,"mainTask":"[JAVA] S27 — Actuator, logging & metrics","adv":[["sp",27]],"dsaTask":"[DSA] Barik S13 — Greedy algorithms","dsaAdv":[13],"lcTask":"[LC] Ch13 — Greedy & review — solve 1–2 problems","lcChapter":13,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15},"milestone":"COURSE_DONE"},{"n":51,"mainTask":"[JAVA] Build day — Ship it — README, endpoints, one diagram","adv":[],"dsaTask":"[DSA] Barik S13 — Greedy algorithms","dsaAdv":[13],"lcTask":"[LC] Ch13 — Greedy & review — solve 1–2 problems","lcChapter":13,"prep":4,"morning":"Apply to 3 fresh roles","expected":{"course":90,"dsa":60,"prep":60,"job":15}}];
  /* the old calendar plan, kept only to migrate existing ticks once */
  const LEGACY_DATES = ["2026-08-24","2026-08-25","2026-08-26","2026-08-27","2026-08-28","2026-08-31","2026-09-01","2026-09-02","2026-09-03","2026-09-04","2026-09-07","2026-09-08","2026-09-09","2026-09-10","2026-09-11","2026-09-14","2026-09-15","2026-09-16","2026-09-17","2026-09-18","2026-09-21","2026-09-22","2026-09-23","2026-09-24","2026-09-25","2026-09-28","2026-09-29","2026-09-30","2026-10-01","2026-10-02","2026-10-05","2026-10-06","2026-10-07","2026-10-08","2026-10-09","2026-10-12","2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-19","2026-10-20","2026-10-21","2026-10-22","2026-10-23","2026-10-26","2026-10-27","2026-10-28","2026-10-29","2026-10-30","2026-11-02"];
  const SESS = Object.fromEntries(SESSIONS.map(x => [x.n, x]));
  const LAST = SESSIONS.length;

  /* ---------------------------------------------------------------------
     The runway is indexed by SESSION, not by calendar date. Session 1 is
     whatever you do first; the plan advances only when you complete work,
     so a missed evening delays the finish rather than invalidating the plan.
     Calendar dates appear only as (a) the day you started, (b) projections,
     and (c) weekend prep, which genuinely is calendar-bound.
     --------------------------------------------------------------------- */
  const KEY = n => "s" + n;                       // study session record key
  const iso = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const todayISO = () => iso(new Date());
  const isWeekend = (dt) => { const w = (dt||new Date()).getDay(); return w===0 || w===6; };

  const TOTALS = {sp:27, dsa:13, lc:13};
  const CAT = {course:"var(--amber)", auto:"var(--amber)", spring:"var(--lime)", dsa:"var(--violet)", prep:"var(--cyan)", job:"var(--marker)"};
  const GOOD = "var(--lime)";

  /* -------------------------------------------------------- injected styles */
  function ensureStyles() {
    if ($("#rw-style")) return;
    const css = `
    #view-runway,#view-runway *{box-sizing:border-box}
    #view-runway .rw-wrap{max-width:1080px;margin:0 auto;width:100%}
    .rw-subnav{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:16px}
    .rw-sb{background:transparent;color:var(--mute);border:1px solid #26262F;border-radius:999px;
      padding:8px 15px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;
      text-transform:uppercase;cursor:pointer;transition:.15s}
    .rw-sb:hover{color:var(--paper);border-color:#3A3A46}
    .rw-sb.on{color:var(--canvas,#0A0A0C);background:var(--lime);border-color:var(--lime);font-weight:700}
    .rw-streak{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber);
      border:1px solid #4a3a12;background:rgba(255,176,32,.08);border-radius:999px;padding:7px 13px;font-weight:700}

    /* ---------- the runway: the signature panel ---------- */
    .rw-runway{position:relative;background:linear-gradient(180deg,#12121a 0%,#0f0f14 100%);
      border:1px solid var(--line);border-radius:18px;padding:20px 22px 18px;margin-bottom:20px;overflow:visible;
      box-shadow:0 18px 40px -28px rgba(0,0,0,.9)}
    .rw-runway:before{content:"";position:absolute;top:-1px;left:22px;right:22px;height:2px;border-radius:2px;
      background:linear-gradient(90deg,var(--marker),var(--violet) 55%,var(--lime));opacity:.85}
    .rw-rtop{display:flex;align-items:baseline;gap:11px;flex-wrap:wrap;margin-bottom:11px}
    .rw-rtop h2{font-family:'Anton',sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:21px;
      color:var(--lime);line-height:1}
    .rw-rtop .sub{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mute)}
    .rw-rtop .pct{margin-left:auto;font-family:'Anton',sans-serif;font-size:26px;color:var(--paper);line-height:1;letter-spacing:.02em}

    /* progress meter with a "where the plan expects you" marker */
    .rw-meter{position:relative;height:7px;border-radius:5px;background:#191920;overflow:visible;margin:0 0 16px}
    .rw-meter>i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,#a9e02a,var(--lime));
      transition:width .55s cubic-bezier(.2,.8,.2,1)}
    .rw-meter .rw-now{position:absolute;top:-4px;bottom:-4px;width:2px;background:var(--paper);opacity:.75;border-radius:2px}
    .rw-meter .rw-now:after{content:"";position:absolute;top:-3px;left:-2px;width:6px;height:6px;border-radius:50%;background:var(--paper)}
    .rw-meter{cursor:pointer;touch-action:none}
    .rw-scrub{position:absolute;top:50%;width:15px;height:15px;border-radius:50%;background:var(--paper);
      border:2px solid var(--canvas,#0A0A0C);transform:translate(-50%,-50%);cursor:grab;z-index:6;
      box-shadow:0 2px 7px rgba(0,0,0,.65);transition:left .18s ease, transform .1s}
    .rw-scrub:hover{transform:translate(-50%,-50%) scale(1.18)}
    .rw-scrub.grabbing{cursor:grabbing;transition:none;transform:translate(-50%,-50%) scale(1.25);
      box-shadow:0 0 0 6px rgba(242,242,244,.14),0 2px 7px rgba(0,0,0,.65)}
    .rw-scrub:after{content:"";position:absolute;left:50%;top:50%;width:5px;height:5px;border-radius:50%;
      background:var(--canvas,#0A0A0C);transform:translate(-50%,-50%)}
    .rw-plane{position:absolute;top:50%;transform:translate(-50%,-50%);font-size:15px;filter:drop-shadow(0 0 6px rgba(200,255,50,.7));
      transition:left 1.1s cubic-bezier(.34,1.2,.5,1);pointer-events:none;z-index:3}
    .rw-flame{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber);font-weight:700;
      margin-left:auto;padding-right:12px;animation:rw-flick 1.6s ease-in-out infinite}
    @keyframes rw-flick{0%,100%{opacity:1;transform:translateY(0)}50%{opacity:.75;transform:translateY(-1px)}}
    .rw-rtop .pct{margin-left:0}
    /* completed-pip checkmark + phase-tint hover glow + hot-day spark + click ripple */
    .rw-pip .rw-tick{position:absolute;top:2px;right:3px;font-size:8px;color:#12121a;font-style:normal;z-index:3;font-weight:800}
    .rw-pip:hover{box-shadow:0 8px 18px -6px var(--tint,rgba(0,0,0,.75)),0 0 0 1px var(--tint,transparent) inset}
    .rw-pip.hot:before{content:"";position:absolute;top:3px;left:3px;width:4px;height:4px;border-radius:50%;
      background:var(--cyan);box-shadow:0 0 5px var(--cyan);z-index:3;animation:rw-pulse 1.8s ease-in-out infinite}
    @keyframes rw-pulse{0%,100%{opacity:.5;transform:scale(.8)}50%{opacity:1;transform:scale(1.25)}}
    .rw-pip.today{animation:rw-breathe 2.4s ease-in-out infinite}
    @keyframes rw-breathe{0%,100%{box-shadow:0 0 0 2px rgba(255,176,32,.28)}50%{box-shadow:0 0 0 4px rgba(255,176,32,.14)}}
    .rw-pip.just{animation:rw-pop .4s cubic-bezier(.3,1.5,.5,1)}
    @keyframes rw-pop{0%{transform:scale(1)}40%{transform:scale(1.22)}100%{transform:scale(1)}}
    .rw-ripple{position:absolute;border-radius:50%;background:var(--lime);opacity:.5;transform:translate(-50%,-50%);
      pointer-events:none;animation:rw-rip .5s ease-out forwards;z-index:5}
    @keyframes rw-rip{to{width:60px;height:60px;opacity:0}}

    /* month band (single-strip mode only) */
    .rw-months{display:none;grid-template-columns:repeat(var(--n,53),1fr);gap:3px;margin-bottom:8px}
    .rw-mo{cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;text-transform:uppercase;
      color:var(--mute);border-left:1px solid var(--line2);padding-left:5px;white-space:nowrap;overflow:hidden;transition:color .12s}
    .rw-mo:hover{color:var(--paper)}

    /* weekday header (calendar mode only) */
    .rw-dowhd{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin-bottom:6px}
    .rw-dowhd span{text-align:center;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;color:#4d4d59}

    /* the pips — a grid, so they always fit the width and never clip */
    .rw-spine{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
    .rw-pip{position:relative;height:34px;border-radius:7px;background:#191920;border:1px solid #24242d;
      cursor:pointer;overflow:hidden;-webkit-tap-highlight-color:transparent;
      transition:transform .13s cubic-bezier(.2,.8,.2,1),box-shadow .13s,border-color .13s}
    .rw-pip:hover{transform:translateY(-3px);border-color:#4c4c5c;box-shadow:0 8px 16px -6px rgba(0,0,0,.75);z-index:3}
    .rw-pip:focus-visible{outline:2px solid var(--lime);outline-offset:2px}
    .rw-pip.wknd{background:#1d1830;border-color:#2c2444}
    .rw-cap{position:absolute;top:0;left:0;right:0;height:3px;border-radius:7px 7px 0 0;background:var(--tint,#2c2c38);opacity:.9;z-index:2}
    .rw-fill{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(180deg,#d8ff63,var(--lime));
      transition:height .45s cubic-bezier(.2,.8,.2,1)}
    .rw-pip.full{border-color:var(--lime)}
    .rw-pip b{position:absolute;inset:0;display:grid;place-items:center;z-index:2;
      font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:#6a6a78}
    .rw-pip.full b,.rw-pip.half b{color:#12121a}
    .rw-pip.today{border-color:var(--amber);box-shadow:0 0 0 2px rgba(255,176,32,.28)}
    .rw-pip.today:before{content:"";position:absolute;top:3px;left:50%;transform:translateX(-50%);
      width:4px;height:4px;border-radius:50%;background:var(--amber);z-index:3}
    .rw-pip.mile:after{content:"";position:absolute;top:4px;right:4px;width:5px;height:5px;z-index:3;
      background:var(--amber);transform:rotate(45deg);border-radius:1px}
    .rw-pip.sel{outline:2px solid var(--paper);outline-offset:2px;z-index:4}
    .rw-pad{visibility:hidden}

    /* hover card */
    .rw-tip{position:absolute;z-index:40;pointer-events:none;opacity:0;transform:translateX(-50%);
      background:#1c1c25;border:1px solid #33333f;border-radius:11px;padding:10px 12px;width:238px;
      box-shadow:0 16px 34px -10px rgba(0,0,0,.85);transition:opacity .13s}
    .rw-tip.on{opacity:1}
    .rw-tip .tt-d{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--amber)}
    .rw-tip .tt-t{font-size:12.5px;color:var(--paper);margin-top:4px;line-height:1.35}
    .rw-tip .tt-p{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--mute);margin-top:6px;
      display:flex;align-items:center;gap:7px}
    .rw-tip .tt-bar{flex:1;height:4px;border-radius:3px;background:#2a2a34;overflow:hidden}
    .rw-tip .tt-bar>i{display:block;height:100%;background:var(--lime);border-radius:3px}

    .rw-legend{display:flex;gap:15px;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:10px;
      color:var(--mute);margin-top:12px}
    .rw-legend span{display:inline-flex;align-items:center;gap:6px}
    .rw-dot{width:9px;height:9px;border-radius:2px;display:inline-block}

    .rw-daynav{display:flex;align-items:center;gap:8px;margin-bottom:6px}
    .rw-arrow{width:40px;height:40px;border-radius:11px;border:1px solid var(--line2);background:var(--panel2);
      color:var(--paper);font-size:18px;cursor:pointer}
    .rw-arrow:hover{border-color:#454554;background:#1c1c24}.rw-arrow:disabled{opacity:.3;cursor:default}
    .rw-dtitle{flex:1;text-align:center}
    .rw-dtitle .d1{font-family:'Anton',sans-serif;text-transform:uppercase;letter-spacing:.04em;font-size:20px;color:var(--paper)}
    .rw-dtitle .d2{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mute)}
    .rw-jump{display:block;margin:0 auto 16px;background:transparent;border:1px solid #26262F;color:var(--mute);
      font-family:'JetBrains Mono',monospace;font-size:11px;border-radius:999px;padding:6px 14px;cursor:pointer}
    .rw-jump:hover{color:var(--paper);border-color:#3A3A46}

    .rw-card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:18px;margin-bottom:14px}
    .rw-card h3{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);margin-bottom:12px}
    .rw-head{display:flex;align-items:center;gap:16px;margin-bottom:6px}
    .rw-ring{flex:0 0 auto;position:relative}
    .rw-ring .v{position:absolute;inset:0;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-weight:700}
    .rw-chips{display:flex;gap:7px;flex-wrap:wrap}
    .rw-chip{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;
      border-radius:999px;padding:5px 10px;border:1px solid #26262F;color:var(--mute)}
    .rw-chip.auto{color:var(--amber);border-color:#4a3a12;background:rgba(255,176,32,.07)}
    .rw-chip.dsa{color:var(--violet);border-color:#372a55;background:rgba(160,107,255,.08)}
    .rw-chip.spring{color:var(--lime);border-color:#3f5a1a;background:rgba(200,255,50,.06)}
    .rw-chip.prep{color:var(--cyan);border-color:#1b4a47;background:rgba(34,211,197,.08)}
    .rw-grp{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;
      color:var(--mute);margin:14px 0 2px;padding-top:12px;border-top:1px solid var(--line2);display:flex;gap:7px;align-items:center}
    .rw-grp:first-child{border-top:none;padding-top:2px;margin-top:8px}
    .rw-chip.mile{color:var(--canvas,#0A0A0C);background:var(--amber);border-color:var(--amber);font-weight:700}
    .rw-maintask{font-family:'Space Grotesk';font-weight:700;font-size:15.5px;color:var(--paper);margin-top:9px;line-height:1.3}
    .rw-subtask{font-size:12.5px;color:var(--mute);margin-top:3px}

    .rw-tasks{list-style:none;margin:14px 0 0}
    .rw-tasks li{display:flex;gap:11px;align-items:flex-start;padding:10px 2px;border-top:1px solid var(--line2);cursor:pointer}
    .rw-tasks li:first-child{border-top:none}
    .rw-flag{flex:0 0 auto;width:3px;align-self:stretch;border-radius:2px;background:var(--line2)}
    .rw-box{flex:0 0 auto;width:17px;height:17px;margin-top:1px;border:1.5px solid #3A3A46;border-radius:5px;position:relative;transition:.12s}
    .rw-tasks li:hover .rw-box{border-color:var(--lime)}
    .rw-tasks li.on .rw-box{background:var(--lime);border-color:var(--lime)}
    .rw-tasks li.on .rw-box:after{content:"";position:absolute;left:5px;top:1px;width:4px;height:9px;
      border:solid var(--canvas,#0A0A0C);border-width:0 2px 2px 0;transform:rotate(45deg)}
    .rw-tl{flex:1;font-size:13.5px;color:#C4C4D0;line-height:1.4}
    .rw-tasks li.main .rw-tl{font-weight:700;font-size:14px;color:var(--paper)}
    .rw-tasks li.on .rw-tl{color:#55555F;text-decoration:line-through}

    .rw-tgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .rw-tcell{border:1px solid var(--line2);border-radius:11px;padding:11px;background:#0d0d12}
    .rw-tcell .lab{display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:10px;
      letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
    .rw-tcell .row{display:flex;align-items:baseline;gap:6px;margin-top:7px}
    .rw-in{width:66px;background:var(--panel2);border:1px solid var(--line2);border-radius:8px;color:var(--paper);
      font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:700;padding:6px 8px}
    .rw-in:focus{outline:none;border-color:var(--lime)}
    .rw-tcell .exp{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#55555F}
    .rw-tbar{height:5px;border-radius:3px;background:#1b1b22;margin-top:9px;overflow:hidden}
    .rw-tbar>i{display:block;height:100%;border-radius:3px;transition:width .3s}
    .rw-numrow{display:flex;gap:10px;flex-wrap:wrap;margin-top:11px}
    .rw-numrow .rw-tcell{flex:1;min-width:150px}
    .rw-note{width:100%;background:#0d0d12;border:1px solid var(--line2);border-radius:11px;color:var(--paper);
      font-family:'Space Grotesk';font-size:13.5px;padding:11px;min-height:70px;resize:vertical}
    .rw-note:focus{outline:none;border-color:var(--lime)}
    .rw-hint{font-family:'JetBrains Mono',monospace;font-size:10px;color:#55555F;margin-top:8px}

    /* timeline */
    .rw-wk{margin-bottom:6px}
    .rw-wkhd{display:flex;align-items:center;gap:10px;padding:14px 2px 8px}
    .rw-wkhd .t{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--paper)}
    .rw-wkhd .p{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--mute)}
    .rw-row{display:flex;align-items:center;gap:12px;background:var(--panel);border:1px solid var(--line);
      border-radius:12px;padding:11px 13px;margin-bottom:7px;width:100%;text-align:left;cursor:pointer;color:inherit;font:inherit}
    .rw-row:hover{border-color:#3a3a46}
    .rw-row.today{border-color:var(--amber)}
    .rw-row .dd{flex:0 0 44px;text-align:center}
    .rw-row .dd .dn{font-family:'Anton',sans-serif;font-size:19px;color:var(--paper)}
    .rw-row .dd .dw{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.05em;text-transform:uppercase;color:var(--mute)}
    .rw-row .bd{flex:1;min-width:0}
    .rw-row .bd .t{font-size:13px;color:var(--paper);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .rw-row .bd .s{font-size:11.5px;color:var(--mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .rw-mini{flex:0 0 auto;position:relative;width:34px;height:34px}
    .rw-mini .mv{position:absolute;inset:0;display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700}

    /* rollups */
    .rw-seg{display:inline-flex;background:#0d0d12;border:1px solid var(--line2);border-radius:11px;padding:3px;margin-bottom:16px}
    .rw-seg button{border:none;background:transparent;color:var(--mute);font-family:'JetBrains Mono',monospace;
      font-size:11px;letter-spacing:.05em;text-transform:uppercase;padding:8px 15px;border-radius:8px;cursor:pointer}
    .rw-seg button.on{background:var(--panel2);color:var(--paper)}
    .rw-roll{background:var(--panel);border:1px solid var(--line);border-radius:14px;margin-bottom:12px;overflow:hidden}
    .rw-roll summary{list-style:none;cursor:pointer;padding:14px 15px;display:flex;align-items:center;gap:13px}
    .rw-roll summary::-webkit-details-marker{display:none}
    .rw-roll .cap{flex:1;min-width:0}
    .rw-roll .cap .rt{font-family:'Anton',sans-serif;text-transform:uppercase;letter-spacing:.03em;font-size:15px;color:var(--paper)}
    .rw-roll .cap .rs{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--mute);margin-top:2px}
    .rw-roll .rr{text-align:right}
    .rw-roll .rr .big{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:15px;color:var(--paper)}
    .rw-roll .rr .sm{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--mute)}
    .rw-caret{color:var(--mute);transition:.2s}.rw-roll[open] .rw-caret{transform:rotate(90deg)}
    .rw-rbody{padding:0 15px 16px;border-top:1px solid var(--line2)}
    .rw-kv{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0}
    .rw-kv .c{background:#0d0d12;border-radius:10px;padding:10px}
    .rw-kv .c .k{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
    .rw-kv .c .v{font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:var(--paper);margin-top:3px}
    .rw-mrow{margin:12px 0}
    .rw-mtop{display:flex;align-items:baseline;gap:8px;margin-bottom:6px}
    .rw-mtop .nm{font-size:13px;color:var(--paper);display:flex;align-items:center;gap:7px}
    .rw-mtop .cn{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:var(--paper)}
    .rw-mtop .cn small{color:#55555F;font-weight:400}
    .rw-pbar{height:8px;border-radius:4px;background:#1b1b22;overflow:hidden}
    .rw-pbar>i{display:block;height:100%;border-radius:4px;transition:width .4s cubic-bezier(.2,.8,.2,1)}
    .rw-ex{display:flex;align-items:center;gap:10px;margin:11px 0}
    .rw-ex .nm{width:72px;font-size:11.5px;color:#C4C4D0;display:flex;align-items:center;gap:6px}
    .rw-ex .bars{flex:1}
    .rw-ex .b1{height:8px;border-radius:4px;background:#1b1b22;position:relative;overflow:hidden}
    .rw-ex .b1>i{display:block;height:100%;border-radius:4px}
    .rw-ex .mk{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--paper);opacity:.6}
    .rw-ex .rd{width:92px;text-align:right;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--paper)}
    .rw-ex .rd small{color:#55555F}
    .rw-eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
    .rw-miles{list-style:none;margin:6px 0 0}
    .rw-miles li{display:flex;gap:9px;align-items:flex-start;padding:8px 2px;font-size:13px;color:#C4C4D0;border-top:1px solid var(--line2)}
    .rw-miles li:first-child{border-top:none}
    .rw-mbox{flex:0 0 auto;width:16px;height:16px;border-radius:4px;border:1.5px solid #3A3A46;position:relative;margin-top:1px}
    .rw-miles li.hit .rw-mbox{background:var(--lime);border-color:var(--lime)}
    .rw-miles li.hit .rw-mbox:after{content:"";position:absolute;left:4px;top:0;width:4px;height:8px;border:solid var(--canvas,#0A0A0C);border-width:0 2px 2px 0;transform:rotate(45deg)}
    .rw-miles li.hit{color:#55555F}

    .rw-call{display:flex;gap:12px;align-items:center;background:rgba(255,176,32,.06);border:1px solid #4a3a12;
      border-radius:14px;padding:14px 16px;margin-bottom:16px}
    .rw-call .ic{font-size:20px}.rw-call .tx{flex:1;font-size:13px;color:#C4C4D0}.rw-call .tx b{color:var(--paper)}
    .rw-call .st{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;padding:5px 11px;border-radius:999px}
    .rw-call .st.no{background:rgba(255,46,154,.12);color:var(--marker)}
    .rw-call .st.yes{background:rgba(200,255,50,.14);color:var(--lime)}
    .rw-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:16px}
    .rw-tile{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px 15px}
    .rw-tile .k{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
    .rw-tile .v{font-family:'Anton',sans-serif;font-size:28px;color:var(--paper);margin-top:4px}
    .rw-tile .v small{font-family:'JetBrains Mono',monospace;font-size:11px;color:#55555F}
    .rw-two{display:grid;grid-template-columns:1fr;gap:14px}
    .rw-q{width:100%;background:#0d0d12;border:1px solid var(--line2);border-radius:10px;color:var(--paper);
      font-family:'Space Grotesk';font-size:13.5px;padding:10px 11px}
    .rw-q:focus{outline:none;border-color:var(--lime)}
    .rw-qn{display:flex;gap:9px;align-items:center;margin-bottom:9px}
    .rw-qi{flex:0 0 auto;width:21px;height:21px;border-radius:6px;background:#1b1b22;color:var(--mute);
      display:grid;place-items:center;font-family:'JetBrains Mono',monospace;font-size:10px}
    .rw-qlist{list-style:none;margin:0}
    .rw-qlist li{display:flex;gap:11px;padding:9px 2px;border-top:1px solid var(--line2);font-size:13px;color:#C4C4D0;line-height:1.4}
    .rw-qlist li:first-child{border-top:none}
    .rw-qlist .qd{flex:0 0 46px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--mute);padding-top:2px}
    /* ================= responsive =================
       phone → calendar grid · iPad Pro 11" portrait (834) → calendar grid, big taps
       iPad Pro 11" landscape (1194) & desktop → the full 53-day strip            */
    @media(max-width:560px){
      .rw-runway{padding:16px 15px 15px;border-radius:15px}
      .rw-runway:before{left:15px;right:15px}
      .rw-rtop h2{font-size:18px}.rw-rtop .pct{font-size:22px}
      .rw-tiles{grid-template-columns:repeat(2,1fr)}
      .rw-kv{grid-template-columns:repeat(2,1fr)}
      .rw-tgrid{grid-template-columns:1fr}
      .rw-tip{width:200px}
    }
    @media(min-width:561px){ .rw-tgrid{grid-template-columns:repeat(2,1fr)} }

    /* tablet / iPad portrait — keep the tappable calendar, widen the content */
    @media(min-width:700px) and (max-width:899px){
      .rw-wrap{max-width:840px}
      .rw-two{grid-template-columns:1fr}
      .rw-pip{height:44px;border-radius:9px}
      .rw-pip b{font-size:13px}
      .rw-spine,.rw-dowhd{gap:7px}
    }

    /* iPad landscape & desktop — the single 53-day runway strip */
    @media(min-width:900px){
      .rw-two{grid-template-columns:1fr 1fr}
      .rw-tgrid{grid-template-columns:repeat(4,1fr)}
      .rw-spine{grid-template-columns:repeat(var(--n,53),1fr);gap:3px}
      .rw-pip{height:42px;border-radius:5px}
      .rw-pip b{display:none}
      .rw-pad{display:none}
      .rw-dowhd{display:none}
      .rw-months{display:grid}
    }
    @media(min-width:900px) and (max-width:1080px){ .rw-spine{gap:2px}.rw-months{gap:2px} }

    /* touch devices: no hover lift, bigger hit areas */
    @media(hover:none){
      .rw-pip:hover{transform:none;box-shadow:none;border-color:#24242d}
      .rw-pip.wknd:hover{border-color:#2c2444}
      .rw-row:hover{border-color:var(--line)}
    }

    /* ---------- session timeline list ---------- */
    .rw-slist{display:flex;flex-direction:column;gap:4px}
    .rw-srow{display:grid;grid-template-columns:38px 1fr auto;grid-template-rows:auto auto;
      gap:2px 10px;align-items:center;width:100%;text-align:left;cursor:pointer;
      background:#12121a;border:1px solid var(--line);border-radius:10px;padding:9px 11px;transition:.15s}
    .rw-srow:hover{border-color:var(--line2);background:#16161f}
    .rw-srow.now{border-color:var(--amber);box-shadow:0 0 0 1px rgba(255,176,32,.2)}
    .rw-srow.done{opacity:.72}
    .rw-srow .sn{grid-row:1/3;font:700 12px/1 'JetBrains Mono',monospace;color:var(--mute)}
    .rw-srow.done .sn{color:var(--lime)}
    .rw-srow.now .sn{color:var(--amber)}
    .rw-srow .st{font:500 13px/1.35 'Space Grotesk',sans-serif;color:var(--paper);min-width:0}
    .rw-srow.done .st{text-decoration:line-through;text-decoration-color:rgba(200,255,50,.4)}
    .rw-srow .sp{font:700 11px/1 'JetBrains Mono',monospace;color:var(--mute)}
    .rw-srow .sp .sd{display:inline-block;margin-left:5px;font-style:normal;font-size:9px;
      color:var(--amber);background:rgba(255,176,32,.13);border-radius:4px;padding:2px 4px;vertical-align:middle}
    .rw-srow .sb{grid-column:2/4;height:3px;border-radius:2px;background:#1d1d25;overflow:hidden}
    .rw-srow .sb i{display:block;height:100%;background:var(--lime);border-radius:2px}
    @media(max-width:560px){.rw-srow .st{font-size:12px}}

    /* ---------- deferral · timers · pace · pip peek ---------- */
    .rw-tasks li{position:relative}
    .rw-mv{position:absolute;right:8px;top:50%;transform:translateY(-50%);opacity:0;
      background:#17171d;border:1px solid var(--line2);color:var(--mute);border-radius:7px;
      font:600 11px/1 'Space Grotesk',sans-serif;padding:5px 7px;cursor:pointer;transition:.15s}
    .rw-tasks li:hover .rw-mv,.rw-tasks li:focus-within .rw-mv{opacity:1}
    .rw-mv:hover{color:var(--paper);border-color:var(--cyan)}
    @media(hover:none){.rw-mv{opacity:.75}}
    .rw-tasks li.moved{border-left:2px solid var(--cyan)}
    .rw-from{font:600 10px/1 'JetBrains Mono',monospace;color:var(--cyan);opacity:.85;margin-left:7px;white-space:nowrap}
    .rw-tasks li.rw-gone{opacity:.4}
    .rw-tasks li.rw-gone .rw-tl{text-decoration:line-through;text-decoration-color:var(--mute)}
    .rw-tasks li.rw-gone .rw-from{color:var(--amber)}
    .rw-pop{position:absolute;right:6px;top:calc(50% + 15px);z-index:40;background:var(--panel2);
      border:1px solid var(--line2);border-radius:10px;padding:8px;display:flex;flex-wrap:wrap;gap:5px;
      box-shadow:0 14px 34px rgba(0,0,0,.6);max-width:268px}
    .rw-pop button{background:#15151b;border:1px solid var(--line);color:var(--paper);border-radius:7px;
      font:600 11px/1 'Space Grotesk',sans-serif;padding:6px 8px;cursor:pointer}
    .rw-pop button:hover{border-color:var(--cyan);color:var(--cyan)}
    .rw-pop .ttl{width:100%;font:700 9px/1 'Space Grotesk',sans-serif;letter-spacing:.09em;
      text-transform:uppercase;color:var(--mute);margin-bottom:1px}
    .rw-tasks li.drag{opacity:.35}
    .rw-pip.drop{outline:2px solid var(--cyan);outline-offset:1px;transform:translateY(-2px)}
    .rw-tm{background:#15151b;border:1px solid var(--line);color:var(--mute);border-radius:6px;
      font:700 10px/1 'JetBrains Mono',monospace;padding:6px 7px;cursor:pointer;margin-left:5px;transition:.15s}
    .rw-tm:hover{color:var(--paper);border-color:var(--line2)}
    .rw-tm.run{color:#07070a;background:var(--lime);border-color:var(--lime)}
    .rw-pace{display:grid;grid-template-columns:repeat(auto-fit,minmax(126px,1fr));gap:9px}
    .rw-pc{background:#131319;border:1px solid var(--line);border-radius:11px;padding:10px 11px}
    .rw-pc .k{font:700 9px/1 'Space Grotesk',sans-serif;letter-spacing:.09em;text-transform:uppercase;color:var(--mute)}
    .rw-pc .v{font:700 21px/1.1 'Space Grotesk',sans-serif;color:var(--paper);margin-top:6px}
    .rw-pc .s{font:500 11px/1.35 'Space Grotesk',sans-serif;color:var(--mute);margin-top:4px}
    .rw-pc.good .v{color:var(--lime)}.rw-pc.warn .v{color:var(--amber)}.rw-pc.bad .v{color:var(--marker)}
    .rw-what{margin-top:11px;background:#101016;border:1px dashed var(--line2);border-radius:11px;
      padding:11px 13px;font:500 12px/1.6 'Space Grotesk',sans-serif;color:var(--mute)}
    .rw-what b{color:var(--paper)}.rw-what .sw{color:var(--amber)}.rw-what .gd{color:var(--lime)}
    .rw-peek{margin:10px 0 2px;background:#12121a;border:1px solid var(--line2);border-radius:12px;padding:11px 12px}
    .rw-peek .ph{display:flex;align-items:center;gap:9px;margin-bottom:9px;flex-wrap:wrap}
    .rw-peek .ph b{font:700 13px/1 'Space Grotesk',sans-serif;color:var(--paper)}
    .rw-peek .ph span{font:600 11px/1 'JetBrains Mono',monospace;color:var(--mute)}
    .rw-peek .ph .go{margin-left:auto;background:none;border:1px solid var(--line2);color:var(--cyan);
      border-radius:7px;font:600 11px/1 'Space Grotesk',sans-serif;padding:6px 9px;cursor:pointer}
    .rw-peek .ph .go:hover{background:rgba(34,211,197,.09)}
    .rw-chk{display:flex;flex-wrap:wrap;gap:6px}
    .rw-chk button{display:flex;align-items:center;gap:7px;background:#16161c;border:1px solid var(--line);
      color:var(--mute);border-radius:8px;font:500 11px/1.25 'Space Grotesk',sans-serif;padding:7px 9px;
      cursor:pointer;text-align:left;transition:.15s}
    .rw-chk button i{width:9px;height:9px;border-radius:2px;border:1px solid var(--line2);flex:none}
    .rw-chk button:hover{border-color:var(--line2);color:var(--paper)}
    .rw-chk button.on{color:var(--paper);border-color:rgba(200,255,50,.42)}
    .rw-chk button.on i{background:var(--lime);border-color:var(--lime)}
    
    /* iPad/iPhone PWA safe areas */
    @supports(padding:max(0px)){
      #view-runway .rw-wrap{padding-left:max(0px,env(safe-area-inset-left));padding-right:max(0px,env(safe-area-inset-right))}
    }
    `;
    const el = document.createElement("style"); el.id = "rw-style"; el.textContent = css;
    document.head.appendChild(el);
  }

  /* ------------------------------------------------------------ vault I/O */
  /* self-heal: works even if an older core.js (no study map yet) is briefly cached */
  function studyMap() { if (!TH.S || !TH.S.data) return {}; if (!TH.S.data.study) TH.S.data.study = {}; return TH.S.data.study; }
  function rec(key) {
    const m = studyMap();
    let r = m[key];
    if (!r) { r = {id:key, done:{}, tmin:{}, note:"", problems:null, applied:0}; m[key] = r; }
    if (!r.done) r.done = {}; if (!r.tmin) r.tmin = {}; if (!r.defer) r.defer = {};
    if (!Array.isArray(r.iq)) r.iq = ["", ""];
    return r;
  }
  const peek = key => studyMap()[key] || {done:{}, tmin:{}, iq:[]};

  /* ---- session time -----------------------------------------------------
     Two numbers, answering different questions:
       mins(n) — minutes logged on that session (timers + manual). Effort.
       span(n) — calendar days from first activity to completion. A session
                 done in one sitting spans 1; one picked at over a week
                 spans 8. This is drag, usually the more revealing figure.  */
  function mins(n) {
    const t = peek(KEY(n)).tmin || {};
    return ["course","dsa","prep","job"].reduce((a,k) => a + (+t[k] || 0), 0);
  }
  function span(n) {
    const r = peek(KEY(n));
    if (!r.t0) return null;
    return Math.max(1, Math.round(((r.t1 || Date.now()) - r.t0) / 86400000) + 1);
  }
  const doneSessions = () => SESSIONS.filter(x => comp(x.n) >= 0.999);
  function avgMins() {
    const d = doneSessions().filter(x => mins(x.n) > 0);
    return d.length ? d.reduce((a,x) => a + mins(x.n), 0) / d.length : 0;
  }
  function avgSpan() {
    const v = doneSessions().map(x => span(x.n)).filter(Boolean);
    return v.length ? v.reduce((a,b) => a + b, 0) / v.length : 0;
  }
  const fmtM = m => m >= 60 ? Math.floor(m/60) + "h" + (Math.round(m%60) ? String(Math.round(m%60)).padStart(2,"0") : "")
                            : Math.round(m) + "m";

  /* ---- one-time migration from the old date-keyed plan ------------------ */
  function migrate() {
    const p = prefs(); if (p.migrated) return;
    const m = studyMap(); let moved = 0, first = null;
    LEGACY_DATES.forEach((d, i) => {
      const old = m[d]; if (!old) return;
      const k = KEY(i + 1);
      if (!m[k]) { m[k] = {...old, id:k}; moved++; }
      delete m[d];
      if (!first || d < first) first = d;
    });
    p.migrated = true;
    if (moved && !p.startedAt) p.startedAt = first;
    TH.put("prefs", p, "trackhawk: runway migrated to sessions");
    if (moved) TH.save("trackhawk: migrate " + moved + " study days to sessions").catch(() => {});
  }
  let syncTimer = null;
  function syncSoon(r, msg) { clearTimeout(syncTimer); syncTimer = setTimeout(() => TH.put("study", r, msg), 900); }
  function syncNow(r, msg)  { TH.put("study", r, msg); }

  /* ---------------------------------------------------------------- state */
  let keepSpineFocus = false, justPopped = null, meterDrag = false, rafPend = false, keepMeterGrab = false;
  /* ---- anchor & progress ------------------------------------------------ */
  function prefs() {
    if (!TH.S.data.prefs) TH.S.data.prefs = {};
    let p = TH.S.data.prefs.runway;
    if (!p) { p = TH.S.data.prefs.runway = {id:"runway", startedAt:null, migrated:false}; }
    return p;
  }
  /* t0 = the moment a session first sees activity; t1 = when it is finished.
     Un-ticking back below 100% clears t1 so the clock stays honest.          */
  function stamp(r, before, n) {
    if (!r.t0) r.t0 = Date.now();
    const after = comp(n);
    if (before < 0.999 && after >= 0.999) r.t1 = Date.now();
    else if (after < 0.999 && r.t1) delete r.t1;
  }
  function markStarted() {
    const p = prefs();
    if (!p.startedAt) { p.startedAt = todayISO(); TH.put("prefs", p, "trackhawk: runway started"); }
  }
  /* current session = the first one not yet finished */
  function current() {
    for (let n = 1; n <= LAST; n++) if (comp(n) < 0.999) return n;
    return LAST;
  }
  function doneCount() { let c = 0; for (let n = 1; n <= LAST; n++) if (comp(n) >= 0.999) c++; return c; }
  const daysSinceStart = () => {
    const p = prefs(); if (!p.startedAt) return 0;
    return Math.max(1, Math.round((new Date(todayISO()) - new Date(p.startedAt)) / 86400000) + 1);
  };

  let view = "today", selected = 0, rollMode = "block";
  let peeked = null;                       // session whose pip is expanded
  let timerOn = null, timerIv = null;      // {n, cat, t0}

  /* ---- live timer: ticks the button text only, never a full re-render ---- */
  function paintTimer() {
    const b = document.querySelector(".rw-tm.run"); if (!b || !timerOn) return;
    const s = Math.floor((Date.now() - timerOn.t0) / 1000);
    b.textContent = "\u25a0 " + String(Math.floor(s/60)).padStart(2,"0") + ":" + String(s%60).padStart(2,"0");
  }
  function stopTimer(commit) {
    if (timerIv) { clearInterval(timerIv); timerIv = null; }
    if (timerOn && commit) {
      const mins = Math.round((Date.now() - timerOn.t0) / 60000);
      if (mins > 0) { const r = rec(KEY(timerOn.n));
        r.tmin[timerOn.cat] = (+r.tmin[timerOn.cat] || 0) + mins;
        if (!r.t0) r.t0 = Date.now(); markStarted();
        syncNow(r, "trackhawk: timer S" + timerOn.n); }
    }
    timerOn = null;
  }
  /* ---- moving work between days ---------------------------------------- */
  function moveItem(from, id, to) {
    const r = rec(KEY(from)), wasDone = !!r.done[id];
    r.defer[id] = to; delete r.done[id];
    syncNow(r, `trackhawk: move ${id} S${from} \u2192 S${to}`);
    if (wasDone) { const t = rec(KEY(to)); t.done[from + "#" + id] = true;
      syncNow(t, "trackhawk: move tick"); }
  }
  function returnItem(from, id) {
    const r = rec(KEY(from)), to = r.defer[id]; if (!to) return;
    const t = rec(KEY(+to));
    if (t.done[from + "#" + id]) { delete t.done[from + "#" + id]; r.done[id] = true;
      syncNow(t, "trackhawk: return tick"); }
    delete r.defer[id];
    syncNow(r, `trackhawk: return ${id} \u2192 S${from}`);
  }

  /* ------------------------------------------------------------- helpers */
  const PREP_LABEL = {1:"background",2:"building",3:"significant",4:"headline priority"};
  /* Every session is a study session. Weekend prep is handled separately by
     weekendHTML(), keyed to the real calendar, and never gates the runway.  */
  function itemsFor(day) {
    const arr = [
      {id:"apply", label:day.morning, main:false, cat:"job", morning:true},
      {id:"main",  label:day.mainTask, main:true,  cat:"spring"},
      {id:"dsa",   label:day.dsaTask,  main:false, cat:"dsa"},
      {id:"lc",    label:day.lcTask,   cat:"dsa"},
      {id:"iqlog", label:"Logged 2 interview questions asked", cat:"prep"},
      {id:"notes", label:"Jotted key takeaways"},
    ];
    /* The two logged questions are constant from session one. What ramps as
       you advance is everything built around them.                          */
    if (day.prep>=2) arr.push({id:"drill",   label:"20 min \u2014 answered a logged question out loud", cat:"prep", prep:true});
    if (day.prep>=3) arr.push({id:"answers", label:"30 min \u2014 rehearsed answers, timed", cat:"prep", prep:true});
    if (day.prep>=3) arr.push({id:"walk",    label:"Rehearsed the project walkthrough", cat:"prep", prep:true});
    if (day.prep>=4) arr.push({id:"mock",    label:"45 min \u2014 full mock, timed and recorded", cat:"prep", prep:true});
    if (day.prep>=4) arr.push({id:"sysd",    label:"20 min system-design prompt", cat:"prep", prep:true});
    return arr;
  }
  /* ---- deferral model ---------------------------------------------------
     A task can be pushed to another day. The move is recorded on the SOURCE day
     (defer[itemId] = targetISO); the tick for it then lives on the TARGET day
     under the namespaced key `srcISO#itemId`. Two consequences:
       - comp(n) measures the work actually sitting on that session, so the
         runway pips reflect a re-planned sequence honestly;
       - rollup() credits course/DSA sections to the day the content BELONGS to
         via doneEff(), so moving a task never loses section progress.        */
  const deferOf = n => (peek(KEY(n)).defer) || {};
  const doneMap = n => (peek(KEY(n)).done) || {};
  function doneEff(n, id) {
    const t = deferOf(n)[id];
    return t ? !!doneMap(+t)[n + "#" + id] : !!doneMap(n)[id];
  }
  function effItems(n) {
    const day = SESS[n]; if (!day) return [];
    const df = deferOf(n);
    const own = itemsFor(day).filter(it => !df[it.id]).map(it => ({...it, key: it.id, src: n}));
    const inc = [];
    SESSIONS.forEach(o => {
      if (o.n === n) return;
      const d2 = deferOf(o.n);
      for (const id in d2) {
        if (+d2[id] !== n) continue;
        const it = itemsFor(o).find(x => x.id === id);
        if (it) inc.push({...it, key: o.n + "#" + id, src: o.n, moved: true});
      }
    });
    return own.concat(inc);
  }
  /* items this day used to own but has pushed elsewhere */
  function goneFrom(n) {
    const df = deferOf(n), day = SESS[n]; if (!day) return [];
    return itemsFor(day).filter(it => df[it.id]).map(it => ({...it, to: +df[it.id]}));
  }
  function comp(n) {
    const it = effItems(n); if (!it.length) return 0;
    const dn = doneMap(n);
    return it.filter(i => dn[i.key]).length / it.length;
  }

  function rollup(list) {   /* list of SESSION objects */
    const dsa=new Set(),lc=new Set(),sp=new Set();
    const time={course:0,dsa:0,prep:0,job:0}, exp={course:0,dsa:0,prep:0,job:0};
    let problems=0, applied=0, cSum=0;
    list.forEach(day => {
      const st=peek(KEY(day.n)), dn=st.done||{}, tm=st.tmin||{};
      exp.course+=day.expected.course; exp.dsa+=day.expected.dsa; exp.prep+=day.expected.prep; exp.job+=day.expected.job;
      time.course+=(+tm.course||0); time.dsa+=(+tm.dsa||0); time.prep+=(+tm.prep||0); time.job+=(+tm.job||0);
      cSum+=comp(day.n);
      if (day.type==="weekday") {
        if (doneEff(day.n,"main") && day.adv) day.adv.forEach(([k,v]) => ({sp})[k].add(v));
        if (doneEff(day.n,"dsa")  && day.dsaAdv) day.dsaAdv.forEach(v=>dsa.add(v));
        if (doneEff(day.n,"lc")   && day.lcChapter) lc.add(day.lcChapter);
        problems += (st.problems!=null ? (+st.problems||0) : (doneEff(day.n,"lc")?1:0));
        applied  += (st.applied!=null ? (+st.applied||0) : (doneEff(day.n,"apply")?2:0));
      } else {
        problems += (st.problems!=null ? (+st.problems||0) : 0);
        applied  += (+st.applied||0);
      }
    });
    return {dsa,lc,sp,time,exp,problems,applied,avgComp:list.length?cSum/list.length:0,count:list.length};
  }
  const cumTo = n => rollup(SESSIONS.filter(d=>d.n<=n));
  const cumAll = () => rollup(SESSIONS);
  /* any progress on a day keeps the flame; the old test only looked at weekday
     item ids, so every weekend silently reset the streak to zero.            */
  /* consecutive completed sessions, counting back from the last finished one */
  function streak() { let s=0; for (let n=current()-1; n>=1; n--) { if (comp(n)>=0.999) s++; else break; } return s; }

  /* ---- pace & projection -------------------------------------------------
     Everything here is denominated in DAYS, not percentages. Percentages of a
     day are hard to feel, and the old "needed daily" figure could never drop
     below 100% by construction, so it read as a permanent scolding.

     Two further corrections over the first cut:
       - progress is counted in finished sessions, so there is no such thing
         as being "behind"; a slow week moves the projected finish date only. */
  function pace() {
    const done = doneCount(), left = LAST - done, days = daysSinceStart();
    const started = !!prefs().startedAt;
    /* rate is sessions per calendar week since you started — the only honest
       measure once the plan no longer assumes a session every weekday.      */
    const rate = started && days ? done / (days / 7) : 0;
    const settled = done >= 3;
    let finish = null, weeksLeft = null;
    if (settled && rate > 0.05) {
      weeksLeft = left / rate;
      const d = new Date(); d.setDate(d.getDate() + Math.round(weeksLeft * 7));
      finish = d;
    }
    const cur = current();
    return {done, left, days, rate, settled, finish, weeksLeft, started, cur,
            curDone: comp(cur), pct: done / LAST};
  }

  function ring(pct,size,stroke,color) {
    const r=(size-stroke)/2, c=2*Math.PI*r, off=c*(1-pct);
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#1b1b22" stroke-width="${stroke}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>`;
  }
  const fmtH = m => (m/60).toFixed(m%60?1:0)+"h";

  const stripTag = s => s.replace(/^\[[A-Z]+\]\s*/,"");
  const shortD = n => "S" + n;

  /* ------------------------------------------------------------ sub-views */

  const PHASE_TINT = {SPRING:"rgba(200,255,50,.5)", PREP:"rgba(34,211,197,.5)"};
  function spineHTML() {
    const doneN = doneCount(), cur = current();
    const overall = SESSIONS.reduce((a,x)=>a+comp(x.n),0)/LAST;
    const st = streak();

    /* grouped in blocks of ten so the eye has something to hold onto; there is
       no week grid any more because sessions aren't pinned to weekdays.      */
    const BLOCK = 10;
    const blocks = [];
    for (let i=0;i<LAST;i+=BLOCK) blocks.push({from:i+1, to:Math.min(LAST,i+BLOCK)});
    const band = blocks.map(b=>`<div class="rw-mo" style="grid-column:span ${b.to-b.from+1}">S${b.from}\u2013${b.to}</div>`).join("");

    let cells = "";
    SESSIONS.forEach(day => {
      const c=comp(day.n);
      const cls=["rw-pip"];
      if (c>=0.999) cls.push("full"); else if (c>=0.5) cls.push("half");
      if (day.n===cur) cls.push("today");
      if (day.n===selected) cls.push("sel");
      if (day.milestone) cls.push("mile");
      if (day.prep>=4) cls.push("hot");
      const capOn = c<1;
      cells += `<button class="${cls.join(" ")}" data-goto="${day.n}" type="button"
        style="--tint:${PHASE_TINT.SPRING}"
        aria-label="Session ${day.n} of ${LAST}, ${Math.round(c*100)}% done">
        <i class="rw-cap"></i>${c>0?`<i class="rw-fill" style="height:${Math.round(c*100)}%"></i>`:""}<b>${day.n}</b>${c>=0.999?'<em class="rw-tick">\u2713</em>':""}</button>`;
    });

    const selFrac = LAST>1 ? (selected-1)/(LAST-1) : 0;
    const quips = doneN===0 ? ["not started \u2014 tick anything to begin"]
      : doneN>=LAST ? ["finished \u2726"]
      : st>=5 ? ["on a roll","strong run","keep it rolling"]
      : st>0 ? ["moving","in motion","going"]
      : ["pick it back up","next session is waiting"];
    const quip = quips[doneN % quips.length];
    const flame = st>0 ? `<span class="rw-flame" title="${st} sessions in a row">\ud83d\udd25 ${st}</span>` : "";

    return `<div class="rw-runway">
      <div class="rw-rtop"><h2>The runway</h2>
        <span class="sub">Session ${cur} of ${LAST} \u00b7 ${doneN} complete \u00b7 ${quip}</span>
        ${flame}<span class="pct">${Math.round(overall*100)}%</span></div>
      <div class="rw-meter"><i style="width:${Math.round(overall*100)}%"></i>
        <span class="rw-plane" style="left:${(overall*100).toFixed(1)}%" aria-hidden="true">\u2708</span>
        <span class="rw-scrub" style="left:${(selFrac*100).toFixed(1)}%" title="drag to move through the plan"></span></div>
      <div class="rw-months" style="--n:${LAST}">${band}</div>
      <div class="rw-spine" style="--n:${LAST}" tabindex="0">${cells}</div>
      <div class="rw-legend">
        <span><i class="rw-dot" style="background:var(--lime)"></i>done</span>
        <span><i class="rw-dot" style="background:#191920;border:1px solid #24242d"></i>not yet</span>
        <span><i class="rw-dot" style="border:1px solid var(--amber)"></i>current</span>
        <span><i class="rw-dot" style="background:var(--amber);transform:rotate(45deg);border-radius:1px;width:7px;height:7px"></i>milestone</span>
        <span style="margin-left:auto;opacity:.7">sessions advance when you finish them, not when the day ends</span></div>
      <div class="rw-tip"></div></div>`;
  }

  function todayHTML() {
    const cur=current();
    const day=SESS[selected], st=peek(KEY(selected)), c=comp(selected);
    const rel = selected===cur?"Up next":(selected<cur?"Done · review":"Later");
    const isW=false;                       // every session is a study session now
    let chips=`<span class="rw-chip spring">Java &amp; Spring \u00b7 ~2.5h</span>`;
    chips += `<span class="rw-chip">apply \u00b7 study \u00b7 log 2 questions</span>`;
    chips += `<span class="rw-chip prep" title="Interview-prep priority rises through the plan">prep: ${PREP_LABEL[day.prep]}</span>`;
    const MILE_TXT = {SCAFFOLD:"Scaffolding ready", BOOT:"Boot app boots", REST:"REST layer complete",
      DB:"Database layer live", BUILDABLE:"CRUD service buildable", AUTH:"Auth done",
      TESTS:"Test suite green", COURSE_DONE:"Telusko course complete"};
    if (MILE_TXT[day.milestone]) chips+=`<span class="rw-chip mile">✦ ${MILE_TXT[day.milestone]}</span>`;

    const items=effItems(selected), gone=goneFrom(selected), dnS=doneMap(selected);
    const liFor = it => `<li class="${it.main?"main":""} ${dnS[it.key]?"on":""} ${it.moved?"moved":""}"
        data-tog="${it.key}" draggable="true" data-drag="${it.key}">
        <span class="rw-flag" style="${it.cat?"background:"+CAT[it.cat]:""}"></span>
        <span class="rw-box"></span><span class="rw-tl">${esc(it.label)}${
          it.moved?`<span class="rw-from">\u21a9 from ${shortD(it.src)}</span>`:""}</span>
        <button class="rw-mv" type="button" ${it.moved?`data-ret="${it.src}|${it.id}"`:`data-mv="${it.id}"`}
          title="${it.moved?"Send back to its own session":"Move to another session"}">${it.moved?"\u21a9":"\u2192"}</button></li>`;
    const goneLi = g => `<li class="rw-gone">
        <span class="rw-flag" style="${g.cat?"background:"+CAT[g.cat]:""}"></span>
        <span class="rw-box"></span><span class="rw-tl">${esc(g.label)}<span class="rw-from">\u2192 ${shortD(g.to)}</span></span>
        <button class="rw-mv" type="button" data-ret="${selected}|${g.id}" title="Bring it back">\u21a9</button></li>`;
    let tasks="";
    if (!isW) {
      const morning=items.filter(i=>i.morning), evening=items.filter(i=>!i.morning);
      tasks = `<div class="rw-grp">☀ Morning · ~9–10am</div>` + morning.map(liFor).join("")
            + `<div class="rw-grp">🌙 Evening · study block</div>` + evening.map(liFor).join("");
    } else {
      const prep=items.filter(i=>i.cat==="prep"), job=items.filter(i=>i.cat==="job");
      tasks = `<div class="rw-grp">✦ Interview prep &amp; flashcards</div>` + prep.map(liFor).join("")
            + `<div class="rw-grp">💼 Job hunt</div>` + job.map(liFor).join("");
    }
    if (gone.length) tasks += `<div class="rw-grp">\u2934 Pushed to later sessions</div>` + gone.map(goneLi).join("");

    const cats = isW ? [["prep","Prep / flashcards"],["job","Job hunt"]]
                     : [["course","Course (1.5h)"],["dsa","DSA study (1h)"],["prep","Interview prep"],["job","Apply"]];
    let tcells="";
    cats.forEach(([k,lab]) => {
      const val=st.tmin[k]!=null?st.tmin[k]:"", e=day.expected[k], act=+val||0, p=e?Math.min(1,act/e):(act>0?1:0);
      tcells += `<div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:${CAT[k]}"></span>${lab}</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="5" placeholder="0" value="${val}" data-time="${k}"/>
          <span class="exp">/ ${e}m</span>
          <button class="rw-tm ${timerOn&&timerOn.n===selected&&timerOn.cat===k?"run":""}" type="button"
            data-tm="${k}" title="${timerOn&&timerOn.n===selected&&timerOn.cat===k?"Stop and bank the time":"Start a timer"}"
            >${timerOn&&timerOn.n===selected&&timerOn.cat===k?"■ 00:00":"▶"}</button></div>
        <div class="rw-tbar"><i style="width:${Math.round(p*100)}%;background:${CAT[k]}"></i></div></div>`;
    });
    const numrow=`<div class="rw-numrow">
      <div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:var(--violet)"></span>LeetCode problems</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="1" placeholder="${isW?"0":"1"}" value="${st.problems!=null?st.problems:""}" data-num="problems"/>
        <span class="exp">target ${isW?"—":"1–2"}</span></div></div>
      <div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:var(--marker)"></span>Roles applied</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="1" placeholder="0" value="${st.applied!=null?st.applied:""}" data-num="applied"/>
        <span class="exp">${isW?"queue for Monday":"fresh postings"}</span></div></div></div>`;

    return `<div class="rw-daynav">
        <button class="rw-arrow" data-nav="-1" ${selected<=1?"disabled":""}>\u2039</button>
        <div class="rw-dtitle"><div class="d1">Session ${day.n}</div>
          <div class="d2">${day.n} of ${LAST} \u00b7 ${rel}</div></div>
        <button class="rw-arrow" data-nav="1" ${selected>=LAST?"disabled":""}>\u203a</button></div>
      <button class="rw-jump" data-jump>Jump to current session</button>

      <div class="rw-card">
        <div class="rw-head">
          <div class="rw-ring" style="width:74px;height:74px">${ring(c,74,8,c>=0.999?GOOD:"var(--amber)")}
            <span class="v" style="font-size:16px;color:var(--paper)">${Math.round(c*100)}%</span></div>
          <div><div class="rw-chips">${chips}</div>
            <div class="rw-maintask">${esc(stripTag(day.mainTask))}</div>
            <div class="rw-subtask">${esc(stripTag(day.dsaTask))+" \u00b7 "+esc(stripTag(day.lcTask))}</div></div></div>
        <ul class="rw-tasks">${tasks}</ul></div>

      ${paceHTML()}

      ${clockHTML()}

      <div class="rw-card"><h3>Time spent — actual vs planned</h3>
        <div class="rw-tgrid">${tcells}</div>${numrow}</div>

      ${weekendHTML()}

      <div class="rw-card"><h3>Interview questions seen</h3>
        <div class="rw-eyebrow" style="margin:-6px 0 11px">Two per session \u2014 jot them the moment you meet them</div>
        <div class="rw-qn"><span class="rw-qi">1</span><input class="rw-q" data-iq="0" placeholder="e.g. HashMap vs ConcurrentHashMap — how does resizing work?" value="${esc((st.iq||[])[0]||"")}"/></div>
        <div class="rw-qn"><span class="rw-qi">2</span><input class="rw-q" data-iq="1" placeholder="e.g. How does @Transactional behave with a checked exception?" value="${esc((st.iq||[])[1]||"")}"/></div>
      </div>

      <div class="rw-card"><h3>Notes, blockers &amp; what to revisit</h3>
        <textarea class="rw-note" id="rw-note" placeholder="Problem numbers, what confused you, what to redo…">${esc(st.note||"")}</textarea>
        <div class="rw-hint">✓ saved to your encrypted vault &amp; synced</div></div>`;
  }

  /* Prep work stays tied to the real calendar: tailoring a resume and running
     mocks belong to a weekend, not to "session 12". It is keyed by date and is
     entirely optional \u2014 skipping it never blocks the runway.                */
  const WPREP = {
    1:["Tailor ATS resume \u2014 lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],
    2:["Tailor ATS resume for a specific role","Build flashcards from this week's questions","Rehearse 2 answers out loud, no notes"],
    3:["Tailor resume + cover note for a target role","Flashcards + review weak decks","Mock: 30 min, timed, out loud"],
    4:["Tailor resume for each application","Drill weak flashcard decks","Full mock interview \u2014 timed and recorded"]};
  function weekendHTML() {
    const now = new Date(); if (!isWeekend(now)) return "";
    const d = todayISO(), r = peek(d), tier = SESS[current()].prep;
    const tasks = WPREP[tier].concat(["Logged 2 interview questions asked today",
      "Applied to roles from the week's queue"]);
    const li = tasks.map((t,i) => `<li class="${r.done && r.done["w"+i] ? "on":""}" data-wtog="w${i}">
        <span class="rw-flag" style="background:${CAT.prep}"></span>
        <span class="rw-box"></span><span class="rw-tl">${esc(t)}</span></li>`).join("");
    const dn = tasks.filter((t,i)=>r.done && r.done["w"+i]).length;
    return `<div class="rw-card"><h3>Weekend prep \u00b7 ${now.toLocaleDateString(undefined,{weekday:"long"})}</h3>
      <div class="rw-eyebrow" style="margin:-6px 0 11px">Calendar work, not a session \u2014 ${dn}/${tasks.length} done.
        Skipping this never puts the runway behind.</div>
      <ul class="rw-tasks">${li}</ul></div>`;
  }

  /* How long THIS session has taken, and how it sits against your own average. */
  function clockHTML() {
    const n = selected, m = mins(n), sp = span(n), r = peek(KEY(n));
    const plan = Object.values(SESS[n].expected).reduce((a,b) => a + b, 0);
    const am = avgMins(), asp = avgSpan(), done = comp(n) >= 0.999;
    if (!r.t0 && !m) {
      return `<div class="rw-card"><h3>Session clock</h3>
        <div class="rw-eyebrow" style="margin:-6px 0 0">Starts when you tick something or run a timer \u00b7
          planned length ${fmtM(plan)}</div></div>`;
    }
    const pc = (cls,k,v,sb) => `<div class="rw-pc ${cls}"><div class="k">${k}</div><div class="v">${v}</div><div class="s">${sb}</div></div>`;
    const vs = m && plan ? Math.round((m/plan)*100) : 0;
    const spanCls = sp>=4 ? "bad" : sp>=2 ? "warn" : "good";
    const note = !done
      ? `Running \u2014 <b>${fmtM(m)}</b> logged against a planned ${fmtM(plan)}${
          sp>1 ? `, open for <span class="sw">${sp} days</span> now` : ""}.`
      : `Took <b>${fmtM(m)}</b>${sp>1 ? ` across <span class="sw">${sp} days</span>`
          : ` in <span class="gd">one sitting</span>`}${
          am ? ` \u00b7 your average is ${fmtM(am)}${asp>1.05 ? ` over ${asp.toFixed(1)} days` : ""}` : ""}.`;
    return `<div class="rw-card"><h3>Session clock</h3>
      <div class="rw-eyebrow" style="margin:-6px 0 12px">Time logged here, and how long this session has been open</div>
      <div class="rw-pace">
        ${pc(m?"good":"","Logged",m?fmtM(m):"\u2014","of " + fmtM(plan) + " planned")}
        ${pc(vs>=90?"good":vs>=50?"warn":"","Against plan",m?vs+"%":"\u2014","of planned time")}
        ${pc(sp?spanCls:"","Open for",sp?sp+(sp===1?" day":" days"):"\u2014",done?"first tick \u2192 finish":"still running")}
      </div>
      <div class="rw-what">${note}</div></div>`;
  }

  function paceHTML() {
    const p = pace();
    const pc = (cls,k,v,sub) => `<div class="rw-pc ${cls}"><div class="k">${k}</div><div class="v">${v}</div><div class="s">${sub}</div></div>`;
    const fmtDate = d => d.toLocaleDateString(undefined, {day:"numeric", month:"short", year:"numeric"});

    if (!p.started) {
      return `<div class="rw-card"><h3>Pace &amp; projection</h3>
        <div class="rw-eyebrow" style="margin:-6px 0 12px">Starts counting when you tick your first task</div>
        <div class="rw-pace">
          ${pc("","Sessions done","0","of " + LAST)}
          ${pc("","Pace","\u2014","measured once you begin")}
          ${pc("","Finishes","\u2014","projected from your own pace")}
        </div>
        <div class="rw-what">Nothing is late and nothing is owed \u2014 the runway hasn't started yet.
          Tick anything in today's session and day one is today.</div></div>`;
    }

    const rateCls = p.rate>=4.5?"good":p.rate>=3?"warn":"bad";
    const rateV = p.settled ? p.rate.toFixed(1) : "\u2014";
    const finV = p.finish ? fmtDate(p.finish) : "\u2014";
    const finS = p.finish ? `about ${Math.round(p.weeksLeft)} weeks out` : "needs a few sessions first";

    /* average effort and drag, appended to the projection when known */
    const am = avgMins(), asp = avgSpan();
    const timeBit = am ? ` Each finished session has taken about <b>${fmtM(am)}</b>${
      asp > 1.05 ? ` spread over ${asp.toFixed(1)} days` : `, usually in one sitting`}.` : "";

    let what;
    if (p.left === 0) what = `Every session is done \u2014 the runway is finished.`;
    else if (!p.settled) what = `<b>${p.done}</b> of ${LAST} sessions done.
      A couple more and this will start projecting a finish date from your own pace rather than a guess.`;
    else what = `At <b>${p.rate.toFixed(1)} sessions a week</b> the remaining <b>${p.left}</b> land around
      <b>${fmtDate(p.finish)}</b>. One extra session a week pulls that in by about
      <span class="gd">${Math.max(1, Math.round(p.left/p.rate - p.left/(p.rate+1)))} week${Math.round(p.left/p.rate - p.left/(p.rate+1))===1?"":"s"}</span>.
      Nothing here expires \u2014 a quiet week moves the date, it doesn't put you behind.` + timeBit;

    return `<div class="rw-card"><h3>Pace &amp; projection</h3>
      <div class="rw-eyebrow" style="margin:-6px 0 12px">Measured from the day you started \u00b7 ${p.days} day${p.days===1?"":"s"} in</div>
      <div class="rw-pace">
        ${pc(p.done?"good":"","Sessions done",p.done,"of " + LAST)}
        ${pc(p.settled?rateCls:"","Pace",rateV,"sessions per week")}
        ${pc(p.finish?"good":"","Finishes",finV,finS)}
      </div>
      <div class="rw-what">${what}</div></div>`;
  }

  function peekHTML() {
    if (!peeked || !SESS[peeked]) return "";
    const d = SESS[peeked], its = effItems(peeked), dn = doneMap(peeked), c = comp(peeked);
    const chips = its.map(it => `<button type="button" class="${dn[it.key]?"on":""}" data-pk="${it.key}"
      title="${esc(it.label)}"><i></i>${esc(stripTag(it.label))}</button>`).join("");
    return `<div class="rw-peek"><div class="ph"><b>Session ${d.n}</b>
        <span>${Math.round(c*100)}% \u00b7 ${d.n} of ${LAST}</span>
        <button class="go" type="button" data-goto="${peeked}" data-open="1">Open this session \u2192</button></div>
      <div class="rw-chk">${chips}</div></div>`;
  }

  function timelineHTML() {
    const cur = current();
    const rows = SESSIONS.map(d => {
      const c = comp(d.n);
      const cls = c>=0.999 ? "done" : d.n===cur ? "now" : "";
      const MT = {SCAFFOLD:"Scaffolding ready", BOOT:"Boot app boots", REST:"REST layer complete",
        DB:"Database layer live", BUILDABLE:"CRUD service buildable", AUTH:"Auth done",
        TESTS:"Test suite green", COURSE_DONE:"Course complete"};
      const mile = d.milestone ? `<span class="rw-chip mile">\u2726 ${MT[d.milestone]}</span>` : "";
      return `<button class="rw-srow ${cls}" data-goto="${d.n}" data-open="1" type="button">
        <span class="sn">S${d.n}</span>
        <span class="st">${esc(stripTag(d.mainTask))}${mile}</span>
        <span class="sp">${mins(d.n) ? fmtM(mins(d.n)) : Math.round(c*100)+"%"}${
          span(d.n) > 1 ? `<em class="sd">${span(d.n)}d</em>` : ""}</span>
        <span class="sb"><i style="width:${Math.round(c*100)}%"></i></span></button>`;
    }).join("");
    return `<div class="rw-card"><h3>All ${LAST} sessions</h3>
      <div class="rw-eyebrow" style="margin:-6px 0 11px">In order \u00b7 no dates, they happen when you do them</div>
      <div class="rw-slist">${rows}</div></div>`;
  }

  const CATS4=[["course","Course","var(--amber)"],["dsa","DSA/LC","var(--violet)"],["prep","Prep","var(--cyan)"],["job","Job","var(--marker)"]];
  function expVs(ru,useExp) {
    let out=`<div class="rw-eyebrow" style="margin:14px 0 8px">Time · actual vs planned</div>`;
    CATS4.forEach(([k,lab,col]) => { const a=ru.time[k], e=(useExp||ru.exp)[k]; if(e===0&&a===0) return;
      const mx=Math.max(a,e,1);
      out += `<div class="rw-ex"><div class="nm"><span class="rw-dot" style="background:${col}"></span>${lab}</div>
        <div class="bars"><div class="b1"><i style="width:${a/mx*100}%;background:${col}"></i><span class="mk" style="left:${e/mx*100}%"></span></div></div>
        <div class="rd">${fmtH(a)} <small>/ ${fmtH(e)}</small></div></div>`; });
    return out;
  }
  function kv(ru) {
    return `<div class="rw-kv">
      <div class="c"><div class="k">Completion</div><div class="v">${Math.round(ru.avgComp*100)}%</div></div>
      <div class="c"><div class="k">Hours</div><div class="v">${fmtH((ru.time.course+ru.time.dsa+ru.time.prep+ru.time.job))}</div></div>
      <div class="c"><div class="k">Problems</div><div class="v">${ru.problems}</div></div>
      <div class="c"><div class="k">Applied</div><div class="v">${ru.applied}</div></div></div>`;
  }
  const mk=(hit,t)=>`<li class="${hit?"hit":""}"><span class="rw-mbox"></span><span>${t}</span></li>`;
  function blockMiles(days) {
    const MT = {SCAFFOLD:"Scaffolding ready \u2014 Maven, JUnit, Mockito",
      BOOT:"Spring Boot app boots", REST:"REST layer complete",
      DB:"Database layer live \u2014 JPA entities & repositories",
      BUILDABLE:"CRUD service buildable end to end \u2726",
      AUTH:"Security & JWT done", TESTS:"Test suite green \u2014 MockMvc + Testcontainers",
      COURSE_DONE:"Telusko course finished \u2726"};
    const mk=(ok,t)=>`<li class="${ok?"ok":""}"><span class="rw-mk">${ok?"\u2713":"\u25cb"}</span>${t}</li>`;
    const out = days.filter(d=>d.milestone).map(d=>mk(comp(d.n)>=0.999, MT[d.milestone]||d.milestone));
    const spDone = new Set(); days.forEach(d=>{ if(doneEff(d.n,"main")) d.adv.forEach(([k,v])=>spDone.add(v)); });
    const lcDone = new Set(); days.forEach(d=>{ if(doneEff(d.n,"lc")) lcDone.add(d.lcChapter); });
    out.push(mk(days.every(d=>comp(d.n)>=0.999), `All ${days.length} sessions complete`));
    if (spDone.size) out.push(mk(true, `${spDone.size} Spring section${spDone.size===1?"":"s"} cleared here`));
    if (lcDone.size) out.push(mk(true, `LeetCode chapters touched: ${[...lcDone].sort((a,b)=>a-b).join(", ")}`));
    return out.join("");
  }
  function rollupsHTML() {
    const BL = rollMode==="block" ? 10 : rollMode==="half" ? 17 : 5;
    const groups = [];
    for (let i=0;i<LAST;i+=BL) {
      const from=i+1, to=Math.min(LAST,i+BL);
      groups.push({title:`Sessions ${from}\u2013${to}`, sub:`${to-from+1} sessions`,
                   days:SESSIONS.slice(i, to)});
    }
    const seg=`<div class="rw-seg" data-seg>
      <button class="${rollMode==="five"?"on":""}" data-r="five">By 5</button>
      <button class="${rollMode==="block"?"on":""}" data-r="block">By 10</button>
      <button class="${rollMode==="half"?"on":""}" data-r="half">By 17</button></div>`;
    const cur = current();
    let body="";
    groups.forEach((g,gi) => {
      const ru=rollup(g.days), open=g.days.some(d=>d.n===cur);
      const miles = `<div class="rw-eyebrow" style="margin-top:6px">Milestones</div><ul class="rw-miles">${blockMiles(g.days)}</ul>`;
      body += `<details class="rw-roll" ${open?"open":""}><summary>
          <div class="rw-mini" style="width:44px;height:44px">${ring(ru.avgComp,44,5,ru.avgComp>=0.999?GOOD:"var(--amber)")}
            <span class="mv" style="font-size:12px;color:var(--paper)">${Math.round(ru.avgComp*100)}</span></div>
          <div class="cap"><div class="rt">${g.title}</div><div class="rs">${g.sub}</div></div>
          <div class="rr"><div class="big">${fmtH((ru.time.course+ru.time.dsa+ru.time.prep+ru.time.job))}</div><div class="sm">${ru.problems} problems</div></div>
          <span class="rw-caret">\u25b6</span></summary>
        <div class="rw-rbody">${kv(ru)}${expVs(ru)}${miles}</div></details>`;
    });
    return seg+body;
  }

  function mrow(name,color,done,total) {
    const p=total?done/total:0;
    return `<div class="rw-mrow"><div class="rw-mtop"><span class="nm"><span class="rw-dot" style="background:${color}"></span>${name}</span>
      <span class="cn">${done}<small> / ${total}</small></span></div>
      <div class="rw-pbar"><i style="width:${Math.round(p*100)}%;background:${color}"></i></div></div>`;
  }
  function dashHTML() {
    const all=cumAll(), td=cumTo(current());
    const overall=(all.sp.size/TOTALS.sp+all.dsa.size/TOTALS.dsa+all.lc.size/TOTALS.lc)/3;
    const daysDone=doneCount(), P=pace();
    let ev=""; CATS4.forEach(([k,lab,col])=>{const a=all.time[k], e=td.exp[k], mx=Math.max(a,e,1);
      ev += `<div class="rw-ex"><div class="nm"><span class="rw-dot" style="background:${col}"></span>${lab}</div>
        <div class="bars"><div class="b1"><i style="width:${a/mx*100}%;background:${col}"></i><span class="mk" style="left:${e/mx*100}%"></span></div></div>
        <div class="rd">${fmtH(a)} <small>/ ${fmtH(e)}</small></div></div>`;});
    /* weekend prep lives in date-keyed records (w0..w4), not in sessions */
    const cj = i => Object.keys(studyMap()).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)
      && (studyMap()[k].done||{})["w"+i]).length;
    const qAll=[]; SESSIONS.forEach(d=>((peek(KEY(d.n)).iq)||[]).forEach(t=>{ if(t&&t.trim()) qAll.push({d:d.n,t:t.trim()}); }));
    const qRecent=qAll.slice(-14).reverse();
    const qHTML = qRecent.length
      ? `<ul class="rw-qlist">${qRecent.map(q=>`<li><span class="qd">S${q.d}</span><span>${esc(q.t)}</span></li>`).join("")}</ul>`
      : `<div class="rw-subtask">Nothing logged yet \u2014 jot two questions on the Session tab as you meet them.</div>`;
    const tot=(all.time.course+all.time.dsa+all.time.prep+all.time.job), etot=(td.exp.course+td.exp.dsa+td.exp.prep+td.exp.job);
    const fin = P.finish ? P.finish.toLocaleDateString(undefined,{day:"numeric",month:"short"}) : "\u2014";
    return `<div class="rw-call"><div class="ic">${P.started?"\u2726":"\u25cb"}</div>
        <div class="tx"><b>${P.started?`${P.done} of ${LAST} sessions done`:"Not started yet"}</b> \u2014 ${
          P.started ? (P.finish ? `at ${P.rate.toFixed(1)} sessions a week this finishes around <b>${fin}</b>. Nothing expires; a quiet week just moves the date.`
                                : "a few more sessions and this will project a finish date from your own pace.")
                    : "tick anything in the current session and the runway begins today."}</div>
        <div class="st ${P.started?"yes":"no"}">${P.started?"Running":"Idle"}</div></div>
      <div class="rw-tiles">
        <div class="rw-tile"><div class="k">Sessions</div><div class="v">${daysDone}<small> / ${LAST}</small></div></div>
        <div class="rw-tile"><div class="k">Streak</div><div class="v">${streak()}<small> sessions</small></div></div>
        <div class="rw-tile"><div class="k">Avg session</div><div class="v">${avgMins()?fmtM(avgMins()):"—"}</div></div>
        <div class="rw-tile"><div class="k">LC problems</div><div class="v">${all.problems}</div></div>
        <div class="rw-tile"><div class="k">Applied</div><div class="v">${all.applied}</div></div>
        <div class="rw-tile"><div class="k">Questions</div><div class="v">${qAll.length}</div></div></div>
      <div class="rw-two">
        <div class="rw-card"><div class="rw-head">
            <div class="rw-ring" style="width:84px;height:84px">${ring(overall,84,9,"var(--lime)")}<span class="v" style="font-size:18px;color:var(--paper)">${Math.round(overall*100)}%</span></div>
            <div><h3 style="margin:0">Overall course progress</h3><div class="rw-subtask">Weighted across Telusko, Barik and LeetCode</div></div></div>
          ${mrow("Telusko — Java &amp; Spring Boot","var(--lime)",all.sp.size,TOTALS.sp)}
          ${mrow("Barik — DSA","var(--violet)",all.dsa.size,TOTALS.dsa)}
          ${mrow("LeetCode Crash Course","var(--violet)",all.lc.size,TOTALS.lc)}</div>
        <div class="rw-card"><h3>Time invested — actual vs planned to date</h3>
          <div class="rw-eyebrow" style="margin-bottom:4px">Marker = planned time for the sessions you have finished</div>${ev}
          <div class="rw-mrow" style="margin-top:16px"><div class="rw-mtop"><span class="nm">Total logged</span>
            <span class="cn">${fmtH(tot)}<small> / ${fmtH(etot)}</small></span></div>
            <div class="rw-pbar"><i style="width:${Math.min(100,tot/Math.max(1,etot)*100)}%;background:var(--lime)"></i></div></div></div></div>
      <div class="rw-card" style="margin-top:16px"><h3>Interview questions logged${qAll.length?" — latest "+qRecent.length+" of "+qAll.length:""}</h3>${qHTML}</div>

      <div class="rw-card"><h3>Job hunt</h3>
        <div class="rw-kv" style="margin:0">
          <div class="c"><div class="k">Applied</div><div class="v">${all.applied}</div></div>
          <div class="c"><div class="k">Resume touches</div><div class="v">${cj(0)}</div></div>
          <div class="c"><div class="k">Flashcard sessions</div><div class="v">${cj(1)}</div></div>
          <div class="c"><div class="k">Mock interviews</div><div class="v">${cj(2)}</div></div></div></div>`;
  }

  /* --------------------------------------------------------------- render */
  /* run once per render pass: migrate legacy data, then make sure `selected`
     points at a real session (0 means "not chosen yet" -> use the current one) */
  let booted = false;
  function boot() {
    if (!booted) { try { migrate(); } catch(e) {} booted = true; }
    if (!selected || !SESS[selected]) selected = current();
  }

  function render() {
    boot();
    ensureStyles();
    const root=$("#rw-root"); if(!root) return;
    const ae = document.activeElement;
    const activeNote = !!(ae && (ae.id==="rw-note" || (ae.dataset && ae.dataset.iq!=null)));
    const activeSel = activeNote ? (ae.id==="rw-note" ? "#rw-note" : '[data-iq="'+ae.dataset.iq+'"]') : null;
    const caret = activeNote ? ae.selectionStart : null;

    let panel;
    if (view==="today") panel=spineHTML()+peekHTML()+todayHTML();
    else if (view==="timeline") panel=timelineHTML();
    else if (view==="rollups") panel=rollupsHTML();
    else panel=dashHTML();

    root.innerHTML = `<div class="rw-wrap">
      <div class="rw-subnav">
        <button class="rw-sb ${view==="today"?"on":""}" data-v="today">Session</button>
        <button class="rw-sb ${view==="timeline"?"on":""}" data-v="timeline">Timeline</button>
        <button class="rw-sb ${view==="rollups"?"on":""}" data-v="rollups">Rollups</button>
        <button class="rw-sb ${view==="dash"?"on":""}" data-v="dash">Dashboard</button>
        <span class="rw-streak">🔥 ${streak()} days</span>
      </div>${panel}</div>`;

    wire(root);

    if (view==="today") {
      if (keepSpineFocus) { const sp=root.querySelector(".rw-spine .sel"); if(sp) sp.focus({preventScroll:true}); keepSpineFocus=false; }
      if (justPopped) { const pp=root.querySelector('.rw-spine .rw-pip[data-goto="'+justPopped+'"]');
        if(pp){ pp.classList.add("just"); setTimeout(()=>pp.classList.remove("just"),450); } justPopped=null; }
      if (keepMeterGrab) { const sc=root.querySelector(".rw-scrub"); if(sc) sc.classList.add("grabbing"); }
      if (activeNote && activeSel) { const n=root.querySelector(activeSel);
        if(n){ n.focus({preventScroll:true}); try{ if(caret!=null) n.setSelectionRange(caret,caret); }catch(e){} } }
    }
    /* the timer button is re-created on every render, so re-attach the tick */
    if (timerIv) { clearInterval(timerIv); timerIv=null; }
    if (timerOn) { timerIv=setInterval(paintTimer,1000); paintTimer(); }
  }

  function wire(root) {
    root.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{ view=b.dataset.v; render(); });
    root.querySelectorAll("[data-seg] [data-r]").forEach(b=>b.onclick=()=>{ rollMode=b.dataset.r; render(); });
    root.querySelectorAll("[data-goto]").forEach(b=>b.onclick=ev=>{
      if (b.classList.contains("rw-pip")) {   // little ripple on the runway pips
        const host=b.closest(".rw-runway"); if(host){ const r=host.getBoundingClientRect(), br=b.getBoundingClientRect();
          const rip=document.createElement("span"); rip.className="rw-ripple"; rip.style.width=rip.style.height="8px";
          rip.style.left=(br.left-r.left+br.width/2)+"px"; rip.style.top=(br.top-r.top+br.height/2)+"px";
          host.appendChild(rip); setTimeout(()=>rip.remove(),480); } }
      const gn = +b.dataset.goto;
      if (b.classList.contains("rw-pip")) peeked = (peeked===gn) ? null : gn;
      selected=gn;
      if (b.dataset.open){ view="today"; window.scrollTo({top:0,behavior:"smooth"}); } render();
    });

    /* runway: hover cards + keyboard scrubbing */
    const card=root.querySelector(".rw-runway"), tip=root.querySelector(".rw-tip");
    if (card && tip) {
      const show = pip => {
        const day=SESS[+pip.dataset.goto]; if(!day) return;
        const c=comp(day.n);
        tip.innerHTML=`<div class="tt-d">Session ${day.n} of ${LAST}${day.milestone?" \u00b7 \u2726 milestone":""}</div>
          <div class="tt-t">${esc(stripTag(day.mainTask))}</div>
          <div class="tt-p"><span>${Math.round(c*100)}%</span><span class="tt-bar"><i style="width:${Math.round(c*100)}%"></i></span></div>`;
        tip.classList.add("on");
        const cr=card.getBoundingClientRect(), pr=pip.getBoundingClientRect(), w=tip.offsetWidth;
        let left=pr.left-cr.left+pr.width/2;
        left=Math.max(w/2+8, Math.min(cr.width-w/2-8, left));
        tip.style.left=left+"px";
        tip.style.top=(pr.bottom-cr.top+10)+"px";
      };
      const hide = () => tip.classList.remove("on");
      root.querySelectorAll(".rw-spine .rw-pip[data-goto]").forEach(pip=>{
        pip.onmouseenter=()=>show(pip); pip.onmouseleave=hide;
        pip.onfocus=()=>show(pip);      pip.onblur=hide;
      });
      card.onmouseleave=hide;

      // ---- draggable scrubber: grab the handle or press anywhere on the meter to fly ----
      const meter=root.querySelector(".rw-meter"), scrub=root.querySelector(".rw-scrub");
      if (meter) {
        const idxFromX = clientX => { const r=meter.getBoundingClientRect();
          const f=Math.max(0,Math.min(1,(clientX-r.left)/r.width)); return Math.round(f*(LAST-1)); };
        const applyX = clientX => { const j=idxFromX(clientX);
          if (SESSIONS[j] && SESSIONS[j].n!==selected){ selected=SESSIONS[j].n;
            if(!rafPend){ rafPend=true; requestAnimationFrame(()=>{ rafPend=false; keepMeterGrab=true; render(); }); } } };
        const move = e => { if(!meterDrag) return; e.preventDefault(); applyX(e.touches?e.touches[0].clientX:e.clientX); };
        const up = () => { meterDrag=false; keepMeterGrab=false;
          document.removeEventListener("pointermove",move); document.removeEventListener("pointerup",up);
          document.removeEventListener("touchmove",move); document.removeEventListener("touchend",up);
          const sc=root.querySelector(".rw-scrub"); if(sc) sc.classList.remove("grabbing"); };
        const down = e => { meterDrag=true; const sc=root.querySelector(".rw-scrub"); if(sc) sc.classList.add("grabbing");
          applyX(e.touches?e.touches[0].clientX:e.clientX);
          document.addEventListener("pointermove",move); document.addEventListener("pointerup",up);
          document.addEventListener("touchmove",move,{passive:false}); document.addEventListener("touchend",up); };
        meter.onpointerdown = down; meter.ontouchstart = e=>{ e.preventDefault(); down(e); };
      }

      // ---- click a month label to jump to its first day ----
      root.querySelectorAll(".rw-months .rw-mo").forEach((mo,bi)=>mo.onclick=()=>{
        selected = Math.min(LAST, bi*10 + 1); render(); });

      const spine=root.querySelector(".rw-spine");
      if (spine) spine.onkeydown=e=>{
        const step={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];
        if(!step && e.key!=="Home" && e.key!=="End") return;
        e.preventDefault();
        const i=selected-1;
        const j = e.key==="Home" ? 0 : e.key==="End" ? LAST-1
                : Math.max(0, Math.min(LAST-1, i+step));
        selected=j+1; keepSpineFocus=true; render();
      };
    }
    root.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{ const n=selected+(+b.dataset.nav);
      if(n>=1&&n<=LAST){ selected=n; render(); } });
    const jump=root.querySelector("[data-jump]"); if(jump) jump.onclick=()=>{ selected=current(); render(); };

    root.querySelectorAll("[data-tog]").forEach(li=>li.onclick=ev=>{
      if (ev.target.closest("[data-mv],[data-ret],.rw-pop")) return;   // the move affordances live inside the row
      const r=rec(KEY(selected)), id=li.dataset.tog, before=comp(selected);
      r.done[id]=!r.done[id];
      markStarted();                                   // first ever tick anchors day one
      stamp(r, before, selected);                      // session clock
      syncNow(r, `trackhawk: ${r.done[id]?"\u2713":"\u2717"} S${selected} ${id}`);
      justPopped = (before<0.999 && comp(selected)>=0.999) ? selected : null;
      render();
    });

    /* ---- move a task to another day ------------------------------------ */
    const closePop = () => { const q=root.querySelector(".rw-pop"); if(q) q.remove(); };
    root.querySelectorAll("[data-mv]").forEach(btn=>btn.onclick=ev=>{
      ev.stopPropagation();
      const li=btn.closest("li"), already=!!li.querySelector(".rw-pop");
      closePop(); if (already) return;
      const id=btn.dataset.mv, i=selected-1;
      const opts=SESSIONS.slice(i+1, i+6);
      const pop=document.createElement("div"); pop.className="rw-pop";
      pop.innerHTML = opts.length
        ? `<div class="ttl">Push to</div>` + opts.map(d=>`<button type="button" data-to="${d.n}">Session ${d.n}</button>`).join("")
        : `<div class="ttl">No later session left</div>`;
      li.appendChild(pop);
      pop.querySelectorAll("[data-to]").forEach(b2=>b2.onclick=e2=>{
        e2.stopPropagation(); moveItem(selected, id, +b2.dataset.to); render(); });
    });
    root.querySelectorAll("[data-ret]").forEach(btn=>btn.onclick=ev=>{
      ev.stopPropagation();
      const [src,id]=btn.dataset.ret.split("|");
      returnItem(src, id); render();
    });
    document.addEventListener("click", closePop, {once:true});

    /* ---- drag a task onto any pip on the runway ------------------------- */
    root.querySelectorAll("[data-drag]").forEach(li=>{
      li.ondragstart=e=>{ e.dataTransfer.setData("text/plain", li.dataset.drag);
        e.dataTransfer.effectAllowed="move"; li.classList.add("drag"); };
      li.ondragend=()=>li.classList.remove("drag");
    });
    root.querySelectorAll(".rw-spine .rw-pip[data-goto]").forEach(pip=>{
      pip.ondragover=e=>{ e.preventDefault(); e.dataTransfer.dropEffect="move"; pip.classList.add("drop"); };
      pip.ondragleave=()=>pip.classList.remove("drop");
      pip.ondrop=e=>{
        e.preventDefault(); pip.classList.remove("drop");
        const key=e.dataTransfer.getData("text/plain"); if(!key) return;
        const to=pip.dataset.goto;
        if (key.indexOf("#")>=0) {                       // a task already borrowed from elsewhere
          const src=key.slice(0,key.indexOf("#")), id=key.slice(key.indexOf("#")+1);
          if (to===src) returnItem(src,id); else if (to!==selected) moveItem(src,id,to);
        } else if (to!==selected) moveItem(selected,key,to);
        render();
      };
    });

    /* ---- per-block timers ---------------------------------------------- */
    root.querySelectorAll("[data-tm]").forEach(b=>b.onclick=ev=>{
      ev.stopPropagation();
      const k=b.dataset.tm, live = timerOn && timerOn.date===selected && timerOn.cat===k;
      stopTimer(true);                                   // banking any timer already running
      if (!live) timerOn={n:selected, cat:k, t0:Date.now()};
      render();
    });

    /* ---- tick straight from the expanded pip ---------------------------- */
    root.querySelectorAll("[data-wtog]").forEach(li=>li.onclick=()=>{
      const d=todayISO(), r=rec(d), k=li.dataset.wtog;
      r.done[k]=!r.done[k];
      syncNow(r, `trackhawk: weekend prep ${d} ${k}`);
      render();
    });

    root.querySelectorAll("[data-pk]").forEach(b=>b.onclick=()=>{
      if (!peeked) return;
      const r=rec(KEY(peeked)), k=b.dataset.pk;
      r.done[k]=!r.done[k]; markStarted();
      syncNow(r, `trackhawk: ${r.done[k]?"\u2713":"\u2717"} S${peeked} ${k}`);
      render();
    });

    // Inputs update memory (and the visual bar) on every keystroke, but only PERSIST
    // on change/blur — so no sync-driven re-render happens while you're typing.
    root.querySelectorAll("[data-time]").forEach(inp=>{
      inp.oninput=()=>{ const r=rec(KEY(selected)), k=inp.dataset.time;
        r.tmin[k]= inp.value===""?null:Math.max(0,+inp.value);
        const day=SESS[selected], e=day.expected[k], act=+inp.value||0;
        const bar=inp.closest(".rw-tcell").querySelector(".rw-tbar>i");
        if(bar) bar.style.width=Math.round((e?Math.min(1,act/e):(act>0?1:0))*100)+"%"; };
      inp.onchange=()=>{ syncNow(rec(KEY(selected)),"trackhawk: time S"+selected); };
    });

    root.querySelectorAll("[data-num]").forEach(inp=>{
      inp.oninput=()=>{ const r=rec(KEY(selected)), k=inp.dataset.num;
        r[k]= inp.value===""?(k==="problems"?null:0):Math.max(0,+inp.value); };
      inp.onchange=()=>{ syncNow(rec(KEY(selected)),"trackhawk: "+inp.dataset.num+" S"+selected); };
    });

    root.querySelectorAll("[data-iq]").forEach(inp=>{
      inp.oninput=()=>{ const r=rec(KEY(selected)); r.iq[+inp.dataset.iq]=inp.value; };
      inp.onchange=()=>{ const r=rec(KEY(selected)); r.iq[+inp.dataset.iq]=inp.value; syncNow(r,"trackhawk: question S"+selected); };
    });

    const note=root.querySelector("#rw-note");
    if(note){
      note.oninput=()=>{ rec(KEY(selected)).note=note.value; };                 // memory only, no re-render
      note.onchange=()=>{ const r=rec(KEY(selected)); r.note=note.value; syncNow(r,"trackhawk: note S"+selected); };
    }
  }

  return {render};
})();
