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

  const SCHEDULE = [{"id":1,"date":"2026-08-19","dow":"Wed","month":"Aug","day":19,"prep":1,"weekStart":"2026-08-17","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S1 — Core Java — collections deep-dive (1/2)","adv":[],"dsaTask":"[DSA] Barik S1 — Big-O & runtime analysis","dsaAdv":[1],"lcTask":"[LC] Ch1 — Intro & Big-O — solve 1–2 problems","lcChapter":1,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":2,"date":"2026-08-20","dow":"Thu","month":"Aug","day":20,"prep":1,"weekStart":"2026-08-17","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S1 — Core Java — collections deep-dive (2/2)","adv":[["sp",1]],"dsaTask":"[DSA] Barik S1 — Big-O & runtime analysis","dsaAdv":[1],"lcTask":"[LC] Ch1 — Intro & Big-O — solve 1–2 problems","lcChapter":1,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":3,"date":"2026-08-21","dow":"Fri","month":"Aug","day":21,"prep":1,"weekStart":"2026-08-17","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S2 — Core Java — generics, equals/hashCode (1/2)","adv":[],"dsaTask":"[DSA] Barik S1 — Big-O & runtime analysis","dsaAdv":[1],"lcTask":"[LC] Ch1 — Intro & Big-O — solve 1–2 problems","lcChapter":1,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":4,"date":"2026-08-22","dow":"Sat","month":"Aug","day":22,"prep":1,"weekStart":"2026-08-17","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":5,"date":"2026-08-23","dow":"Sun","month":"Aug","day":23,"prep":1,"weekStart":"2026-08-17","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":6,"date":"2026-08-24","dow":"Mon","month":"Aug","day":24,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S2 — Core Java — generics, equals/hashCode (2/2)","adv":[["sp",2]],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":7,"date":"2026-08-25","dow":"Tue","month":"Aug","day":25,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S3 — Core Java — streams & lambdas (1/2)","adv":[],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":8,"date":"2026-08-26","dow":"Wed","month":"Aug","day":26,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S3 — Core Java — streams & lambdas (2/2)","adv":[["sp",3]],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":9,"date":"2026-08-27","dow":"Thu","month":"Aug","day":27,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S4 — Core Java — threads & concurrency (1/2)","adv":[],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":10,"date":"2026-08-28","dow":"Fri","month":"Aug","day":28,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S4 — Core Java — threads & concurrency (2/2)","adv":[["sp",4]],"dsaTask":"[DSA] Barik S2 — Arrays & 2-D arrays","dsaAdv":[2],"lcTask":"[LC] Ch2 — Arrays & Strings — solve 1–2 problems","lcChapter":2,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":11,"date":"2026-08-29","dow":"Sat","month":"Aug","day":29,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":12,"date":"2026-08-30","dow":"Sun","month":"Aug","day":30,"prep":1,"weekStart":"2026-08-24","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":13,"date":"2026-08-31","dow":"Mon","month":"Aug","day":31,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S5 — Exceptions, I/O & files","adv":[["sp",5]],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":14,"date":"2026-09-01","dow":"Tue","month":"Sep","day":1,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Core Java katas — no tutorial, just code","adv":[],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":15,"date":"2026-09-02","dow":"Wed","month":"Sep","day":2,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S6 — Maven, project layout & dependency scopes","adv":[["sp",6]],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":16,"date":"2026-09-03","dow":"Thu","month":"Sep","day":3,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S7 — JUnit 5 + Mockito (1/2)","adv":[],"dsaTask":"[DSA] Barik S3 — Linked lists","dsaAdv":[3],"lcTask":"[LC] Ch3 — Linked Lists — solve 1–2 problems","lcChapter":3,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":17,"date":"2026-09-04","dow":"Fri","month":"Sep","day":4,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S7 — JUnit 5 + Mockito (2/2)","adv":[["sp",7]],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"SCAFFOLD"},{"id":18,"date":"2026-09-05","dow":"Sat","month":"Sep","day":5,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":19,"date":"2026-09-06","dow":"Sun","month":"Sep","day":6,"prep":1,"weekStart":"2026-08-31","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":20,"date":"2026-09-07","dow":"Mon","month":"Sep","day":7,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Write tests for yesterday's katas","adv":[],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":21,"date":"2026-09-08","dow":"Tue","month":"Sep","day":8,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S8 — Spring Core — IoC & DI (1/2)","adv":[],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":22,"date":"2026-09-09","dow":"Wed","month":"Sep","day":9,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S8 — Spring Core — IoC & DI (2/2)","adv":[["sp",8]],"dsaTask":"[DSA] Barik S4 — Stacks & queues","dsaAdv":[4],"lcTask":"[LC] Ch4 — Stacks & Queues — solve 1–2 problems","lcChapter":4,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":23,"date":"2026-09-10","dow":"Thu","month":"Sep","day":10,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S9 — Spring Core — bean scopes & lifecycle","adv":[["sp",9]],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":24,"date":"2026-09-11","dow":"Fri","month":"Sep","day":11,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S10 — Spring Boot — starters & autoconfiguration (1/2)","adv":[],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":25,"date":"2026-09-12","dow":"Sat","month":"Sep","day":12,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":26,"date":"2026-09-13","dow":"Sun","month":"Sep","day":13,"prep":1,"weekStart":"2026-09-07","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Resume & flashcards","prepTasks":["Tailor ATS resume — lead with Java & Spring","Turn this week's logged questions into flashcards","Write answers for 2 logged questions"],"jobFocus":"Java backend + Java-heavy SDET","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":27,"date":"2026-09-14","dow":"Mon","month":"Sep","day":14,"prep":1,"weekStart":"2026-09-14","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S10 — Spring Boot — starters & autoconfiguration (2/2)","adv":[["sp",10]],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"BOOT"},{"id":28,"date":"2026-09-15","dow":"Tue","month":"Sep","day":15,"prep":1,"weekStart":"2026-09-14","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — First Boot app — hello endpoint, wired by hand","adv":[],"dsaTask":"[DSA] Barik S5 — Hashing & hash tables","dsaAdv":[5],"lcTask":"[LC] Ch5 — Hashing — solve 1–2 problems","lcChapter":5,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":29,"date":"2026-09-16","dow":"Wed","month":"Sep","day":16,"prep":1,"weekStart":"2026-09-14","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S11 — REST controllers & request mapping (1/2)","adv":[],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"morning":"Apply to 1 fresh role (~9–10am)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":30,"date":"2026-09-17","dow":"Thu","month":"Sep","day":17,"prep":2,"weekStart":"2026-09-14","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S11 — REST controllers & request mapping (2/2)","adv":[["sp",11]],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":31,"date":"2026-09-18","dow":"Fri","month":"Sep","day":18,"prep":2,"weekStart":"2026-09-14","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S12 — DTOs, validation & mapping","adv":[["sp",12]],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":32,"date":"2026-09-19","dow":"Sat","month":"Sep","day":19,"prep":2,"weekStart":"2026-09-14","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Answers & flashcards","prepTasks":["Tailor ATS resume for a specific role","Build flashcards from this week's questions","Rehearse 2 answers out loud, no notes"],"jobFocus":"Java backend roles","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":33,"date":"2026-09-20","dow":"Sun","month":"Sep","day":20,"prep":2,"weekStart":"2026-09-14","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Answers & flashcards","prepTasks":["Tailor ATS resume for a specific role","Build flashcards from this week's questions","Rehearse 2 answers out loud, no notes"],"jobFocus":"Java backend roles","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":34,"date":"2026-09-21","dow":"Mon","month":"Sep","day":21,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S13 — Global error handling (@ControllerAdvice)","adv":[["sp",13]],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15},"milestone":"REST"},{"id":35,"date":"2026-09-22","dow":"Tue","month":"Sep","day":22,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Full REST resource: GET/POST/PUT/DELETE + validation","adv":[],"dsaTask":"[DSA] Barik S6 — Trees & binary search trees","dsaAdv":[6],"lcTask":"[LC] Ch6 — Trees — solve 1–2 problems","lcChapter":6,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":36,"date":"2026-09-23","dow":"Wed","month":"Sep","day":23,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S14 — JDBC & DataSource","adv":[["sp",14]],"dsaTask":"[DSA] Barik S7 — Heaps & priority queues","dsaAdv":[7],"lcTask":"[LC] Ch7 — Heaps — solve 1–2 problems","lcChapter":7,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":37,"date":"2026-09-24","dow":"Thu","month":"Sep","day":24,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S15 — Spring Data JPA — entities & repositories (1/2)","adv":[],"dsaTask":"[DSA] Barik S7 — Heaps & priority queues","dsaAdv":[7],"lcTask":"[LC] Ch7 — Heaps — solve 1–2 problems","lcChapter":7,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":38,"date":"2026-09-25","dow":"Fri","month":"Sep","day":25,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S15 — Spring Data JPA — entities & repositories (2/2)","adv":[["sp",15]],"dsaTask":"[DSA] Barik S7 — Heaps & priority queues","dsaAdv":[7],"lcTask":"[LC] Ch7 — Heaps — solve 1–2 problems","lcChapter":7,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15},"milestone":"DB"},{"id":39,"date":"2026-09-26","dow":"Sat","month":"Sep","day":26,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Answers & flashcards","prepTasks":["Tailor ATS resume for a specific role","Build flashcards from this week's questions","Rehearse 2 answers out loud, no notes"],"jobFocus":"Java backend roles","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":40,"date":"2026-09-27","dow":"Sun","month":"Sep","day":27,"prep":2,"weekStart":"2026-09-21","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Answers & flashcards","prepTasks":["Tailor ATS resume for a specific role","Build flashcards from this week's questions","Rehearse 2 answers out loud, no notes"],"jobFocus":"Java backend roles","expected":{"course":0,"dsa":0,"prep":60,"job":45}},{"id":41,"date":"2026-09-28","dow":"Mon","month":"Sep","day":28,"prep":2,"weekStart":"2026-09-28","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Wire a repository over a real Postgres","adv":[],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":42,"date":"2026-09-29","dow":"Tue","month":"Sep","day":29,"prep":2,"weekStart":"2026-09-28","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S16 — JPA relationships & fetch strategies (1/2)","adv":[],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":43,"date":"2026-09-30","dow":"Wed","month":"Sep","day":30,"prep":2,"weekStart":"2026-09-28","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S16 — JPA relationships & fetch strategies (2/2)","adv":[["sp",16]],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":44,"date":"2026-10-01","dow":"Thu","month":"Oct","day":1,"prep":2,"weekStart":"2026-09-28","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S17 — Transactions & @Transactional (1/2)","adv":[],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":30,"job":15}},{"id":45,"date":"2026-10-02","dow":"Fri","month":"Oct","day":2,"prep":3,"weekStart":"2026-09-28","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S17 — Transactions & @Transactional (2/2)","adv":[["sp",17]],"dsaTask":"[DSA] Barik S8 — Graphs & representations","dsaAdv":[8],"lcTask":"[LC] Ch8 — Graphs (BFS/DFS) — solve 1–2 problems","lcChapter":8,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":46,"date":"2026-10-03","dow":"Sat","month":"Oct","day":3,"prep":3,"weekStart":"2026-09-28","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Mock interviews & walkthrough","prepTasks":["Tailor resume + cover note for a target role","Flashcards + review weak decks","Mock: 30 min, timed, out loud"],"jobFocus":"Java backend — volume week","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":47,"date":"2026-10-04","dow":"Sun","month":"Oct","day":4,"prep":3,"weekStart":"2026-09-28","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Mock interviews & walkthrough","prepTasks":["Tailor resume + cover note for a target role","Flashcards + review weak decks","Mock: 30 min, timed, out loud"],"jobFocus":"Java backend — volume week","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":48,"date":"2026-10-05","dow":"Mon","month":"Oct","day":5,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S18 — JPQL, query methods & pagination","adv":[["sp",18]],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15},"milestone":"BUILDABLE"},{"id":49,"date":"2026-10-06","dow":"Tue","month":"Oct","day":6,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Model relationships — then break them on purpose","adv":[],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":50,"date":"2026-10-07","dow":"Wed","month":"Oct","day":7,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S19 — Hibernate performance — N+1, caching","adv":[["sp",19]],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":51,"date":"2026-10-08","dow":"Thu","month":"Oct","day":8,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S20 — Spring Security — authentication (1/2)","adv":[],"dsaTask":"[DSA] Barik S9 — Sorting algorithms","dsaAdv":[9],"lcTask":"[LC] Ch9 — Sorting — solve 1–2 problems","lcChapter":9,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":52,"date":"2026-10-09","dow":"Fri","month":"Oct","day":9,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S20 — Spring Security — authentication (2/2)","adv":[["sp",20]],"dsaTask":"[DSA] Barik S10 — Searching & binary search","dsaAdv":[10],"lcTask":"[LC] Ch10 — Binary Search — solve 1–2 problems","lcChapter":10,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":53,"date":"2026-10-10","dow":"Sat","month":"Oct","day":10,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Mock interviews & walkthrough","prepTasks":["Tailor resume + cover note for a target role","Flashcards + review weak decks","Mock: 30 min, timed, out loud"],"jobFocus":"Java backend — volume week","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":54,"date":"2026-10-11","dow":"Sun","month":"Oct","day":11,"prep":3,"weekStart":"2026-10-05","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Mock interviews & walkthrough","prepTasks":["Tailor resume + cover note for a target role","Flashcards + review weak decks","Mock: 30 min, timed, out loud"],"jobFocus":"Java backend — volume week","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":55,"date":"2026-10-12","dow":"Mon","month":"Oct","day":12,"prep":3,"weekStart":"2026-10-12","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S21 — Spring Security — JWT & method authorization (1/2)","adv":[],"dsaTask":"[DSA] Barik S10 — Searching & binary search","dsaAdv":[10],"lcTask":"[LC] Ch10 — Binary Search — solve 1–2 problems","lcChapter":10,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":56,"date":"2026-10-13","dow":"Tue","month":"Oct","day":13,"prep":3,"weekStart":"2026-10-12","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S21 — Spring Security — JWT & method authorization (2/2)","adv":[["sp",21]],"dsaTask":"[DSA] Barik S10 — Searching & binary search","dsaAdv":[10],"lcTask":"[LC] Ch10 — Binary Search — solve 1–2 problems","lcChapter":10,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15},"milestone":"AUTH"},{"id":57,"date":"2026-10-14","dow":"Wed","month":"Oct","day":14,"prep":3,"weekStart":"2026-10-12","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Lock the endpoints down, then try to break in","adv":[],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":58,"date":"2026-10-15","dow":"Thu","month":"Oct","day":15,"prep":3,"weekStart":"2026-10-12","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S22 — Testing — MockMvc & slice tests (1/2)","adv":[],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"morning":"Apply to 2 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":45,"job":15}},{"id":59,"date":"2026-10-16","dow":"Fri","month":"Oct","day":16,"prep":4,"weekStart":"2026-10-12","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S22 — Testing — MockMvc & slice tests (2/2)","adv":[["sp",22]],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"id":60,"date":"2026-10-17","dow":"Sat","month":"Oct","day":17,"prep":4,"weekStart":"2026-10-12","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Full mocks — headline priority","prepTasks":["Tailor resume for each application","Drill weak flashcard decks","Full mock interview — timed and recorded"],"jobFocus":"Java backend — final push","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":61,"date":"2026-10-18","dow":"Sun","month":"Oct","day":18,"prep":4,"weekStart":"2026-10-12","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Full mocks — headline priority","prepTasks":["Tailor resume for each application","Drill weak flashcard decks","Full mock interview — timed and recorded"],"jobFocus":"Java backend — final push","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":62,"date":"2026-10-19","dow":"Mon","month":"Oct","day":19,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S23 — Testing — Testcontainers","adv":[["sp",23]],"dsaTask":"[DSA] Barik S11 — Recursion & backtracking","dsaAdv":[11],"lcTask":"[LC] Ch11 — Backtracking — solve 1–2 problems","lcChapter":11,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15},"milestone":"TESTS"},{"id":63,"date":"2026-10-20","dow":"Tue","month":"Oct","day":20,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Integration test the whole slice","adv":[],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"id":64,"date":"2026-10-21","dow":"Wed","month":"Oct","day":21,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S24 — Caching with Redis","adv":[["sp",24]],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"id":65,"date":"2026-10-22","dow":"Thu","month":"Oct","day":22,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S25 — Docker — containerising the service","adv":[["sp",25]],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"id":66,"date":"2026-10-23","dow":"Fri","month":"Oct","day":23,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — docker-compose the stack end to end","adv":[],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"id":67,"date":"2026-10-24","dow":"Sat","month":"Oct","day":24,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekend","isSunday":false,"mainTask":"[PREP] Full mocks — headline priority","prepTasks":["Tailor resume for each application","Drill weak flashcard decks","Full mock interview — timed and recorded"],"jobFocus":"Java backend — final push","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":68,"date":"2026-10-25","dow":"Sun","month":"Oct","day":25,"prep":4,"weekStart":"2026-10-19","phase":"SPRING","type":"weekend","isSunday":true,"mainTask":"[PREP] Full mocks — headline priority","prepTasks":["Tailor resume for each application","Drill weak flashcard decks","Full mock interview — timed and recorded"],"jobFocus":"Java backend — final push","expected":{"course":0,"dsa":0,"prep":90,"job":45}},{"id":69,"date":"2026-10-26","dow":"Mon","month":"Oct","day":26,"prep":4,"weekStart":"2026-10-26","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S26 — CI with GitHub Actions","adv":[["sp",26]],"dsaTask":"[DSA] Barik S12 — Dynamic programming","dsaAdv":[12],"lcTask":"[LC] Ch12 — Dynamic Programming — solve 1–2 problems","lcChapter":12,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}},{"id":70,"date":"2026-10-27","dow":"Tue","month":"Oct","day":27,"prep":4,"weekStart":"2026-10-26","phase":"SPRING","type":"weekday","mainTask":"[JAVA] S27 — Actuator, logging & metrics","adv":[["sp",27]],"dsaTask":"[DSA] Barik S13 — Greedy algorithms","dsaAdv":[13],"lcTask":"[LC] Ch13 — Greedy & review — solve 1–2 problems","lcChapter":13,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15},"milestone":"COURSE_DONE"},{"id":71,"date":"2026-10-28","dow":"Wed","month":"Oct","day":28,"prep":4,"weekStart":"2026-10-26","phase":"SPRING","type":"weekday","mainTask":"[JAVA] Build day — Ship it — README, endpoints, one diagram","adv":[],"dsaTask":"[DSA] Barik S13 — Greedy algorithms","dsaAdv":[13],"lcTask":"[LC] Ch13 — Greedy & review — solve 1–2 problems","lcChapter":13,"morning":"Apply to 3 fresh roles (~9–10am)","expected":{"course":90,"dsa":60,"prep":60,"job":15}}];
  const byDate = Object.fromEntries(SCHEDULE.map(d => [d.date, d]));
  const START = SCHEDULE[0].date, END = SCHEDULE[SCHEDULE.length-1].date;
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
  function rec(date) {
    const m = studyMap();
    let r = m[date];
    if (!r) { r = {id:date, done:{}, tmin:{}, note:"", problems:null, applied:0}; m[date] = r; }
    if (!r.done) r.done = {}; if (!r.tmin) r.tmin = {}; if (!r.defer) r.defer = {};
    if (!Array.isArray(r.iq)) r.iq = ["", ""];
    return r;
  }
  const peek = date => studyMap()[date] || {done:{}, tmin:{}, iq:[]};
  let syncTimer = null;
  function syncSoon(r, msg) { clearTimeout(syncTimer); syncTimer = setTimeout(() => TH.put("study", r, msg), 900); }
  function syncNow(r, msg)  { TH.put("study", r, msg); }

  /* ---------------------------------------------------------------- state */
  let keepSpineFocus = false, justPopped = null, meterDrag = false, rafPend = false, keepMeterGrab = false;
  const rt = () => { const n = new Date(); return n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0"); };
  const clamp = iso => iso < START ? START : iso > END ? END : (byDate[iso] ? iso : START);
  const today = clamp(rt());
  let view = "today", selected = today, rollMode = "week";
  let peeked = null;                       // date whose pip is expanded in the spine
  let timerOn = null, timerIv = null;      // {date, cat, t0}

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
      if (mins > 0) { const r = rec(timerOn.date);
        r.tmin[timerOn.cat] = (+r.tmin[timerOn.cat] || 0) + mins;
        syncNow(r, "trackhawk: study timer " + timerOn.date); }
    }
    timerOn = null;
  }
  /* ---- moving work between days ---------------------------------------- */
  function moveItem(fromISO, id, toISO) {
    const r = rec(fromISO), wasDone = !!r.done[id];
    r.defer[id] = toISO; delete r.done[id];
    syncNow(r, "trackhawk: study move " + id + " " + fromISO + " \u2192 " + toISO);
    if (wasDone) { const t = rec(toISO); t.done[fromISO + "#" + id] = true;
      syncNow(t, "trackhawk: study move tick"); }
  }
  function returnItem(fromISO, id) {
    const r = rec(fromISO), to = r.defer[id]; if (!to) return;
    const t = rec(to);
    if (t.done[fromISO + "#" + id]) { delete t.done[fromISO + "#" + id]; r.done[id] = true;
      syncNow(t, "trackhawk: study return tick"); }
    delete r.defer[id];
    syncNow(r, "trackhawk: study return " + id + " \u2192 " + fromISO);
  }

  /* ------------------------------------------------------------- helpers */
  const PREP_LABEL = {1:"background",2:"building",3:"significant",4:"headline priority"};
  function itemsFor(day) {
    if (day.type === "weekday") {
      const arr = [
        {id:"apply", label:day.morning, main:false, cat:"job", morning:true},
        {id:"main",  label:day.mainTask, main:true,  cat:day.phase==="SPRING"?"spring":"auto"},
        {id:"dsa",   label:day.dsaTask,  main:false, cat:"dsa"},
        {id:"lc",    label:day.lcTask,   cat:"dsa"},
        {id:"iqlog", label:"Logged 2 interview questions asked today", cat:"prep"},
        {id:"notes", label:"Jotted key takeaways", },
      ];
      /* The two logged questions are constant from day one. What ramps from
         15 Sep is everything built around them.                            */
      if (day.prep>=2) arr.push({id:"drill",   label:"20 min \u2014 answered a logged question out loud", cat:"prep", prep:true});
      if (day.prep>=3) arr.push({id:"answers", label:"30 min \u2014 rehearsed answers, timed", cat:"prep", prep:true});
      if (day.prep>=3) arr.push({id:"walk",    label:"Rehearsed the project walkthrough", cat:"prep", prep:true});
      if (day.prep>=4) arr.push({id:"mock",    label:"45 min \u2014 full mock, timed and recorded", cat:"prep", prep:true});
      if (day.prep>=4) arr.push({id:"sysd",    label:"20 min system-design prompt", cat:"prep", prep:true});
      return arr;
    }
    // weekend — deep prep + job hunt, no course study
    const t = day.prepTasks || [];
    const a = [
      {id:"pmain", label:day.mainTask, main:true, cat:"prep"},
      {id:"p0", label:t[0]||"", cat:"prep"},
      {id:"p1", label:t[1]||"", cat:"prep"},
      {id:"p2", label:t[2]||"", cat:"prep"},
      {id:"iqlog", label:"Logged 2 interview questions asked today", cat:"prep"},
      {id:"cards", label:"Turned this week's logged questions into flashcards", cat:"prep"},
      {id:"resume", label:"Tailored resume for a specific role", cat:"job"},
      {id:"linkedin", label:"LinkedIn / networking touch", cat:"job"},
      {id:"queue", label:"Queued Monday-morning applications — "+(day.jobFocus||""), cat:"job"},
    ];
    if (day.isSunday) a.push({id:"reflect", label:"Weekly reflection + plan next week", cat:"prep"});
    return a.filter(x=>x.label!=="");
  }
  /* ---- deferral model ---------------------------------------------------
     A task can be pushed to another day. The move is recorded on the SOURCE day
     (defer[itemId] = targetISO); the tick for it then lives on the TARGET day
     under the namespaced key `srcISO#itemId`. Two consequences:
       - comp(iso) measures the work actually sitting on that calendar day, so
         the runway pips reflect a re-planned week honestly;
       - rollup() credits course/DSA sections to the day the content BELONGS to
         via doneEff(), so moving a task never loses section progress.        */
  const deferOf = iso => (peek(iso).defer) || {};
  const doneMap = iso => (peek(iso).done) || {};
  function doneEff(iso, id) {
    const t = deferOf(iso)[id];
    return t ? !!doneMap(t)[iso + "#" + id] : !!doneMap(iso)[id];
  }
  function effItems(iso) {
    const day = byDate[iso]; if (!day) return [];
    const df = deferOf(iso);
    const own = itemsFor(day).filter(it => !df[it.id]).map(it => ({...it, key: it.id, src: iso}));
    const inc = [];
    SCHEDULE.forEach(s => {
      if (s.date === iso) return;
      const d2 = deferOf(s.date);
      for (const id in d2) {
        if (d2[id] !== iso) continue;
        const it = itemsFor(s).find(x => x.id === id);
        if (it) inc.push({...it, key: s.date + "#" + id, src: s.date, moved: true});
      }
    });
    return own.concat(inc);
  }
  /* items this day used to own but has pushed elsewhere */
  function goneFrom(iso) {
    const df = deferOf(iso), day = byDate[iso]; if (!day) return [];
    return itemsFor(day).filter(it => df[it.id]).map(it => ({...it, to: df[it.id]}));
  }
  function comp(iso) {
    const it = effItems(iso); if (!it.length) return 0;
    const dn = doneMap(iso);
    return it.filter(i => dn[i.key]).length / it.length;
  }

  function rollup(list) {
    const dsa=new Set(),lc=new Set(),sp=new Set();
    const time={course:0,dsa:0,prep:0,job:0}, exp={course:0,dsa:0,prep:0,job:0};
    let problems=0, applied=0, cSum=0;
    list.forEach(day => {
      const st=peek(day.date), dn=st.done||{}, tm=st.tmin||{};
      exp.course+=day.expected.course; exp.dsa+=day.expected.dsa; exp.prep+=day.expected.prep; exp.job+=day.expected.job;
      time.course+=(+tm.course||0); time.dsa+=(+tm.dsa||0); time.prep+=(+tm.prep||0); time.job+=(+tm.job||0);
      cSum+=comp(day.date);
      if (day.type==="weekday") {
        if (doneEff(day.date,"main") && day.adv) day.adv.forEach(([k,n]) => ({sp})[k].add(n));
        if (doneEff(day.date,"dsa")  && day.dsaAdv) day.dsaAdv.forEach(n=>dsa.add(n));
        if (doneEff(day.date,"lc")   && day.lcChapter) lc.add(day.lcChapter);
        problems += (st.problems!=null ? (+st.problems||0) : (doneEff(day.date,"lc")?1:0));
        applied  += (st.applied!=null ? (+st.applied||0) : (doneEff(day.date,"apply")?2:0));
      } else {
        problems += (st.problems!=null ? (+st.problems||0) : 0);
        applied  += (+st.applied||0);
      }
    });
    return {dsa,lc,sp,time,exp,problems,applied,avgComp:list.length?cSum/list.length:0,count:list.length};
  }
  const cumTo = iso => rollup(SCHEDULE.filter(d=>d.date<=iso));
  const cumAll = () => rollup(SCHEDULE);
  /* any progress on a day keeps the flame; the old test only looked at weekday
     item ids, so every weekend silently reset the streak to zero.            */
  function streak() { let s=0; for (const iso of SCHEDULE.map(d=>d.date).filter(d=>d<=today).reverse()) {
    if (comp(iso) > 0) s++; else break; } return s; }

  /* ---- pace & projection -------------------------------------------------
     Everything here is denominated in DAYS, not percentages. Percentages of a
     day are hard to feel, and the old "needed daily" figure could never drop
     below 100% by construction, so it read as a permanent scolding.

     Two further corrections over the first cut:
       - `earned` sums EVERY completed day, not just days up to today, so work
         done ahead of schedule actually registers;
       - the projection uses a trailing 7-day window that excludes today, so a
         part-finished evening can't drag the forecast around, and it stays
         silent until there are enough finished days to mean anything.        */
  function pace() {
    const n = SCHEDULE.length;
    const prior   = SCHEDULE.filter(d => d.date <  today);   // fully passed
    const elapsed = SCHEDULE.filter(d => d.date <= today).length || 1;
    const after   = n - elapsed;                             // days after today
    const earned  = SCHEDULE.reduce((a,d) => a + comp(d.date), 0);
    const tDone   = comp(today);

    /* work banked on every day EXCEPT today, measured against the days that
       have fully passed. Today is judged separately, at the end of it.       */
    const balance = earned - tDone - prior.length;

    const win  = prior.slice(-7);
    const rate = win.length ? win.reduce((a,d) => a + comp(d.date), 0) / win.length : 0;
    const settled = prior.length >= 3;
    const short = Math.max(0, n - (earned + rate * after));

    return {n, elapsed, after, earned, tDone, balance, rate,
            win: win.length, settled, short,
            endIfDone: balance,                 // finish tonight's list
            endIfStop: balance + tDone - 1};    // stop where you are
  }

  function ring(pct,size,stroke,color) {
    const r=(size-stroke)/2, c=2*Math.PI*r, off=c*(1-pct);
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#1b1b22" stroke-width="${stroke}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/></svg>`;
  }
  const fmtH = m => (m/60).toFixed(m%60?1:0)+"h";
  const longDate = iso => new Date(iso+"T00:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  const stripTag = s => s.replace(/^\[[A-Z]+\]\s*/,"");
  const shortD = iso => { const d = byDate[iso]; return d ? d.dow + " " + d.day + " " + d.month : iso; };

  /* ------------------------------------------------------------ sub-views */
  const DOWI = {Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};
  const PHASE_TINT = {SPRING:"rgba(200,255,50,.5)", PREP:"rgba(34,211,197,.5)"};
  function spineHTML() {
    const doneN = SCHEDULE.filter(d=>comp(d.date)>=0.999).length;
    const idx = SCHEDULE.findIndex(d=>d.date===today)+1;
    const overall = SCHEDULE.reduce((a,d)=>a+comp(d.date),0)/SCHEDULE.length;
    const elapsed = Math.max(0,Math.min(1, idx/SCHEDULE.length));
    const cur = streak();

    const months=[]; SCHEDULE.forEach(d=>{ const m=months[months.length-1];
      if (m && m.k===d.month) m.n++; else months.push({k:d.month,n:1}); });
    const FULL={Jul:"July",Aug:"August",Sep:"September",Oct:"October"};
    const band = months.map(m=>`<div class="rw-mo" data-mk="${m.k}" style="grid-column:span ${m.n}">${m.n>4?(FULL[m.k]||m.k):m.k}</div>`).join("");

    const pad = DOWI[SCHEDULE[0].dow] || 0;
    let cells = ""; for (let i=0;i<pad;i++) cells += `<div class="rw-pip rw-pad"></div>`;

    SCHEDULE.forEach(day => {
      const c=comp(day.date);
      const cls = ["rw-pip"];
      if (day.type==="weekend") cls.push("wknd");
      if (c>=0.999) cls.push("full"); else if (c>=0.5) cls.push("half");
      if (day.date===today) cls.push("today");
      if (day.date===selected) cls.push("sel");
      if (day.milestone) cls.push("mile");
      if (day.type==="weekday" && day.prep>=4) cls.push("hot");   // headline-prep days get a spark
      const tint = day.type==="weekday" ? PHASE_TINT[day.phase] : PHASE_TINT.PREP;
      const capOn = c<1;   // hide cap once fully done so the green reads clean
      cells += `<button class="${cls.join(" ")}" data-goto="${day.date}" type="button"
        style="--tint:${tint}"
        aria-label="Day ${day.id}, ${day.dow} ${day.month} ${day.day}, ${Math.round(c*100)}% done">
        <i class="rw-cap"></i>${c>0?`<i class="rw-fill" style="height:${Math.round(c*100)}%"></i>`:""}<b>${day.day}</b>${c>=0.999?'<em class="rw-tick">✓</em>':""}</button>`;
    });
    const tail = (7 - ((pad + SCHEDULE.length) % 7)) % 7;
    for (let i=0;i<tail;i++) cells += `<div class="rw-pip rw-pad"></div>`;

    const selFrac = SCHEDULE.findIndex(d=>d.date===selected)/(SCHEDULE.length-1);
    const behind = overall < elapsed - 0.02, ahead = overall > elapsed + 0.02;
    const quips = behind ? ["catch the tail","a little behind the line","the plan's ahead of you — reel it in"]
                : ahead ? ["ahead of the line ✦","flying","you're beating the plan"]
                : ["dead on the line","right on schedule","locked in"];
    const quip = quips[idx % quips.length];
    const flame = cur>0 ? `<span class="rw-flame" title="${cur}-day streak">🔥 ${cur}</span>` : "";

    return `<div class="rw-runway">
      <div class="rw-rtop"><h2>The runway</h2>
        <span class="sub">Day ${idx} of ${SCHEDULE.length} · ${doneN} complete · ${quip}</span>
        ${flame}<span class="pct">${Math.round(overall*100)}%</span></div>
      <div class="rw-meter"><i style="width:${Math.round(overall*100)}%"></i>
        <span class="rw-now" style="left:${(elapsed*100).toFixed(1)}%" title="where the plan expects you today"></span>
        <span class="rw-plane" style="left:${(overall*100).toFixed(1)}%" aria-hidden="true">✈</span>
        <span class="rw-scrub" style="left:${(selFrac*100).toFixed(1)}%" title="drag to fly through the plan"></span></div>
      <div class="rw-months" style="--n:${SCHEDULE.length}">${band}</div>
      <div class="rw-dowhd"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
      <div class="rw-spine" style="--n:${SCHEDULE.length}" tabindex="0">${cells}</div>
      <div class="rw-legend">
        <span><i class="rw-dot" style="background:var(--lime)"></i>done</span>
        <span><i class="rw-dot" style="background:#191920;border:1px solid #24242d"></i>weekday</span>
        <span><i class="rw-dot" style="background:#1d1830;border:1px solid #2c2444"></i>weekend</span>
        <span><i class="rw-dot" style="border:1px solid var(--amber)"></i>today</span>
        <span><i class="rw-dot" style="background:var(--amber);transform:rotate(45deg);border-radius:1px;width:7px;height:7px"></i>milestone</span>
        <span style="margin-left:auto;opacity:.7">✈ = your progress · │ = today's target</span></div>
      <div class="rw-tip"></div></div>`;
  }

  function todayHTML() {
    const day=byDate[selected], st=peek(selected), c=comp(selected);
    const di=SCHEDULE.findIndex(d=>d.date===selected);
    const rel = selected===today?"Today":(selected<today?"Past · review":"Upcoming");
    const isW=day.type==="weekend";
    let chips=`<span class="rw-chip ${isW?"prep":(day.phase==="SPRING"?"spring":"auto")}">${
      isW?"Weekend · prep only — no course study":"Weekday · Java & Spring"}</span>`;
    chips += `<span class="rw-chip">${isW?"~2.5h prep":"morning apply · ~2.5h eve"}</span>`;
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
          title="${it.moved?"Send back to its own day":"Move to another day"}">${it.moved?"\u21a9":"\u2192"}</button></li>`;
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
    if (gone.length) tasks += `<div class="rw-grp">⤴ Pushed to other days</div>` + gone.map(goneLi).join("");

    const cats = isW ? [["prep","Prep / flashcards"],["job","Job hunt"]]
                     : [["course","Course (1.5h)"],["dsa","DSA study (1h)"],["prep","Interview prep"],["job","Apply"]];
    let tcells="";
    cats.forEach(([k,lab]) => {
      const val=st.tmin[k]!=null?st.tmin[k]:"", e=day.expected[k], act=+val||0, p=e?Math.min(1,act/e):(act>0?1:0);
      tcells += `<div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:${CAT[k]}"></span>${lab}</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="5" placeholder="0" value="${val}" data-time="${k}"/>
          <span class="exp">/ ${e}m</span>
          <button class="rw-tm ${timerOn&&timerOn.date===selected&&timerOn.cat===k?"run":""}" type="button"
            data-tm="${k}" title="${timerOn&&timerOn.date===selected&&timerOn.cat===k?"Stop and bank the time":"Start a timer"}"
            >${timerOn&&timerOn.date===selected&&timerOn.cat===k?"■ 00:00":"▶"}</button></div>
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
        <button class="rw-arrow" data-nav="-1" ${di<=0?"disabled":""}>‹</button>
        <div class="rw-dtitle"><div class="d1">${longDate(selected)}</div>
          <div class="d2">Day ${day.id} of ${SCHEDULE.length} · ${rel}</div></div>
        <button class="rw-arrow" data-nav="1" ${di>=SCHEDULE.length-1?"disabled":""}>›</button></div>
      <button class="rw-jump" data-jump>Jump to today</button>

      <div class="rw-card">
        <div class="rw-head">
          <div class="rw-ring" style="width:74px;height:74px">${ring(c,74,8,c>=0.999?GOOD:"var(--amber)")}
            <span class="v" style="font-size:16px;color:var(--paper)">${Math.round(c*100)}%</span></div>
          <div><div class="rw-chips">${chips}</div>
            <div class="rw-maintask">${esc(stripTag(day.mainTask))}</div>
            <div class="rw-subtask">${isW?"Turn the week's learning into interview-ready material":esc(stripTag(day.dsaTask))+" · "+esc(stripTag(day.lcTask))}</div></div></div>
        <ul class="rw-tasks">${tasks}</ul></div>

      ${paceHTML()}

      <div class="rw-card"><h3>Time spent — actual vs planned</h3>
        <div class="rw-tgrid">${tcells}</div>${numrow}</div>

      <div class="rw-card"><h3>Interview questions seen today</h3>
        <div class="rw-eyebrow" style="margin:-6px 0 11px">Two a day — jot them the moment you meet them</div>
        <div class="rw-qn"><span class="rw-qi">1</span><input class="rw-q" data-iq="0" placeholder="e.g. HashMap vs ConcurrentHashMap — how does resizing work?" value="${esc((st.iq||[])[0]||"")}"/></div>
        <div class="rw-qn"><span class="rw-qi">2</span><input class="rw-q" data-iq="1" placeholder="e.g. How does @Transactional behave with a checked exception?" value="${esc((st.iq||[])[1]||"")}"/></div>
      </div>

      <div class="rw-card"><h3>Notes, blockers &amp; what to revisit</h3>
        <textarea class="rw-note" id="rw-note" placeholder="Problem numbers, what confused you, what to redo…">${esc(st.note||"")}</textarea>
        <div class="rw-hint">✓ saved to your encrypted vault &amp; synced</div></div>`;
  }

  function paceHTML() {
    const p = pace();
    const pc = (cls,k,v,sub) => `<div class="rw-pc ${cls}"><div class="k">${k}</div><div class="v">${v}</div><div class="s">${sub}</div></div>`;
    const d1 = v => Math.abs(v).toFixed(1);
    const level = v => Math.abs(v) < 0.05;

    /* where you stand */
    const balV = level(p.balance) ? "level" : (p.balance>0?"+":"\u2212") + d1(p.balance);
    const balS = level(p.balance) ? "square with the plan"
               : p.balance > 0 ? "days banked ahead" : "days of work owed";
    const balC = level(p.balance) ? "" : p.balance > 0 ? "good" : p.balance < -1.5 ? "bad" : "warn";

    /* the last week, as days rather than a rate */
    const winV = p.win ? (p.rate*p.win).toFixed(1) + " / " + p.win : "\u2014";
    const winC = !p.win ? "" : p.rate>=.9 ? "good" : p.rate>=.7 ? "warn" : "bad";

    /* where this lands */
    const shortV = !p.settled ? "\u2014" : level(p.short) ? "on target" : d1(p.short);
    const shortS = !p.settled ? "needs a few finished days first"
                 : level(p.short) ? "finishing the plan clean" : "days short at this rate";
    const shortC = !p.settled ? "" : level(p.short) ? "good" : p.short > 4 ? "bad" : "warn";

    const say = v => level(v) ? "<b>level with the plan</b>"
              : v > 0 ? `<b>${d1(v)} days ahead</b>` : `<b>${d1(v)} days behind</b>`;

    let what;
    if (p.after <= 0 && p.tDone >= 0.999) what = `The runway is finished \u2014 everything from here is review and interviews.`;
    else if (p.tDone >= 0.999) what = `Today is cleared. You end it ${say(p.endIfDone)}.`;
    else what = `Finish tonight's list and you end the day ${say(p.endIfDone)}.
      Stop where you are and it's <span class="sw">${level(p.endIfStop)?"level":d1(p.endIfStop)+" days "+(p.endIfStop>0?"ahead":"behind")}</span>.`;

    return `<div class="rw-card"><h3>Pace &amp; projection</h3>
      <div class="rw-eyebrow" style="margin:-6px 0 12px">In days of work \u00b7 today is judged at the end of it</div>
      <div class="rw-pace">
        ${pc(balC,"Where you stand",balV,balS)}
        ${pc(winC,"Last 7 days",winV,"days cleared")}
        ${pc(shortC,"Lands you",shortV,shortS)}
      </div>
      <div class="rw-what">${what}</div></div>`;
  }

  function peekHTML() {
    if (!peeked || !byDate[peeked]) return "";
    const d = byDate[peeked], its = effItems(peeked), dn = doneMap(peeked), c = comp(peeked);
    const chips = its.map(it => `<button type="button" class="${dn[it.key]?"on":""}" data-pk="${it.key}"
      title="${esc(it.label)}"><i></i>${esc(stripTag(it.label))}</button>`).join("");
    return `<div class="rw-peek"><div class="ph"><b>${longDate(peeked)}</b>
        <span>${Math.round(c*100)}% \u00b7 day ${d.id} of ${SCHEDULE.length}</span>
        <button class="go" type="button" data-goto="${peeked}" data-open="1">Open this day \u2192</button></div>
      <div class="rw-chk">${chips}</div></div>`;
  }

  function timelineHTML() {
    const weeks={}; SCHEDULE.forEach(d=>{(weeks[d.weekStart]=weeks[d.weekStart]||[]).push(d);});
    let out="";
    Object.keys(weeks).sort().forEach(ws => {
      const list=weeks[ws], ru=rollup(list), wsd=new Date(ws+"T00:00:00");
      out += `<div class="rw-wk"><div class="rw-wkhd"><span class="t">Week of ${wsd.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>
        <span class="p">${Math.round(ru.avgComp*100)}% · ${fmtH((ru.time.course+ru.time.dsa+ru.time.prep+ru.time.job))} logged</span></div>`;
      list.forEach(day => {
        const c=comp(day.date), col=day.type==="weekend"?"var(--violet)":(day.phase==="SPRING"?"var(--lime)":"var(--amber)");
        out += `<button class="rw-row ${day.date===today?"today":""}" data-goto="${day.date}" data-open="1">
          <div class="dd"><div class="dn">${day.day}</div><div class="dw">${day.month} · ${day.dow}</div></div>
          <div class="bd"><div class="t">${esc(stripTag(day.mainTask))}</div>
            <div class="s">${day.type==="weekend"?esc(stripTag(day.mainTask)):esc(stripTag(day.dsaTask))}</div></div>
          <div class="rw-mini">${ring(c,34,4,c>=0.999?GOOD:col)}<span class="mv" style="color:var(--paper)">${Math.round(c*100)}</span></div></button>`;
      });
      out += `</div>`;
    });
    return out;
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
  function fortMiles(gi) {
    const ends=["2026-09-08","2026-09-29","2026-10-13","2026-10-28"], c=cumTo(ends[gi]);
    if (gi===0) return mk(c.sp.size>=7,"Core Java, Maven & JUnit done (S1–7)")
      +mk(c.dsa.size>=4,"Barik S1–4 · LeetCode Ch1–4 paired")
      +mk(c.applied>=15,"Applications flowing — "+c.applied+" sent")
      +mk(true,"Resume tailored · questions logged daily")
      +mk(c.problems>=15,"15+ LeetCode ("+c.problems+") — prep: background");
    if (gi===1) return mk(c.sp.size>=16,"REST + database layer live (S1–16)")
      +mk(c.dsa.size>=8,"Barik through Graphs (S1–8)")
      +mk(c.applied>=37,"37+ applications ("+c.applied+")")
      +mk(true,"Answer drills started · prep: building")
      +mk(c.problems>=35,"35+ LeetCode ("+c.problems+")");
    if (gi===2) return mk(c.sp.size>=21,"CRUD service buildable · auth done (S1–21)")
      +mk(c.dsa.size>=10,"Barik through Binary Search (S1–10)")
      +mk(c.applied>=57,"57+ applications ("+c.applied+")")
      +mk(true,"Project walkthrough rehearsed · prep: significant")
      +mk(c.problems>=55,"55+ LeetCode ("+c.problems+")");
    return mk(c.sp.size>=27,"Telusko course finished (S1–27) ✦")
      +mk(c.dsa.size>=13,"Barik DSA course finished (S1–13) ✦")
      +mk(c.lc.size>=13,"LeetCode Crash Course complete (Ch1–13) ✦")
      +mk(c.applied>=90,"90 applications sent ("+c.applied+")")
      +mk(true,"Spring service shipped · prep: headline priority");
  }
  function rollupsHTML() {
    let groups=[];
    if (rollMode==="week") { const w={}; SCHEDULE.forEach(d=>{(w[d.weekStart]=w[d.weekStart]||[]).push(d);});
      groups=Object.keys(w).sort().map(k=>{const dd=new Date(k+"T00:00:00"),e=new Date(dd);e.setDate(e.getDate()+6);
        return {title:"Week of "+dd.toLocaleDateString("en-US",{month:"short",day:"numeric"}),
          sub:dd.toLocaleDateString("en-US",{month:"short",day:"numeric"})+" – "+e.toLocaleDateString("en-US",{month:"short",day:"numeric"}),days:w[k]};}); }
    else if (rollMode==="month") { const m={}; SCHEDULE.forEach(d=>{(m[d.month]=m[d.month]||[]).push(d);});
      const full={Jul:"July",Aug:"August",Sep:"September"};
      groups=["Jul","Aug","Sep"].filter(k=>m[k]).map(k=>({title:full[k]+" 2026",sub:m[k].length+" tracked days",days:m[k]})); }
    else { const F=[["Fortnight 1","Aug 5 – Aug 18","2026-08-05","2026-08-18"],["Fortnight 2","Aug 19 – Sep 1","2026-08-19","2026-09-01"],
      ["Fortnight 3","Sep 2 – Sep 15","2026-09-02","2026-09-15"],["Fortnight 4","Sep 16 – Sep 24","2026-09-16","2026-09-24"]];
      groups=F.map(([t,s,a,b])=>({title:t,sub:s,days:SCHEDULE.filter(d=>d.date>=a&&d.date<=b)})); }

    let seg=`<div class="rw-seg" data-seg>
      <button class="${rollMode==="week"?"on":""}" data-r="week">Weekly</button>
      <button class="${rollMode==="fort"?"on":""}" data-r="fort">Fortnightly</button>
      <button class="${rollMode==="month"?"on":""}" data-r="month">Monthly</button></div>`;
    let body="";
    groups.forEach((g,gi) => {
      const ru=rollup(g.days), open=g.days.some(d=>d.date===today);
      const miles = rollMode==="fort" ? `<div class="rw-eyebrow" style="margin-top:6px">Milestones</div><ul class="rw-miles">${fortMiles(gi)}</ul>` : "";
      body += `<details class="rw-roll" ${open?"open":""}><summary>
          <div class="rw-mini" style="width:44px;height:44px">${ring(ru.avgComp,44,5,ru.avgComp>=0.999?GOOD:"var(--amber)")}
            <span class="mv" style="font-size:12px;color:var(--paper)">${Math.round(ru.avgComp*100)}</span></div>
          <div class="cap"><div class="rt">${g.title}</div><div class="rs">${g.sub}</div></div>
          <div class="rr"><div class="big">${fmtH((ru.time.course+ru.time.dsa+ru.time.prep+ru.time.job))}</div><div class="sm">${ru.problems} problems</div></div>
          <span class="rw-caret">▶</span></summary>
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
    const all=cumAll(), td=cumTo(today);
    const overall=(all.sp.size/TOTALS.sp+all.dsa.size/TOTALS.dsa+all.lc.size/TOTALS.lc)/3;
    const met=all.dsa.has(12)&&all.lc.has("Binary Search");
    const daysDone=SCHEDULE.filter(d=>comp(d.date)>=0.999).length;
    let ev=""; CATS4.forEach(([k,lab,col])=>{const a=all.time[k], e=td.exp[k], mx=Math.max(a,e,1);
      ev += `<div class="rw-ex"><div class="nm"><span class="rw-dot" style="background:${col}"></span>${lab}</div>
        <div class="bars"><div class="b1"><i style="width:${a/mx*100}%;background:${col}"></i><span class="mk" style="left:${e/mx*100}%"></span></div></div>
        <div class="rd">${fmtH(a)} <small>/ ${fmtH(e)}</small></div></div>`;});
    const cj = id => SCHEDULE.filter(d=>d.type==="weekend"&&(peek(d.date).done||{})[id]).length;
    const qAll=[]; SCHEDULE.forEach(d=>((peek(d.date).iq)||[]).forEach(t=>{ if(t&&t.trim()) qAll.push({d:d.date,t:t.trim()}); }));
    const qRecent=qAll.slice(-14).reverse();
    const qHTML = qRecent.length
      ? `<ul class="rw-qlist">${qRecent.map(q=>`<li><span class="qd">${new Date(q.d+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span><span>${esc(q.t)}</span></li>`).join("")}</ul>`
      : `<div class="rw-subtask">Nothing logged yet — jot two questions on the Today tab as you meet them.</div>`;
    const tot=(all.time.course+all.time.dsa+all.time.prep+all.time.job), etot=(td.exp.course+td.exp.dsa+td.exp.prep+td.exp.job);
    return `<div class="rw-call"><div class="ic">${met?"🎯":"✦"}</div>
        <div class="tx"><b>August DSA target</b> — with a dedicated DSA hour every weekday you reach Section 12 (Searching) around <b>Aug 25</b>, still inside August.</div>
        <div class="st ${met?"yes":"no"}">${met?"Met":"In progress"}</div></div>
      <div class="rw-tiles">
        <div class="rw-tile"><div class="k">Runway</div><div class="v">${daysDone}<small> / ${SCHEDULE.length}</small></div></div>
        <div class="rw-tile"><div class="k">Streak</div><div class="v">${streak()}<small> days</small></div></div>
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
          <div class="rw-eyebrow" style="margin-bottom:4px">Marker = where the plan expects you today</div>${ev}
          <div class="rw-mrow" style="margin-top:16px"><div class="rw-mtop"><span class="nm">Total logged</span>
            <span class="cn">${fmtH(tot)}<small> / ${fmtH(etot)}</small></span></div>
            <div class="rw-pbar"><i style="width:${Math.min(100,tot/Math.max(1,etot)*100)}%;background:var(--lime)"></i></div></div></div></div>
      <div class="rw-card" style="margin-top:16px"><h3>Interview questions logged${qAll.length?" — latest "+qRecent.length+" of "+qAll.length:""}</h3>${qHTML}</div>

      <div class="rw-card"><h3>Job hunt</h3>
        <div class="rw-kv" style="margin:0">
          <div class="c"><div class="k">Applied</div><div class="v">${all.applied}</div></div>
          <div class="c"><div class="k">Resume touches</div><div class="v">${cj("resume")}</div></div>
          <div class="c"><div class="k">LinkedIn touches</div><div class="v">${cj("linkedin")}</div></div>
          <div class="c"><div class="k">Follow-ups</div><div class="v">${cj("followup")}</div></div></div></div>`;
  }

  /* --------------------------------------------------------------- render */
  function render() {
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
        <button class="rw-sb ${view==="today"?"on":""}" data-v="today">Today</button>
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
      if (b.classList.contains("rw-pip")) peeked = (peeked===b.dataset.goto) ? null : b.dataset.goto;
      selected=b.dataset.goto;
      if (b.dataset.open){ view="today"; window.scrollTo({top:0,behavior:"smooth"}); } render();
    });

    /* runway: hover cards + keyboard scrubbing */
    const card=root.querySelector(".rw-runway"), tip=root.querySelector(".rw-tip");
    if (card && tip) {
      const show = pip => {
        const day=byDate[pip.dataset.goto]; if(!day) return;
        const c=comp(day.date), dt=new Date(day.date+"T00:00:00");
        tip.innerHTML=`<div class="tt-d">${dt.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})} · day ${day.id}${day.milestone?" · ✦ milestone":""}</div>
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
          const f=Math.max(0,Math.min(1,(clientX-r.left)/r.width)); return Math.round(f*(SCHEDULE.length-1)); };
        const applyX = clientX => { const j=idxFromX(clientX);
          if (SCHEDULE[j] && SCHEDULE[j].date!==selected){ selected=SCHEDULE[j].date;
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
      root.querySelectorAll(".rw-months .rw-mo").forEach(mo=>mo.onclick=()=>{
        const key=mo.dataset.mk; const d=SCHEDULE.find(x=>x.month===key); if(d){ selected=d.date; render(); } });

      const spine=root.querySelector(".rw-spine");
      if (spine) spine.onkeydown=e=>{
        const step={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[e.key];
        if(!step && e.key!=="Home" && e.key!=="End") return;
        e.preventDefault();
        const i=SCHEDULE.findIndex(d=>d.date===selected);
        const j = e.key==="Home" ? 0 : e.key==="End" ? SCHEDULE.length-1
                : Math.max(0, Math.min(SCHEDULE.length-1, i+step));
        selected=SCHEDULE[j].date; keepSpineFocus=true; render();
      };
    }
    root.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{ const i=SCHEDULE.findIndex(d=>d.date===selected)+(+b.dataset.nav);
      if(i>=0&&i<SCHEDULE.length){ selected=SCHEDULE[i].date; render(); } });
    const jump=root.querySelector("[data-jump]"); if(jump) jump.onclick=()=>{ selected=today; render(); };

    root.querySelectorAll("[data-tog]").forEach(li=>li.onclick=ev=>{
      if (ev.target.closest("[data-mv],[data-ret],.rw-pop")) return;   // the move affordances live inside the row
      const r=rec(selected), id=li.dataset.tog, before=comp(selected);
      r.done[id]=!r.done[id];
      syncNow(r, `trackhawk: study ${r.done[id]?"\u2713":"\u2717"} ${selected} ${id}`);
      justPopped = (before<0.999 && comp(selected)>=0.999) ? selected : null;  // full-day completion -> celebrate
      render();
    });

    /* ---- move a task to another day ------------------------------------ */
    const closePop = () => { const q=root.querySelector(".rw-pop"); if(q) q.remove(); };
    root.querySelectorAll("[data-mv]").forEach(btn=>btn.onclick=ev=>{
      ev.stopPropagation();
      const li=btn.closest("li"), already=!!li.querySelector(".rw-pop");
      closePop(); if (already) return;
      const id=btn.dataset.mv, i=SCHEDULE.findIndex(d=>d.date===selected);
      const opts=SCHEDULE.slice(i+1, i+6);
      const pop=document.createElement("div"); pop.className="rw-pop";
      pop.innerHTML = opts.length
        ? `<div class="ttl">Push to</div>` + opts.map(d=>`<button type="button" data-to="${d.date}">${d.dow} ${d.day} ${d.month}</button>`).join("")
        : `<div class="ttl">No later day left in the plan</div>`;
      li.appendChild(pop);
      pop.querySelectorAll("[data-to]").forEach(b2=>b2.onclick=e2=>{
        e2.stopPropagation(); moveItem(selected, id, b2.dataset.to); render(); });
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
      if (!live) timerOn={date:selected, cat:k, t0:Date.now()};
      render();
    });

    /* ---- tick straight from the expanded pip ---------------------------- */
    root.querySelectorAll("[data-pk]").forEach(b=>b.onclick=()=>{
      if (!peeked) return;
      const r=rec(peeked), k=b.dataset.pk;
      r.done[k]=!r.done[k];
      syncNow(r, `trackhawk: study ${r.done[k]?"\u2713":"\u2717"} ${peeked} ${k}`);
      render();
    });

    // Inputs update memory (and the visual bar) on every keystroke, but only PERSIST
    // on change/blur — so no sync-driven re-render happens while you're typing.
    root.querySelectorAll("[data-time]").forEach(inp=>{
      inp.oninput=()=>{ const r=rec(selected), k=inp.dataset.time;
        r.tmin[k]= inp.value===""?null:Math.max(0,+inp.value);
        const day=byDate[selected], e=day.expected[k], act=+inp.value||0;
        const bar=inp.closest(".rw-tcell").querySelector(".rw-tbar>i");
        if(bar) bar.style.width=Math.round((e?Math.min(1,act/e):(act>0?1:0))*100)+"%"; };
      inp.onchange=()=>{ syncNow(rec(selected),"trackhawk: study time "+selected); };
    });

    root.querySelectorAll("[data-num]").forEach(inp=>{
      inp.oninput=()=>{ const r=rec(selected), k=inp.dataset.num;
        r[k]= inp.value===""?(k==="problems"?null:0):Math.max(0,+inp.value); };
      inp.onchange=()=>{ syncNow(rec(selected),"trackhawk: study "+inp.dataset.num+" "+selected); };
    });

    root.querySelectorAll("[data-iq]").forEach(inp=>{
      inp.oninput=()=>{ const r=rec(selected); r.iq[+inp.dataset.iq]=inp.value; };
      inp.onchange=()=>{ const r=rec(selected); r.iq[+inp.dataset.iq]=inp.value; syncNow(r,"trackhawk: study question "+selected); };
    });

    const note=root.querySelector("#rw-note");
    if(note){
      note.oninput=()=>{ rec(selected).note=note.value; };                 // memory only, no re-render
      note.onchange=()=>{ const r=rec(selected); r.note=note.value; syncNow(r,"trackhawk: study note "+selected); };
    }
  }

  return {render};
})();
