/* TrackHawk — Study: the 51-day runway (Aug 3 – Sep 22). Weekday mornings apply to fresh
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

  const SCHEDULE = [{"id":1,"date":"2026-08-03","dow":"Mon","month":"Aug","day":3,"prep":1,"weekStart":"2026-08-03","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S1\u20132 \u2014 Introduction & Setup","dsaTask":"[DSA] DSA S1 \u2014 Introduction","lcTask":"[LC] 2\u20133 problems \u00b7 Arrays/Strings","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["pw",1],["pw",2]],"dsaAdv":[1],"lcChapter":"Arrays/Strings","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":2,"date":"2026-08-04","dow":"Tue","month":"Aug","day":4,"prep":1,"weekStart":"2026-08-03","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S3 \u2014 Python basics (part 1)","dsaTask":"[DSA] DSA S2 \u2014 Big-O / run-time analysis","lcTask":"[LC] 2\u20133 problems \u00b7 Arrays/Strings","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["pw",3]],"dsaAdv":[2],"lcChapter":"Arrays/Strings","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":3,"date":"2026-08-05","dow":"Wed","month":"Aug","day":5,"prep":1,"weekStart":"2026-08-03","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S3 \u2014 Python basics (part 2)","dsaTask":"[DSA] DSA S3 \u2014 Array","lcTask":"[LC] 2\u20133 problems \u00b7 Arrays/Strings","morning":"[APPLY] Apply to fresh postings","adv":[["pw",3]],"dsaAdv":[3],"lcChapter":"Arrays/Strings","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":4,"date":"2026-08-06","dow":"Thu","month":"Aug","day":6,"prep":1,"weekStart":"2026-08-03","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S4 \u2014 Pytest framework basics","dsaTask":"[DSA] DSA S3 \u2014 Array (cont.)","lcTask":"[LC] 2\u20133 problems \u00b7 Hashing","morning":"[APPLY] Apply + note recruiter contacts","adv":[["pw",4]],"dsaAdv":[3],"lcChapter":"Hashing","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":5,"date":"2026-08-07","dow":"Fri","month":"Aug","day":7,"prep":1,"weekStart":"2026-08-03","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S5 \u2014 Getting started with automation","dsaTask":"[DSA] DSA S4 \u2014 Linked List","lcTask":"[LC] 2\u20133 problems \u00b7 Hashing","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["pw",5]],"dsaAdv":[4],"lcChapter":"Hashing","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":6,"date":"2026-08-08","dow":"Sat","month":"Aug","day":8,"prep":1,"weekStart":"2026-08-03","type":"weekend","phase":"PREP","mainTask":"[PREP] Resume & profile foundation","secondTask":"[JOB] Lock down resume + LinkedIn","prepTasks":["Tailor ATS resume \u2014 add Playwright / automation","Refresh LinkedIn headline & About","Pin GitHub repos, clean up profile"],"jobFocus":"Lock down resume + LinkedIn","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":7,"date":"2026-08-09","dow":"Sun","month":"Aug","day":9,"prep":1,"weekStart":"2026-08-03","type":"weekend","phase":"PREP","mainTask":"[PREP] Applications engine","secondTask":"[JOB] Queue next week's applications","prepTasks":["Build a target-company list for the week","Draft 2 tailored cover lines","Queue Monday-morning applications"],"jobFocus":"Queue next week's applications","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":8,"date":"2026-08-10","dow":"Mon","month":"Aug","day":10,"prep":1,"weekStart":"2026-08-10","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S6 \u2014 Deep dive into UI methods","dsaTask":"[DSA] DSA S4 \u2014 Linked List (cont.)","lcTask":"[LC] 2\u20133 problems \u00b7 Hashing","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["pw",6]],"dsaAdv":[4],"lcChapter":"Hashing","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":9,"date":"2026-08-11","dow":"Tue","month":"Aug","day":11,"prep":1,"weekStart":"2026-08-10","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S7 \u2014 UI functional validations & assertions","dsaTask":"[DSA] DSA S5 \u2014 Stack","lcTask":"[LC] 2\u20133 problems \u00b7 Linked Lists","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["pw",7]],"dsaAdv":[5],"lcChapter":"Linked Lists","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":10,"date":"2026-08-12","dow":"Wed","month":"Aug","day":12,"prep":1,"weekStart":"2026-08-10","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S8 \u2014 API testing (Web & API e2e)","dsaTask":"[DSA] DSA S6 \u2014 Queue","lcTask":"[LC] 2\u20133 problems \u00b7 Linked Lists","morning":"[APPLY] Apply to fresh postings","adv":[["pw",8]],"dsaAdv":[6],"lcChapter":"Linked Lists","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":11,"date":"2026-08-13","dow":"Thu","month":"Aug","day":13,"prep":1,"weekStart":"2026-08-10","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S9 \u2014 Network interception","dsaTask":"[DSA] DSA S7 \u2014 Binary Tree","lcTask":"[LC] 2\u20133 problems \u00b7 Linked Lists","morning":"[APPLY] Apply + note recruiter contacts","adv":[["pw",9]],"dsaAdv":[7],"lcChapter":"Linked Lists","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":12,"date":"2026-08-14","dow":"Fri","month":"Aug","day":14,"prep":1,"weekStart":"2026-08-10","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S10 \u2014 Framework part 1 (POM, data-driven)","dsaTask":"[DSA] DSA S7 \u2014 Binary Tree (cont.)","lcTask":"[LC] 2\u20133 problems \u00b7 Stacks/Queues","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["pw",10]],"dsaAdv":[7],"lcChapter":"Stacks/Queues","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":13,"date":"2026-08-15","dow":"Sat","month":"Aug","day":15,"prep":1,"weekStart":"2026-08-10","type":"weekend","phase":"PREP","mainTask":"[PREP] Flashcards from the week","secondTask":"[JOB] Build flashcards + apply","prepTasks":["Turn this week's logged questions into flashcards","Add Python & Pytest Q&A cards","Drill the new deck once"],"jobFocus":"Build flashcards + apply","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":14,"date":"2026-08-16","dow":"Sun","month":"Aug","day":16,"prep":1,"weekStart":"2026-08-10","type":"weekend","phase":"PREP","mainTask":"[PREP] Automation interview answers","secondTask":"[JOB] Automation Q&A + apply","prepTasks":["Write answers: Playwright locators & auto-waiting","Write answers: Pytest fixtures & POM","Mock: explain your framework design"],"jobFocus":"Automation Q&A + apply","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":15,"date":"2026-08-17","dow":"Mon","month":"Aug","day":17,"prep":1,"weekStart":"2026-08-17","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S11 \u2014 Framework part 2 (config, parallel)","dsaTask":"[DSA] DSA S8 \u2014 Binary Search Tree","lcTask":"[LC] 2\u20133 problems \u00b7 Stacks/Queues","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["pw",11]],"dsaAdv":[8],"lcChapter":"Stacks/Queues","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":16,"date":"2026-08-18","dow":"Tue","month":"Aug","day":18,"prep":2,"weekStart":"2026-08-17","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S12 \u2014 Framework part 3 (BDD, CI/CD)","dsaTask":"[DSA] DSA S9 \u2014 Binary Heap","lcTask":"[LC] 2\u20133 problems \u00b7 Stacks/Queues","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["pw",12]],"dsaAdv":[9],"lcChapter":"Stacks/Queues","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":17,"date":"2026-08-19","dow":"Wed","month":"Aug","day":19,"prep":2,"weekStart":"2026-08-17","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S13 \u2014 AI at terminal (Claude Code & MCP)","dsaTask":"[DSA] DSA S10 \u2014 AVL Tree","lcTask":"[LC] 2\u20133 problems \u00b7 Trees/Graphs","morning":"[APPLY] Apply to fresh postings","adv":[["pw",13]],"dsaAdv":[10],"lcChapter":"Trees/Graphs","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":18,"date":"2026-08-20","dow":"Thu","month":"Aug","day":20,"prep":2,"weekStart":"2026-08-17","type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S14\u201315 \u2014 Interview Qs & wrap  \u25b8 PLAYWRIGHT DONE","dsaTask":"[DSA] DSA S11 \u2014 Trie","lcTask":"[LC] 2\u20133 problems \u00b7 Trees/Graphs","morning":"[APPLY] Apply + note recruiter contacts","adv":[["pw",14],["pw",15]],"dsaAdv":[11],"lcChapter":"Trees/Graphs","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"PW_DONE"},{"id":19,"date":"2026-08-21","dow":"Fri","month":"Aug","day":21,"prep":2,"weekStart":"2026-08-17","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S1 \u2014 Testing terminologies","dsaTask":"[DSA] DSA S12 \u2014 Searching  \u2726 Aug target","lcTask":"[LC] 2\u20133 problems \u00b7 Trees/Graphs","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["ai",1]],"dsaAdv":[12],"lcChapter":"Trees/Graphs","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"AUG_TARGET"},{"id":20,"date":"2026-08-22","dow":"Sat","month":"Aug","day":22,"prep":2,"weekStart":"2026-08-17","type":"weekend","phase":"PREP","mainTask":"[PREP] DSA patterns review","secondTask":"[JOB] DSA drilling + apply","prepTasks":["Flashcards: Two Pointers / Sliding Window","Re-solve 3 medium problems from memory","Log the ones you couldn't do"],"jobFocus":"DSA drilling + apply","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":21,"date":"2026-08-23","dow":"Sun","month":"Aug","day":23,"prep":2,"weekStart":"2026-08-17","type":"weekend","phase":"PREP","mainTask":"[PREP] First mock interview","secondTask":"[JOB] Mock interview + apply: 5 roles","prepTasks":["Do 1 full mock interview (record it)","Note every question you fumbled","Turn fumbles into flashcards"],"jobFocus":"Mock interview + apply: 5 roles","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":22,"date":"2026-08-24","dow":"Mon","month":"Aug","day":24,"prep":2,"weekStart":"2026-08-24","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S2 \u2014 Prompt engineering (3 C's)","dsaTask":"[DSA] DSA S13 \u2014 Sorting","lcTask":"[LC] 2\u20133 problems \u00b7 Heaps","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["ai",2]],"dsaAdv":[13],"lcChapter":"Heaps","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":23,"date":"2026-08-25","dow":"Tue","month":"Aug","day":25,"prep":2,"weekStart":"2026-08-24","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S3 \u2014 Test plan / cases with AI","dsaTask":"[DSA] DSA S14 \u2014 Recursion","lcTask":"[LC] 2\u20133 problems \u00b7 Heaps","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["ai",3]],"dsaAdv":[14],"lcChapter":"Heaps","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":24,"date":"2026-08-26","dow":"Wed","month":"Aug","day":26,"prep":2,"weekStart":"2026-08-24","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S4 \u2014 GitHub Copilot","dsaTask":"[DSA] DSA S15 \u2014 Hashing","lcTask":"[LC] 2\u20133 problems \u00b7 Heaps","morning":"[APPLY] Apply to fresh postings","adv":[["ai",4]],"dsaAdv":[15],"lcChapter":"Heaps","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":25,"date":"2026-08-27","dow":"Thu","month":"Aug","day":27,"prep":2,"weekStart":"2026-08-24","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S5 \u2014 MCP servers (part 1)","dsaTask":"[DSA] DSA S16 \u2014 Dynamic Programming","lcTask":"[LC] 2\u20133 problems \u00b7 Greedy","morning":"[APPLY] Apply + note recruiter contacts","adv":[["ai",5]],"dsaAdv":[16],"lcChapter":"Greedy","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":26,"date":"2026-08-28","dow":"Fri","month":"Aug","day":28,"prep":3,"weekStart":"2026-08-24","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S5 \u2014 MCP servers (part 2)","dsaTask":"[DSA] DSA S16 \u2014 DP (cont.)","lcTask":"[LC] 2\u20133 problems \u00b7 Greedy","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["ai",5]],"dsaAdv":[16],"lcChapter":"Greedy","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":27,"date":"2026-08-29","dow":"Sat","month":"Aug","day":29,"prep":3,"weekStart":"2026-08-24","type":"weekend","phase":"PREP","mainTask":"[PREP] Core Java interview answers","secondTask":"[JOB] Java Q&A + apply","prepTasks":["Answers: OOP, collections, generics","Answers: exceptions & streams","Drill Core Java flashcards"],"jobFocus":"Java Q&A + apply","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":28,"date":"2026-08-30","dow":"Sun","month":"Aug","day":30,"prep":3,"weekStart":"2026-08-24","type":"weekend","phase":"PREP","mainTask":"[PREP] Spring & REST answers","secondTask":"[JOB] Spring Q&A + apply","prepTasks":["Answers: IoC/DI, beans, auto-config","Answers: REST, status codes, JPA","Mock: design a small REST API"],"jobFocus":"Spring Q&A + apply","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":29,"date":"2026-08-31","dow":"Mon","month":"Aug","day":31,"prep":3,"weekStart":"2026-08-31","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S6 \u2014 Multi-agent / agentic AI","dsaTask":"[DSA] DSA S17 \u2014 Graph","lcTask":"[LC] 2\u20133 problems \u00b7 Greedy","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["ai",6]],"dsaAdv":[17],"lcChapter":"Greedy","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":30,"date":"2026-09-01","dow":"Tue","month":"Sep","day":1,"prep":3,"weekStart":"2026-08-31","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S7 \u2014 Agentic AI for QE (part 1)","dsaTask":"[DSA] DSA S17 \u2014 Graph (cont.)","lcTask":"[LC] 2\u20133 problems \u00b7 Binary Search","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["ai",7]],"dsaAdv":[17],"lcChapter":"Binary Search","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":31,"date":"2026-09-02","dow":"Wed","month":"Sep","day":2,"prep":3,"weekStart":"2026-08-31","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S7 \u2014 Agentic AI for QE (part 2)","dsaTask":"[DSA] Revise Arrays & Hashing","lcTask":"[LC] 2\u20133 problems \u00b7 Binary Search","morning":"[APPLY] Apply to fresh postings","adv":[["ai",7]],"dsaAdv":[],"lcChapter":"Binary Search","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":32,"date":"2026-09-03","dow":"Thu","month":"Sep","day":3,"prep":3,"weekStart":"2026-08-31","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S8 \u2014 QA DevOps with AI agents","dsaTask":"[DSA] Revise Linked Lists & Stacks","lcTask":"[LC] 2\u20133 problems \u00b7 Binary Search","morning":"[APPLY] Apply + note recruiter contacts","adv":[["ai",8]],"dsaAdv":[],"lcChapter":"Binary Search","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":33,"date":"2026-09-04","dow":"Fri","month":"Sep","day":4,"prep":3,"weekStart":"2026-08-31","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S9 \u2014 n8n automation workflows","dsaTask":"[DSA] Revise Trees & BST","lcTask":"[LC] 2\u20133 problems \u00b7 Backtracking","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["ai",9]],"dsaAdv":[],"lcChapter":"Backtracking","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":34,"date":"2026-09-05","dow":"Sat","month":"Sep","day":5,"prep":3,"weekStart":"2026-08-31","type":"weekend","phase":"PREP","mainTask":"[PREP] Behavioural + system design lite","secondTask":"[JOB] Behavioural prep + apply","prepTasks":["Prep STAR answers for HR round","Sketch 1 system-design walkthrough","Review your logged questions end-to-end"],"jobFocus":"Behavioural prep + apply","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":35,"date":"2026-09-06","dow":"Sun","month":"Sep","day":6,"prep":3,"weekStart":"2026-08-31","type":"weekend","phase":"PREP","mainTask":"[PREP] Full mock + gap-fill","secondTask":"[JOB] Mock #2 + apply: 5 roles","prepTasks":["Second full mock interview","List your 5 weakest topics","Make targeted flashcards for them"],"jobFocus":"Mock #2 + apply: 5 roles","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":36,"date":"2026-09-07","dow":"Mon","month":"Sep","day":7,"prep":3,"weekStart":"2026-09-07","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S10 \u2014 API test code generation","dsaTask":"[DSA] Revise Heaps & Greedy","lcTask":"[LC] 2\u20133 problems \u00b7 Backtracking","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["ai",10]],"dsaAdv":[],"lcChapter":"Backtracking","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":37,"date":"2026-09-08","dow":"Tue","month":"Sep","day":8,"prep":3,"weekStart":"2026-09-07","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S11 \u2014 Low-code testing tools","dsaTask":"[DSA] Revise Searching & Sorting","lcTask":"[LC] 2\u20133 problems \u00b7 Backtracking","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["ai",11]],"dsaAdv":[],"lcChapter":"Backtracking","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":38,"date":"2026-09-09","dow":"Wed","month":"Sep","day":9,"prep":3,"weekStart":"2026-09-07","type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S12\u201313  \u25b8 AUTOMATION COMPLETE","dsaTask":"[DSA] Revise Recursion & Backtracking","lcTask":"[LC] 2\u20133 problems \u00b7 DP","morning":"[APPLY] Apply to fresh postings","adv":[["ai",12],["ai",13]],"dsaAdv":[],"lcChapter":"DP","expected":{"course":90,"dsa":60,"prep":15,"job":15},"milestone":"AUTO_DONE"},{"id":39,"date":"2026-09-10","dow":"Thu","month":"Sep","day":10,"prep":4,"weekStart":"2026-09-07","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S1\u20132 \u2014 Course intro + Core Java (start)","dsaTask":"[DSA] Revise DP patterns","lcTask":"[LC] 2\u20133 problems \u00b7 DP","morning":"[APPLY] Apply + note recruiter contacts","adv":[["sp",1],["sp",2]],"dsaAdv":[],"lcChapter":"DP","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":40,"date":"2026-09-11","dow":"Fri","month":"Sep","day":11,"prep":4,"weekStart":"2026-09-07","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S2 \u2014 Core Java","dsaTask":"[DSA] Revise Graphs (BFS/DFS)","lcTask":"[LC] 2\u20133 problems \u00b7 DP","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["sp",2]],"dsaAdv":[],"lcChapter":"DP","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":41,"date":"2026-09-12","dow":"Sat","month":"Sep","day":12,"prep":4,"weekStart":"2026-09-07","type":"weekend","phase":"PREP","mainTask":"[PREP] Drill weak spots","secondTask":"[JOB] Weak-spot drilling + apply","prepTasks":["Drill the weak-topic flashcards","Re-solve 5 mixed LeetCode from memory","Review interview-question log"],"jobFocus":"Weak-spot drilling + apply","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":42,"date":"2026-09-13","dow":"Sun","month":"Sep","day":13,"prep":4,"weekStart":"2026-09-07","type":"weekend","phase":"PREP","mainTask":"[PREP] Interview sprint","secondTask":"[JOB] Interview sprint + apply: 5 roles","prepTasks":["Third mock interview","Rapid-fire your full flashcard deck","Tailor resume to your top 3 target roles"],"jobFocus":"Interview sprint + apply: 5 roles","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":43,"date":"2026-09-14","dow":"Mon","month":"Sep","day":14,"prep":4,"weekStart":"2026-09-14","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S2 \u2014 Core Java (finish)","dsaTask":"[DSA] Mixed timed review","lcTask":"[LC] 2\u20133 problems \u00b7 Graphs (BFS/DFS)","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["sp",2]],"dsaAdv":[],"lcChapter":"Graphs (BFS/DFS)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":44,"date":"2026-09-15","dow":"Tue","month":"Sep","day":15,"prep":4,"weekStart":"2026-09-14","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S3 \u2014 Advance Java (start)","dsaTask":"[DSA] Mixed timed review","lcTask":"[LC] 2\u20133 problems \u00b7 Graphs (BFS/DFS)","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["sp",3]],"dsaAdv":[],"lcChapter":"Graphs (BFS/DFS)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":45,"date":"2026-09-16","dow":"Wed","month":"Sep","day":16,"prep":4,"weekStart":"2026-09-14","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S3 \u2014 Advance Java","dsaTask":"[DSA] Revise Arrays & Hashing","lcTask":"[LC] 2\u20133 problems \u00b7 Graphs (BFS/DFS)","morning":"[APPLY] Apply to fresh postings","adv":[["sp",3]],"dsaAdv":[],"lcChapter":"Graphs (BFS/DFS)","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":46,"date":"2026-09-17","dow":"Thu","month":"Sep","day":17,"prep":4,"weekStart":"2026-09-14","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S3 \u2014 Advance Java (finish)","dsaTask":"[DSA] Revise Linked Lists & Stacks","lcTask":"[LC] 2\u20133 problems \u00b7 Tools & tricks","morning":"[APPLY] Apply + note recruiter contacts","adv":[["sp",3]],"dsaAdv":[],"lcChapter":"Tools & tricks","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":47,"date":"2026-09-18","dow":"Fri","month":"Sep","day":18,"prep":4,"weekStart":"2026-09-14","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S4 \u2014 Maven","dsaTask":"[DSA] Revise Trees & BST","lcTask":"[LC] 2\u20133 problems \u00b7 Tools & tricks","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["sp",4]],"dsaAdv":[],"lcChapter":"Tools & tricks","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":48,"date":"2026-09-19","dow":"Sat","month":"Sep","day":19,"prep":4,"weekStart":"2026-09-14","type":"weekend","phase":"PREP","mainTask":"[PREP] Final polish","secondTask":"[JOB] Polish + follow-ups","prepTasks":["Full flashcard review + logged questions","Refine your 90-second pitch","Queue applications + follow-ups"],"jobFocus":"Polish + follow-ups","isSunday":false,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":49,"date":"2026-09-20","dow":"Sun","month":"Sep","day":20,"prep":4,"weekStart":"2026-09-14","type":"weekend","phase":"PREP","mainTask":"[PREP] Consolidate & launch","secondTask":"[JOB] Consolidate + apply","prepTasks":["Two-month review \u2014 what clicked","Final resume + LinkedIn pass","Plan the interview-heavy weeks ahead"],"jobFocus":"Consolidate + apply","isSunday":true,"expected":{"course":0,"dsa":0,"prep":150,"job":90}},{"id":50,"date":"2026-09-21","dow":"Mon","month":"Sep","day":21,"prep":4,"weekStart":"2026-09-21","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S5 \u2014 JDBC","dsaTask":"[DSA] Revise Heaps & Greedy","lcTask":"[LC] 2\u20133 problems \u00b7 Tools & tricks","morning":"[APPLY] Apply to fresh postings (2\u20133)","adv":[["sp",5]],"dsaAdv":[],"lcChapter":"Tools & tricks","expected":{"course":90,"dsa":60,"prep":15,"job":15}},{"id":51,"date":"2026-09-22","dow":"Tue","month":"Sep","day":22,"prep":4,"weekStart":"2026-09-21","type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S6 \u2014 Hibernate (ORM basics)","dsaTask":"[DSA] Revise Searching & Sorting","lcTask":"[LC] 2\u20133 problems \u00b7 Tools & tricks","morning":"[APPLY] Quick LinkedIn scan + apply","adv":[["sp",6]],"dsaAdv":[],"lcChapter":"Tools & tricks","expected":{"course":90,"dsa":60,"prep":15,"job":15}}];
  const byDate = Object.fromEntries(SCHEDULE.map(d => [d.date, d]));
  const START = SCHEDULE[0].date, END = SCHEDULE[SCHEDULE.length-1].date;
  const TOTALS = {pw:15, ai:13, sp:27, dsa:17, lc:13};
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
    if (!r.done) r.done = {}; if (!r.tmin) r.tmin = {};
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

  /* ------------------------------------------------------------- helpers */
  const PREP_LABEL = {1:"background",2:"building",3:"significant",4:"headline priority"};
  function itemsFor(day) {
    if (day.type === "weekday") {
      const arr = [
        {id:"apply", label:day.morning, main:false, cat:"job", morning:true},
        {id:"main",  label:day.mainTask, main:true,  cat:day.phase==="SPRING"?"spring":"auto"},
        {id:"dsa",   label:day.dsaTask,  main:false, cat:"dsa"},
        {id:"lc",    label:day.lcTask,   cat:"dsa"},
        {id:"iqlog", label:"Logged interview questions seen today", cat:"prep"},
        {id:"notes", label:"Jotted key takeaways", },
      ];
      if (day.prep>=3) arr.push({id:"prepdrill", label:"Drilled flashcards / reviewed logged questions", cat:"prep", prep:true});
      if (day.prep>=4) arr.push({id:"answers",   label:"Rehearsed 1 interview answer out loud", cat:"prep", prep:true});
      return arr;
    }
    // weekend — deep prep + job hunt, no course study
    const t = day.prepTasks || [];
    const a = [
      {id:"pmain", label:day.mainTask, main:true, cat:"prep"},
      {id:"p0", label:t[0]||"", cat:"prep"},
      {id:"p1", label:t[1]||"", cat:"prep"},
      {id:"p2", label:t[2]||"", cat:"prep"},
      {id:"cards", label:"Turned this week's logged questions into flashcards", cat:"prep"},
      {id:"resume", label:"Tailored resume for a specific role", cat:"job"},
      {id:"linkedin", label:"LinkedIn / networking touch", cat:"job"},
      {id:"queue", label:"Queued Monday-morning applications — "+(day.jobFocus||""), cat:"job"},
    ];
    if (day.isSunday) a.push({id:"reflect", label:"Weekly reflection + plan next week", cat:"prep"});
    return a.filter(x=>x.label!=="");
  }
  function comp(iso) { const d=byDate[iso]; if(!d) return 0; const it=itemsFor(d), dn=peek(iso).done;
    return it.length ? it.filter(i=>dn[i.id]).length/it.length : 0; }

  function rollup(list) {
    const pw=new Set(),ai=new Set(),dsa=new Set(),lc=new Set(),sp=new Set();
    const time={course:0,dsa:0,prep:0,job:0}, exp={course:0,dsa:0,prep:0,job:0};
    let problems=0, applied=0, cSum=0;
    list.forEach(day => {
      const st=peek(day.date), dn=st.done||{}, tm=st.tmin||{};
      exp.course+=day.expected.course; exp.dsa+=day.expected.dsa; exp.prep+=day.expected.prep; exp.job+=day.expected.job;
      time.course+=(+tm.course||0); time.dsa+=(+tm.dsa||0); time.prep+=(+tm.prep||0); time.job+=(+tm.job||0);
      cSum+=comp(day.date);
      if (day.type==="weekday") {
        if (dn.main && day.adv) day.adv.forEach(([k,n]) => ({pw,ai,sp})[k].add(n));
        if (dn.dsa && day.dsaAdv) day.dsaAdv.forEach(n=>dsa.add(n));
        if (dn.lc && day.lcChapter) lc.add(day.lcChapter);
        problems += (st.problems!=null ? (+st.problems||0) : (dn.lc?2:0));
        applied  += (st.applied!=null ? (+st.applied||0) : (dn.apply?2:0));
      } else {
        problems += (st.problems!=null ? (+st.problems||0) : 0);
        applied  += (+st.applied||0);
      }
    });
    return {pw,ai,dsa,lc,sp,time,exp,problems,applied,avgComp:list.length?cSum/list.length:0,count:list.length};
  }
  const cumTo = iso => rollup(SCHEDULE.filter(d=>d.date<=iso));
  const cumAll = () => rollup(SCHEDULE);
  function streak() { let s=0; for (const iso of SCHEDULE.map(d=>d.date).filter(d=>d<=today).reverse()) {
    const dn=peek(iso).done; if (dn.lc||dn.main||dn.dsa) s++; else break; } return s; }

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

  /* ------------------------------------------------------------ sub-views */
  const DOWI = {Mon:0,Tue:1,Wed:2,Thu:3,Fri:4,Sat:5,Sun:6};
  const PHASE_TINT = {AUTO:"rgba(255,176,32,.55)", SPRING:"rgba(200,255,50,.5)", PREP:"rgba(34,211,197,.5)"};
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
      isW?"Weekend · prep & job hunt":(day.phase==="SPRING"?"Weekday · Spring Boot":"Weekday · Automation")}</span>`;
    chips += `<span class="rw-chip">${isW?"~2.5h prep":"morning apply · ~2.5h eve"}</span>`;
    chips += `<span class="rw-chip prep" title="Interview-prep priority rises through the plan">prep: ${PREP_LABEL[day.prep]}</span>`;
    if (day.milestone==="PW_DONE") chips+=`<span class="rw-chip mile">✦ Playwright done</span>`;
    if (day.milestone==="AUTO_DONE") chips+=`<span class="rw-chip mile">✦ Automation complete</span>`;
    if (day.milestone==="AUG_TARGET") chips+=`<span class="rw-chip mile">✦ August DSA target</span>`;

    const items=itemsFor(day);
    const liFor = it => `<li class="${it.main?"main":""} ${st.done[it.id]?"on":""}" data-tog="${it.id}">
        <span class="rw-flag" style="${it.cat?"background:"+CAT[it.cat]:""}"></span>
        <span class="rw-box"></span><span class="rw-tl">${esc(it.label)}</span></li>`;
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

    const cats = isW ? [["prep","Prep / flashcards"],["job","Job hunt"]]
                     : [["course","Course (1.5h)"],["dsa","DSA study (1h)"],["prep","Interview prep"],["job","Apply"]];
    let tcells="";
    cats.forEach(([k,lab]) => {
      const val=st.tmin[k]!=null?st.tmin[k]:"", e=day.expected[k], act=+val||0, p=e?Math.min(1,act/e):(act>0?1:0);
      tcells += `<div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:${CAT[k]}"></span>${lab}</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="5" placeholder="0" value="${val}" data-time="${k}"/>
          <span class="exp">/ ${e}m</span></div>
        <div class="rw-tbar"><i style="width:${Math.round(p*100)}%;background:${CAT[k]}"></i></div></div>`;
    });
    const numrow=`<div class="rw-numrow">
      <div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:var(--violet)"></span>LeetCode problems</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="1" placeholder="${isW?"0":"2"}" value="${st.problems!=null?st.problems:""}" data-num="problems"/>
        <span class="exp">target ${isW?"—":"2–3"}</span></div></div>
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

      <div class="rw-card"><h3>Time spent — actual vs planned</h3>
        <div class="rw-tgrid">${tcells}</div>${numrow}</div>

      <div class="rw-card"><h3>Interview questions seen today</h3>
        <div class="rw-eyebrow" style="margin:-6px 0 11px">Two a day — jot them the moment you meet them</div>
        <div class="rw-qn"><span class="rw-qi">1</span><input class="rw-q" data-iq="0" placeholder="e.g. HashMap vs ConcurrentHashMap — how does resizing work?" value="${esc((st.iq||[])[0]||"")}"/></div>
        <div class="rw-qn"><span class="rw-qi">2</span><input class="rw-q" data-iq="1" placeholder="e.g. How would you stabilise a flaky Playwright test?" value="${esc((st.iq||[])[1]||"")}"/></div>
      </div>

      <div class="rw-card"><h3>Notes, blockers &amp; what to revisit</h3>
        <textarea class="rw-note" id="rw-note" placeholder="Problem numbers, what confused you, what to redo…">${esc(st.note||"")}</textarea>
        <div class="rw-hint">✓ saved to your encrypted vault &amp; synced</div></div>`;
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
    const ends=["2026-08-16","2026-08-30","2026-09-13","2026-09-22"], c=cumTo(ends[gi]);
    if (gi===0) return mk(c.pw.size>=8,"Playwright S1–8+ done (through API testing)")
      +mk(c.dsa.size>=6,"DSA S1–6 done via the daily hour (Big-O → Queue)")
      +mk(c.applied>=12,"Applications flowing — "+c.applied+" sent")
      +mk(true,"Resume tailored · LinkedIn refreshed (weekend 1)")
      +mk(c.problems>=15,"15+ LeetCode ("+c.problems+") — interview prep: background");
    if (gi===1) return mk(c.pw.size>=15,"Playwright finished · Automation underway")
      +mk(c.dsa.size>=12,"DSA target hit — S12 Searching by ~Aug 21")
      +mk(c.applied>=30,"30+ applications ("+c.applied+")")
      +mk(true,"First mock interview done · flashcards building")
      +mk(c.problems>=35,"Interview prep stepping up → significant");
    if (gi===2) return mk(c.ai.size>=13,"Automation complete → Spring Boot begins")
      +mk(c.dsa.size>=17,"Full DSA course done (S1–17) ✦")
      +mk(c.lc.size>=9,"LeetCode through Binary Search+")
      +mk(c.applied>=48,"48+ applications ("+c.applied+")")
      +mk(true,"Interview prep now a daily headline priority");
    return mk(c.sp.size>=6,"Spring S1–6 done (Core Java → Hibernate)")
      +mk(c.applied>=60,"60+ applications total ("+c.applied+")")
      +mk(true,"3 mock interviews · full flashcard deck drilled")
      +mk(c.problems>=70,"Interview-ready: prep dominates the final stretch")
      +mk(true,"90-second pitch rehearsed · follow-ups sent");
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
    else { const F=[["Fortnight 1","Aug 3 – Aug 16","2026-08-03","2026-08-16"],["Fortnight 2","Aug 17 – Aug 30","2026-08-17","2026-08-30"],
      ["Fortnight 3","Aug 31 – Sep 13","2026-08-31","2026-09-13"],["Fortnight 4","Sep 14 – Sep 22","2026-09-14","2026-09-22"]];
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
    const overall=(all.pw.size/TOTALS.pw+all.ai.size/TOTALS.ai+all.dsa.size/TOTALS.dsa+all.lc.size/TOTALS.lc+Math.min(1,all.sp.size/7))/5;
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
        <div class="tx"><b>August DSA target</b> — with a dedicated DSA hour every weekday you reach Section 12 (Searching) around <b>Aug 21</b>, still comfortably inside August.</div>
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
            <div><h3 style="margin:0">Overall course progress</h3><div class="rw-subtask">Weighted across all five tracks</div></div></div>
          ${mrow("Playwright (Automation 1)","var(--amber)",all.pw.size,TOTALS.pw)}
          ${mrow("AI Automation (Automation 2)","var(--amber)",all.ai.size,TOTALS.ai)}
          ${mrow("DSA course","var(--violet)",all.dsa.size,TOTALS.dsa)}
          ${mrow("LeetCode chapters","var(--violet)",all.lc.size,TOTALS.lc)}
          ${mrow("Spring Boot","var(--lime)",all.sp.size,TOTALS.sp)}</div>
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
    if (view==="today") panel=spineHTML()+todayHTML();
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

    root.querySelectorAll("[data-tog]").forEach(li=>li.onclick=()=>{ const r=rec(selected); const id=li.dataset.tog;
      const before=comp(selected); r.done[id]=!r.done[id];
      syncNow(r, `trackhawk: study ${r.done[id]?"✓":"✗"} ${selected} ${id}`);
      justPopped = (before<0.999 && comp(selected)>=0.999) ? selected : null;  // full-day completion -> celebrate
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
