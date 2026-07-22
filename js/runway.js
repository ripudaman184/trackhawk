/* TrackHawk — Study: the 53-day runway (Jul 22 – Sep 12) that keeps automation,
   DSA/LeetCode, Spring Boot and the job hunt on schedule. Every tick, minute and
   note lives in the encrypted vault (TH.data.study, one record per day), so it
   syncs across devices exactly like jobs, cards and the roadmap do.            */

const RUNWAY = (() => {
  const $  = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g,
    c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const SCHEDULE = [{"id":1,"date":"2026-07-22","dow":"Wed","month":"Jul","day":22,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S1\u20132 \u2014 Introduction & Setup","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",1],["pw",2]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-20"},{"id":2,"date":"2026-07-23","dow":"Thu","month":"Jul","day":23,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S3 \u2014 Python basics (part 1)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",3]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-20"},{"id":3,"date":"2026-07-24","dow":"Fri","month":"Jul","day":24,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S3 \u2014 Python basics (part 2)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",3]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-20"},{"id":4,"date":"2026-07-25","dow":"Sat","month":"Jul","day":25,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S1\u20133 \u2014 Big-O & Array","secondTask":"[DSA] Afternoon \u2014 LeetCode: Arrays & Strings","advDsa":[1,2,3],"advLc":["Intro","Arrays/Strings"],"milestone":null,"isSunday":false,"theory":["Python \u2014 classes, objects & inheritance","Python \u2014 exceptions & file handling","Pytest \u2014 test structure & discovery"],"jobFocus":"Refresh resume","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-07-20"},{"id":5,"date":"2026-07-26","dow":"Sun","month":"Jul","day":26,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S4 \u2014 Linked List","secondTask":"[DSA] Afternoon \u2014 LeetCode: Linked Lists","advDsa":[4],"advLc":["Linked Lists"],"milestone":null,"isSunday":true,"theory":["Pytest \u2014 fixtures & setup/teardown","Pytest \u2014 assertions & parameterization","Pytest \u2014 markers & config (conftest)"],"jobFocus":"Update LinkedIn","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-07-20"},{"id":6,"date":"2026-07-27","dow":"Mon","month":"Jul","day":27,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S4 \u2014 Pytest framework basics","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",4]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-27"},{"id":7,"date":"2026-07-28","dow":"Tue","month":"Jul","day":28,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S5 \u2014 Getting started with automation","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",5]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-27"},{"id":8,"date":"2026-07-29","dow":"Wed","month":"Jul","day":29,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S6 \u2014 Deep dive into UI methods","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",6]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-27"},{"id":9,"date":"2026-07-30","dow":"Thu","month":"Jul","day":30,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S7 \u2014 UI functional validations & assertions","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",7]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-27"},{"id":10,"date":"2026-07-31","dow":"Fri","month":"Jul","day":31,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S8 \u2014 API testing (Web & API e2e)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",8]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-07-27"},{"id":11,"date":"2026-08-01","dow":"Sat","month":"Aug","day":1,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S5 \u2014 Stack","secondTask":"[DSA] Afternoon \u2014 LeetCode: Hashing","advDsa":[5],"advLc":["Hashing"],"milestone":null,"isSunday":false,"theory":["Playwright \u2014 browser, context & pages","Playwright \u2014 locators & selectors","Playwright \u2014 auto-waiting & UI actions"],"jobFocus":"Update LinkedIn","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-07-27"},{"id":12,"date":"2026-08-02","dow":"Sun","month":"Aug","day":2,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S6 \u2014 Queue  +  S7 Binary Tree (start)","secondTask":"[DSA] Afternoon \u2014 LeetCode: Stacks & Queues","advDsa":[6,7],"advLc":["Stacks/Queues"],"milestone":null,"isSunday":true,"theory":["Playwright \u2014 assertions & validations","Playwright \u2014 API testing (hybrid)","Playwright \u2014 network interception"],"jobFocus":"Collect interview Qs","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-07-27"},{"id":13,"date":"2026-08-03","dow":"Mon","month":"Aug","day":3,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S9 \u2014 Network interception","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",9]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-03"},{"id":14,"date":"2026-08-04","dow":"Tue","month":"Aug","day":4,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S10 \u2014 Framework part 1 (POM, data-driven)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",10]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-03"},{"id":15,"date":"2026-08-05","dow":"Wed","month":"Aug","day":5,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S11 \u2014 Framework part 2 (config, parallel)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",11]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-03"},{"id":16,"date":"2026-08-06","dow":"Thu","month":"Aug","day":6,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S12 \u2014 Framework part 3 (BDD, CI/CD)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",12]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-03"},{"id":17,"date":"2026-08-07","dow":"Fri","month":"Aug","day":7,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S13 \u2014 AI at terminal (Claude Code & MCP)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",13]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-03"},{"id":18,"date":"2026-08-08","dow":"Sat","month":"Aug","day":8,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S7 \u2014 Binary Tree (cont.)","secondTask":"[DSA] Afternoon \u2014 LeetCode: Trees & Graphs","advDsa":[7],"advLc":["Trees/Graphs"],"milestone":null,"isSunday":false,"theory":["Pytest \u2014 Page Object Model","Pytest \u2014 data-driven testing","Pytest \u2014 parallel runs, tagging, reports"],"jobFocus":"Apply: 3\u20135 roles","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-03"},{"id":19,"date":"2026-08-09","dow":"Sun","month":"Aug","day":9,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S8 \u2014 Binary Search Tree","secondTask":"[DSA] Afternoon \u2014 LeetCode: BST problems","advDsa":[8],"advLc":[],"milestone":null,"isSunday":true,"theory":["Cucumber BDD \u2014 feature files & steps","CI/CD \u2014 running tests on Jenkins","HTML reporting & test artifacts"],"jobFocus":"Apply: 3\u20135 roles","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-03"},{"id":20,"date":"2026-08-10","dow":"Mon","month":"Aug","day":10,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] Playwright S14\u201315 \u2014 Interview Qs & wrap  \u25b8 PLAYWRIGHT DONE","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["pw",14],["pw",15]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-10"},{"id":21,"date":"2026-08-11","dow":"Tue","month":"Aug","day":11,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S1 \u2014 Testing terminologies","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",1]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-10"},{"id":22,"date":"2026-08-12","dow":"Wed","month":"Aug","day":12,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S2 \u2014 Prompt engineering (3 C's)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",2]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-10"},{"id":23,"date":"2026-08-13","dow":"Thu","month":"Aug","day":13,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S3 \u2014 Test plan / cases with AI","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",3]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-10"},{"id":24,"date":"2026-08-14","dow":"Fri","month":"Aug","day":14,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S4 \u2014 GitHub Copilot","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",4]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-10"},{"id":25,"date":"2026-08-15","dow":"Sat","month":"Aug","day":15,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S9 \u2014 Binary Heap","secondTask":"[DSA] Afternoon \u2014 LeetCode: Heaps","advDsa":[9],"advLc":["Heaps"],"milestone":null,"isSunday":false,"theory":["AI testing terminology & where AI fits","Prompt engineering \u2014 the 3 C's","Tokens & how LLMs read prompts"],"jobFocus":"Apply: 3\u20135 roles","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-10"},{"id":26,"date":"2026-08-16","dow":"Sun","month":"Aug","day":16,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S10 \u2014 AVL Tree","secondTask":"[DSA] Afternoon \u2014 LeetCode: mixed problems","advDsa":[10],"advLc":[],"milestone":null,"isSunday":true,"theory":["Generating test plans & cases with AI","GitHub Copilot \u2014 writing & fixing tests","Reviewing AI-generated automation critically"],"jobFocus":"Apply: 3\u20135 roles","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-10"},{"id":27,"date":"2026-08-17","dow":"Mon","month":"Aug","day":17,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S5 \u2014 MCP servers (part 1)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",5]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-17"},{"id":28,"date":"2026-08-18","dow":"Tue","month":"Aug","day":18,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S5 \u2014 MCP servers (part 2)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",5]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-17"},{"id":29,"date":"2026-08-19","dow":"Wed","month":"Aug","day":19,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S6 \u2014 Multi-agent / agentic AI","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",6]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-17"},{"id":30,"date":"2026-08-20","dow":"Thu","month":"Aug","day":20,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S7 \u2014 Agentic AI for QE (part 1)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",7]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-17"},{"id":31,"date":"2026-08-21","dow":"Fri","month":"Aug","day":21,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S7 \u2014 Agentic AI for QE (part 2)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",7]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-17"},{"id":32,"date":"2026-08-22","dow":"Sat","month":"Aug","day":22,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S11 \u2014 Trie","secondTask":"[DSA] Afternoon \u2014 LeetCode: Greedy","advDsa":[11],"advLc":["Greedy"],"milestone":null,"isSunday":false,"theory":["Model Context Protocol (MCP) servers","Building automation AI agents","Sub-agents & multi-agent collaboration"],"jobFocus":"Do 1 mock interview","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-17"},{"id":33,"date":"2026-08-23","dow":"Sun","month":"Aug","day":23,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 DSA S12 \u2014 Searching  \u2726 Aug target","secondTask":"[DSA] Afternoon \u2014 LeetCode: Binary Search  \u2726 target met","advDsa":[12],"advLc":["Binary Search"],"milestone":"AUG_TARGET","isSunday":true,"theory":["Agentic AI for quality engineering","AI-driven API test code generation","QA DevOps with AI (CI/CD, Docker, Actions)"],"jobFocus":"Apply: 5 roles","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-17"},{"id":34,"date":"2026-08-24","dow":"Mon","month":"Aug","day":24,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S8 \u2014 QA DevOps with AI agents","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",8]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-24"},{"id":35,"date":"2026-08-25","dow":"Tue","month":"Aug","day":25,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S9 \u2014 n8n automation workflows","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",9]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-24"},{"id":36,"date":"2026-08-26","dow":"Wed","month":"Aug","day":26,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S10 \u2014 API test code generation","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",10]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-24"},{"id":37,"date":"2026-08-27","dow":"Thu","month":"Aug","day":27,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S11 \u2014 Low-code testing tools","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",11]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-24"},{"id":38,"date":"2026-08-28","dow":"Fri","month":"Aug","day":28,"type":"weekday","phase":"AUTO","mainTask":"[AUTO] AI Automation S12\u201313  \u25b8 AUTOMATION COMPLETE","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["ai",12],["ai",13]],"expected":{"auto":60,"dsa":30,"spring":0,"job":0},"weekStart":"2026-08-24"},{"id":39,"date":"2026-08-29","dow":"Sat","month":"Aug","day":29,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 Revise DSA S1\u20136 (Big-O \u2192 Queue)","secondTask":"[DSA] Afternoon \u2014 LeetCode: mixed review","advDsa":[],"advLc":[],"milestone":null,"isSunday":false,"theory":["Core Java \u2014 OOP (inheritance, polymorphism)","Core Java \u2014 collections & generics","Core Java \u2014 exceptions & control flow"],"jobFocus":"Apply: 5 roles","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-24"},{"id":40,"date":"2026-08-30","dow":"Sun","month":"Aug","day":30,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 Revise DSA S7\u201312 (Trees \u2192 Searching)","secondTask":"[DSA] Afternoon \u2014 LeetCode: mixed review","advDsa":[],"advLc":[],"milestone":null,"isSunday":true,"theory":["Advance Java \u2014 streams & lambdas","JDBC \u2014 connecting to a database","Hibernate \u2014 ORM & entity mapping basics"],"jobFocus":"Follow up on applications","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-08-24"},{"id":41,"date":"2026-08-31","dow":"Mon","month":"Aug","day":31,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S1\u20132 \u2014 Course intro + Core Java (start)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",1],["sp",2]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-08-31"},{"id":42,"date":"2026-09-01","dow":"Tue","month":"Sep","day":1,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S2 \u2014 Core Java","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",2]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-08-31"},{"id":43,"date":"2026-09-02","dow":"Wed","month":"Sep","day":2,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S2 \u2014 Core Java (finish)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",2]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-08-31"},{"id":44,"date":"2026-09-03","dow":"Thu","month":"Sep","day":3,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S3 \u2014 Advance Java (start)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",3]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-08-31"},{"id":45,"date":"2026-09-04","dow":"Fri","month":"Sep","day":4,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S3 \u2014 Advance Java","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",3]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-08-31"},{"id":46,"date":"2026-09-05","dow":"Sat","month":"Sep","day":5,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 Revise Spring week (Core / Advance Java)","secondTask":"[DSA] Afternoon \u2014 DSA & LeetCode review","advDsa":[],"advLc":[],"milestone":null,"isSunday":false,"theory":["Spring \u2014 IoC container & dependency injection","Spring \u2014 beans & lifecycle","Spring vs Spring Boot \u2014 what auto-config solves"],"jobFocus":"Follow up on applications","expected":{"auto":0,"dsa":90,"spring":120,"job":60},"weekStart":"2026-08-31"},{"id":47,"date":"2026-09-06","dow":"Sun","month":"Sep","day":6,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 Consolidate Spring notes so far","secondTask":"[DSA] Afternoon \u2014 Two-month review & September plan","advDsa":[],"advLc":[],"milestone":null,"isSunday":true,"theory":["Spring Boot \u2014 auto-configuration & starters","Spring Boot \u2014 building REST controllers","Spring Data JPA \u2014 repositories & queries"],"jobFocus":"Follow up on applications","expected":{"auto":0,"dsa":90,"spring":120,"job":60},"weekStart":"2026-08-31"},{"id":48,"date":"2026-09-07","dow":"Mon","month":"Sep","day":7,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S3 \u2014 Advance Java (finish)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",3]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-09-07"},{"id":49,"date":"2026-09-08","dow":"Tue","month":"Sep","day":8,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S4 \u2014 Maven","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",4]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-09-07"},{"id":50,"date":"2026-09-09","dow":"Wed","month":"Sep","day":9,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S5 \u2014 JDBC","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",5]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-09-07"},{"id":51,"date":"2026-09-10","dow":"Thu","month":"Sep","day":10,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S6 \u2014 Hibernate (ORM basics)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",6]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-09-07"},{"id":52,"date":"2026-09-11","dow":"Fri","month":"Sep","day":11,"type":"weekday","phase":"SPRING","mainTask":"[SPRING] Spring S7 \u2014 Spring getting started (IoC/DI)","secondTask":"[DSA] 1 LeetCode problem \u2014 keep the streak going","adv":[["sp",7]],"expected":{"auto":0,"dsa":30,"spring":60,"job":0},"weekStart":"2026-09-07"},{"id":53,"date":"2026-09-12","dow":"Sat","month":"Sep","day":12,"type":"weekend","phase":"DSA","mainTask":"[DSA] Morning \u2014 Buffer / catch-up  +  September kickoff (DSA S13 Sorting)","secondTask":"[DSA] Afternoon \u2014 LeetCode: catch-up","advDsa":[13],"advLc":[],"milestone":"SEPT_KICKOFF","isSunday":false,"theory":["DSA \u2014 recursion & backtracking patterns","DSA \u2014 hashing & frequency maps","DSA \u2014 dynamic programming intro"],"jobFocus":"Draft September plan","expected":{"auto":30,"dsa":180,"spring":0,"job":60},"weekStart":"2026-09-07"}];
  const byDate = Object.fromEntries(SCHEDULE.map(d => [d.date, d]));
  const START = SCHEDULE[0].date, END = SCHEDULE[SCHEDULE.length-1].date;
  const TOTALS = {pw:15, ai:13, sp:27, dsa:17, lc:13};
  const CAT = {auto:"var(--amber)", dsa:"var(--violet)", spring:"var(--lime)", job:"var(--marker)"};
  const GOOD = "var(--lime)";

  /* -------------------------------------------------------- injected styles */
  function ensureStyles() {
    if ($("#rw-style")) return;
    const css = `
    #view-runway .rw-wrap{max-width:1080px;margin:0 auto}
    .rw-subnav{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:16px}
    .rw-sb{background:transparent;color:var(--mute);border:1px solid #26262F;border-radius:999px;
      padding:8px 15px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;
      text-transform:uppercase;cursor:pointer;transition:.15s}
    .rw-sb:hover{color:var(--paper);border-color:#3A3A46}
    .rw-sb.on{color:var(--canvas);background:var(--lime);border-color:var(--lime);font-weight:700}
    .rw-streak{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--amber);
      border:1px solid #4a3a12;background:rgba(255,176,32,.08);border-radius:999px;padding:7px 13px;font-weight:700}

    .rw-runway{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin-bottom:16px}
    .rw-rtop{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:12px}
    .rw-rtop h2{font-family:'Anton',sans-serif;text-transform:uppercase;letter-spacing:.05em;font-size:16px;color:var(--lime)}
    .rw-rtop .sub{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--mute)}
    .rw-rtop .pct{margin-left:auto;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:15px;color:var(--paper)}
    .rw-spine{display:flex;gap:3px;overflow-x:auto;padding:2px 0 9px;scrollbar-width:thin}
    .rw-spine::-webkit-scrollbar{height:5px}.rw-spine::-webkit-scrollbar-thumb{background:var(--line2);border-radius:3px}
    .rw-pip{flex:0 0 auto;width:15px;height:28px;border-radius:4px;background:#1b1b22;border:1px solid #24242d;
      cursor:pointer;transition:transform .1s;position:relative}
    .rw-pip:hover{transform:translateY(-2px)}
    .rw-pip.wknd{background:#1e1930;border-color:#2b2440}
    .rw-pip.full{background:var(--lime);border-color:var(--lime)}
    .rw-pip.part{background:linear-gradient(to top,var(--lime) var(--h,50%),#1b1b22 0)}
    .rw-pip.part.wknd{background:linear-gradient(to top,var(--lime) var(--h,50%),#1e1930 0)}
    .rw-pip.today{border-color:var(--amber);box-shadow:0 0 0 2px rgba(255,176,32,.25)}
    .rw-pip.sel{outline:2px solid var(--paper);outline-offset:1px}
    .rw-legend{display:flex;gap:14px;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--mute)}
    .rw-legend span{display:inline-flex;align-items:center;gap:5px}
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
    .rw-chip.mile{color:var(--canvas);background:var(--amber);border-color:var(--amber);font-weight:700}
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
      border:solid var(--canvas);border-width:0 2px 2px 0;transform:rotate(45deg)}
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
    .rw-miles li.hit .rw-mbox:after{content:"";position:absolute;left:4px;top:0;width:4px;height:8px;border:solid var(--canvas);border-width:0 2px 2px 0;transform:rotate(45deg)}
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
    @media(min-width:760px){.rw-two{grid-template-columns:1fr 1fr}.rw-tgrid{grid-template-columns:repeat(4,1fr)}}
    @media(max-width:560px){.rw-tiles{grid-template-columns:repeat(2,1fr)}.rw-kv{grid-template-columns:repeat(2,1fr)}.rw-tgrid{grid-template-columns:1fr}}
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
  const rt = () => { const n = new Date(); return n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0"); };
  const clamp = iso => iso < START ? START : iso > END ? END : (byDate[iso] ? iso : START);
  const today = clamp(rt());
  let view = "today", selected = today, rollMode = "week";

  /* ------------------------------------------------------------- helpers */
  function itemsFor(day) {
    if (day.type === "weekday") return [
      {id:"main", label:day.mainTask, main:true, cat:day.phase==="SPRING"?"spring":"auto"},
      {id:"lc", label:day.secondTask, cat:"dsa"},
      {id:"notes", label:"Jotted key takeaways into notes"},
      {id:"explain", label:"Explained today's topic in 2 sentences"},
      {id:"review", label:"Reviewed yesterday briefly"},
      {id:"tracker", label:"Updated progress"},
    ];
    const t = day.theory;
    const a = [
      {id:"dsa", label:day.mainTask, main:true, cat:"dsa"},
      {id:"lc", label:day.secondTask, cat:"dsa"},
      {id:"notes", label:"Jotted key takeaways into notes"},
      {id:"t0", label:"Interview prep — "+t[0], cat:"job"},
      {id:"t1", label:"Interview prep — "+t[1], cat:"job"},
      {id:"t2", label:"Interview prep — "+t[2], cat:"job"},
      {id:"resume", label:"Updated / tailored resume", cat:"job"},
      {id:"linkedin", label:"Updated LinkedIn profile", cat:"job"},
      {id:"apply", label:"Applied to roles — "+day.jobFocus, cat:"job"},
      {id:"followup", label:"Followed up on applications", cat:"job"},
    ];
    if (day.isSunday) a.push({id:"reflect", label:"Weekly reflection written"});
    return a;
  }
  function comp(iso) { const d=byDate[iso]; if(!d) return 0; const it=itemsFor(d), dn=peek(iso).done;
    return it.length ? it.filter(i=>dn[i.id]).length/it.length : 0; }

  function rollup(list) {
    const pw=new Set(),ai=new Set(),dsa=new Set(),lc=new Set(),sp=new Set();
    const time={auto:0,dsa:0,spring:0,job:0}, exp={auto:0,dsa:0,spring:0,job:0};
    let problems=0, applied=0, cSum=0;
    list.forEach(day => {
      const st=peek(day.date), dn=st.done||{}, tm=st.tmin||{};
      exp.auto+=day.expected.auto; exp.dsa+=day.expected.dsa; exp.spring+=day.expected.spring; exp.job+=day.expected.job;
      time.auto+=(+tm.auto||0); time.dsa+=(+tm.dsa||0); time.spring+=(+tm.spring||0); time.job+=(+tm.job||0);
      cSum+=comp(day.date);
      if (day.type==="weekday") {
        if (dn.main && day.adv) day.adv.forEach(([k,n]) => ({pw,ai,sp})[k].add(n));
        problems += (st.problems!=null ? (+st.problems||0) : (dn.lc?1:0));
      } else {
        if (dn.dsa) (day.advDsa||[]).forEach(n=>dsa.add(n));
        if (dn.lc)  (day.advLc||[]).forEach(x=>lc.add(x));
        problems += (st.problems!=null ? (+st.problems||0) : (dn.lc?3:0));
        applied += (+st.applied||0);
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
  function spineHTML() {
    const doneN = SCHEDULE.filter(d=>comp(d.date)>=0.999).length;
    const idx = SCHEDULE.findIndex(d=>d.date===today)+1;
    let pips="";
    SCHEDULE.forEach(day => {
      const c=comp(day.date), fill=c>=0.999?"full":(c>0?"part":"");
      pips += `<div class="rw-pip ${day.type==="weekend"?"wknd":""} ${fill} ${day.date===today?"today":""} ${day.date===selected?"sel":""}"
        style="${fill==="part"?"--h:"+Math.round(c*100)+"%":""}" data-goto="${day.date}"
        title="Day ${day.id} · ${day.dow} ${day.month} ${day.day} · ${Math.round(c*100)}%"></div>`;
    });
    return `<div class="rw-runway">
      <div class="rw-rtop"><h2>The runway</h2>
        <span class="sub">Day ${idx} of ${SCHEDULE.length} · ${doneN} complete</span>
        <span class="pct">${Math.round(doneN/SCHEDULE.length*100)}%</span></div>
      <div class="rw-spine">${pips}</div>
      <div class="rw-legend">
        <span><i class="rw-dot" style="background:var(--lime)"></i>done</span>
        <span><i class="rw-dot" style="background:#1b1b22;border:1px solid #24242d"></i>weekday</span>
        <span><i class="rw-dot" style="background:#1e1930"></i>weekend</span>
        <span><i class="rw-dot" style="border:1px solid var(--amber)"></i>today</span></div></div>`;
  }

  function todayHTML() {
    const day=byDate[selected], st=peek(selected), c=comp(selected);
    const di=SCHEDULE.findIndex(d=>d.date===selected);
    const rel = selected===today?"Today":(selected<today?"Past · review":"Upcoming");
    let chips=`<span class="rw-chip ${day.phase==="SPRING"?"spring":(day.type==="weekend"?"dsa":"auto")}">${
      day.type==="weekend"?"Weekend · DSA focus":(day.phase==="SPRING"?"Weekday · Spring Boot":"Weekday · Automation")}</span>`;
    chips += `<span class="rw-chip">${day.type==="weekend"?"~4h + 1h job hunt":"~1.5h evening"}</span>`;
    if (day.milestone==="AUG_TARGET") chips+=`<span class="rw-chip mile">✦ August target</span>`;
    if (day.milestone==="SEPT_KICKOFF") chips+=`<span class="rw-chip mile">✦ September kickoff</span>`;

    const items=itemsFor(day);
    let tasks="";
    items.forEach(it => {
      tasks += `<li class="${it.main?"main":""} ${st.done[it.id]?"on":""}" data-tog="${it.id}">
        <span class="rw-flag" style="${it.cat?"background:"+CAT[it.cat]:""}"></span>
        <span class="rw-box"></span><span class="rw-tl">${esc(it.label)}</span></li>`;
    });

    const cats=[["auto","Automation"],["dsa","DSA / LeetCode"],["spring","Spring Boot"],["job","Job hunt"]];
    let tcells="";
    cats.forEach(([k,lab]) => {
      const val=st.tmin[k]!=null?st.tmin[k]:"", e=day.expected[k], act=+val||0, p=e?Math.min(1,act/e):(act>0?1:0);
      tcells += `<div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:${CAT[k]}"></span>${lab}</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="5" placeholder="0" value="${val}" data-time="${k}"/>
          <span class="exp">/ ${e}m</span></div>
        <div class="rw-tbar"><i style="width:${Math.round(p*100)}%;background:${CAT[k]}"></i></div></div>`;
    });
    const isW=day.type==="weekend";
    const numrow=`<div class="rw-numrow">
      <div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:var(--violet)"></span>LeetCode problems</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="1" placeholder="${isW?"0":"1"}" value="${st.problems!=null?st.problems:""}" data-num="problems"/>
        <span class="exp">target ${isW?"3–5":"1"}</span></div></div>
      ${isW?`<div class="rw-tcell"><div class="lab"><span class="rw-dot" style="background:var(--marker)"></span>Roles applied</div>
        <div class="row"><input class="rw-in" type="number" min="0" step="1" placeholder="0" value="${st.applied||""}" data-num="applied"/>
        <span class="exp">${esc(day.jobFocus)}</span></div></div>`:""}</div>`;

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
            <div class="rw-subtask">${isW?esc(stripTag(day.secondTask)):"+ 1 LeetCode problem to keep the streak"}</div></div></div>
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
        <span class="p">${Math.round(ru.avgComp*100)}% · ${fmtH(ru.time.auto+ru.time.dsa+ru.time.spring+ru.time.job)} logged</span></div>`;
      list.forEach(day => {
        const c=comp(day.date), col=day.type==="weekend"?"var(--violet)":(day.phase==="SPRING"?"var(--lime)":"var(--amber)");
        out += `<button class="rw-row ${day.date===today?"today":""}" data-goto="${day.date}" data-open="1">
          <div class="dd"><div class="dn">${day.day}</div><div class="dw">${day.month} · ${day.dow}</div></div>
          <div class="bd"><div class="t">${esc(stripTag(day.mainTask))}</div>
            <div class="s">${day.type==="weekend"?esc(stripTag(day.secondTask)):"1 LeetCode · "+day.phase.toLowerCase()}</div></div>
          <div class="rw-mini">${ring(c,34,4,c>=0.999?GOOD:col)}<span class="mv" style="color:var(--paper)">${Math.round(c*100)}</span></div></button>`;
      });
      out += `</div>`;
    });
    return out;
  }

  const CATS4=[["auto","Automation","var(--amber)"],["dsa","DSA/LC","var(--violet)"],["spring","Spring","var(--lime)"],["job","Job","var(--marker)"]];
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
      <div class="c"><div class="k">Hours</div><div class="v">${fmtH(ru.time.auto+ru.time.dsa+ru.time.spring+ru.time.job)}</div></div>
      <div class="c"><div class="k">Problems</div><div class="v">${ru.problems}</div></div>
      <div class="c"><div class="k">Applied</div><div class="v">${ru.applied}</div></div></div>`;
  }
  const mk=(hit,t)=>`<li class="${hit?"hit":""}"><span class="rw-mbox"></span><span>${t}</span></li>`;
  function fortMiles(gi) {
    const ends=["2026-08-04","2026-08-18","2026-09-01","2026-09-12"], c=cumTo(ends[gi]);
    const firstWknd=SCHEDULE.find(d=>d.type==="weekend").date;
    if (gi===0) return mk(c.pw.size>=8,"Playwright S1–8+ done (through API testing)")+mk(c.dsa.size>=5,"DSA S1–5 done (Big-O → Stack)")
      +mk(c.lc.size>=4,"LeetCode ch. 1–4")+mk(c.problems>=15,"15+ LeetCode problems ("+c.problems+")")
      +mk((peek(firstWknd).done||{}).resume||false,"Resume refreshed & LinkedIn updated");
    if (gi===1) return mk(c.pw.size>=15,"Playwright course finished (S1–15)")+mk(c.ai.size>=5,"AI Automation S1–5 started")
      +mk(c.dsa.size>=10,"DSA S6–10 done (Queue → AVL)")+mk(c.lc.size>=7,"LeetCode ch. 5–7")
      +mk(c.applied>=5,"First 5 applications sent ("+c.applied+")");
    if (gi===2) return mk(c.ai.size>=13,"AI Automation finished → automation complete")+mk(c.dsa.size>=12,"DSA target: S11–12 done (Trie → Searching)")
      +mk(c.lc.has("Binary Search"),"LeetCode through Binary Search ✦ Aug target")+mk(c.problems>=45,"Daily LeetCode habit locked ("+c.problems+")")
      +mk(c.sp.size>=2,"Spring course started");
    return mk(c.dsa.size>=12,"DSA S1–12 fully revised")+mk(c.sp.size>=7,"Spring S1–7 done (Core Java → Spring getting started)")
      +mk(c.applied>=12,"12+ applications total ("+c.applied+")")+mk(c.problems>=60,"September plan drafted ("+c.problems+" problems)");
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
    else { const F=[["Fortnight 1","Jul 22 – Aug 4","2026-07-22","2026-08-04"],["Fortnight 2","Aug 5 – Aug 18","2026-08-05","2026-08-18"],
      ["Fortnight 3","Aug 19 – Sep 1","2026-08-19","2026-09-01"],["Fortnight 4","Sep 2 – Sep 12","2026-09-02","2026-09-12"]];
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
          <div class="rr"><div class="big">${fmtH(ru.time.auto+ru.time.dsa+ru.time.spring+ru.time.job)}</div><div class="sm">${ru.problems} problems</div></div>
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
    const tot=all.time.auto+all.time.dsa+all.time.spring+all.time.job, etot=td.exp.auto+td.exp.dsa+td.exp.spring+td.exp.job;
    return `<div class="rw-call"><div class="ic">${met?"🎯":"✦"}</div>
        <div class="tx"><b>August target</b> — DSA through Section 12 (Searching) & LeetCode through Binary Search by Aug 31.</div>
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
      if (!activeNote) { const sp=root.querySelector(".rw-spine .sel"); if(sp) sp.scrollIntoView({inline:"center",block:"nearest"}); }
      if (activeNote && activeSel) { const n=root.querySelector(activeSel);
        if(n){ n.focus({preventScroll:true}); try{ if(caret!=null) n.setSelectionRange(caret,caret); }catch(e){} } }
    }
  }

  function wire(root) {
    root.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{ view=b.dataset.v; render(); });
    root.querySelectorAll("[data-seg] [data-r]").forEach(b=>b.onclick=()=>{ rollMode=b.dataset.r; render(); });
    root.querySelectorAll("[data-goto]").forEach(b=>b.onclick=()=>{ selected=b.dataset.goto;
      if (b.dataset.open){ view="today"; window.scrollTo({top:0,behavior:"smooth"}); } render(); });
    root.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{ const i=SCHEDULE.findIndex(d=>d.date===selected)+(+b.dataset.nav);
      if(i>=0&&i<SCHEDULE.length){ selected=SCHEDULE[i].date; render(); } });
    const jump=root.querySelector("[data-jump]"); if(jump) jump.onclick=()=>{ selected=today; render(); };

    root.querySelectorAll("[data-tog]").forEach(li=>li.onclick=()=>{ const r=rec(selected); const id=li.dataset.tog;
      r.done[id]=!r.done[id]; syncNow(r, `trackhawk: study ${r.done[id]?"✓":"✗"} ${selected} ${id}`); render(); });

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
