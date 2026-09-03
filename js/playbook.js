/* =============================================================================
 * TrackHawk · Playbook module
 * -----------------------------------------------------------------------------
 * Self-contained. Injects its own scoped styles (all classes prefixed `thpb-`).
 * Connects to the rest of TrackHawk through FOUR injected hooks so this file
 * never has to guess at your vault or Kanban internals:
 *
 *   Playbook.init({
 *     mount,            // (required) DOM element the tab renders into
 *     loadState,        // () => vault.playbook  | returns saved state or undefined
 *     saveState,        // (state) => {...}       | persist + trigger your vault save
 *     getWeeklyApps,    // () => number           | apps logged in Kanban last 7 days
 *     addRunwayTask     // (title, dateISO) => {} | write a task into Study Runway
 *   });
 *
 * Every hook is optional. Missing ones degrade gracefully:
 *   - no loadState/saveState  -> state kept in memory for the session only
 *   - no getWeeklyApps        -> volume axis becomes a manual +/- stepper
 *   - no addRunwayTask        -> "Add to Runway" buttons are hidden
 *
 * State shape (store this at vault.playbook):
 *   { done: { s1:true, ... },        // one-time setup completions, keyed by id
 *     last: { c1:1690000000000 },    // cadence habits: last-done epoch ms, keyed by id
 *     volManual: 3 }                 // fallback weekly-apps count when no Kanban hook
 *
 * IMPORTANT (schema discipline): move IDs below are STABLE. Reword a title/detail
 * freely, but never change or reindex an id, or you orphan saved state.
 * ========================================================================== */
(function (global) {
  'use strict';

  var DAY = 86400000;

  /* ---- content: cadence habits (reset on interval) --------------------- */
  var CADENCE = [
    { id: 'c1', ch: 'Naukri', t: 'Reset profile freshness', every: 4, runway: true,
      d: "A tiny edit resets Naukri's freshness timer. Time it to Sunday eve / Monday morning \u2014 recruiter search peaks Mon\u2013Wed." },
    { id: 'c2', ch: 'LinkedIn', t: 'Post one technical note', every: 7, runway: true,
      d: "A short build log or DSA insight keeps you in-feed and reads as an engineer. Weekly posters get reached far more by recruiters." },
    { id: 'c3', ch: 'GitHub', t: 'Keep the contribution graph active', every: 3, runway: false,
      d: "Small real commits during build weeks signal a working engineer. A dead graph undercuts the \u201cI ship\u201d claim." },
    { id: 'c4', ch: 'Insights', t: 'Review funnel & conversion by source', every: 7, runway: true,
      d: "Which channel actually converts for <b>you</b>? A weekly look tells you where to spend next week's applications." },
    { id: 'c5', ch: 'Timing', t: 'Clear the 24\u201348h application queue', every: 2, runway: true,
      d: "Apply within 24\u201348h of a posting \u2014 recruiters review earliest applicants first. Don't let fresh postings go stale." }
  ];

  /* ---- content: one-time setup (check once, stays done) ----------------- */
  var SETUP = [
    { id: 's1', ch: 'Resume', t: 'Positioning line at the top',
      d: "\u201cSoftware Engineer \u00b7 3 yrs Java automation & services.\u201d Java + target role above the fold, not buried." },
    { id: 's2', ch: 'Resume', t: 'Reframe QA bullets as engineering',
      d: "\u201cDesigned a Java framework (POM, TestNG), cut flaky rate 40%\u201d \u2014 an engineer who tests, not a tester." },
    { id: 's3', ch: 'Resume', t: 'One page, ATS-plain formatting',
      d: "Single column, no tables/graphics, standard headers. Name the file <b>Ripudaman_JavaSDET.pdf</b> \u2014 recruiters search filenames." },
    { id: 's4', ch: 'LinkedIn', t: 'Fix first two lines of About',
      d: "Only ~2 lines preview before \u201csee more.\u201d Lead with target role + stack." },
    { id: 's5', ch: 'LinkedIn', t: 'Open to Work \u2014 recruiters only',
      d: "Feeds LinkedIn Recruiter searches without the public banner your employer can see." },
    { id: 's6', ch: 'GitHub', t: 'Pin repos with real READMEs + live links',
      d: "README: one-line what/why, stack, screenshots, live link. Ship the Spring Boot rewrite as the centrepiece." },
    { id: 's7', ch: 'GitHub', t: 'GitHub link in the resume header',
      d: "Not the footer. For a QA\u2192dev pivot, one deployed project outweighs a year of test bullets." },
    { id: 's8', ch: 'Naukri', t: 'Completeness > 85% + realistic salary',
      d: "Under 70% gets deprioritised; an unrealistic ask filters you out. Set a real range, negotiate after the offer." },
    { id: 's9', ch: 'Referrals', t: 'Referral-ask template ready',
      d: "Two lines: the role, why you fit, resume attached. A referred app often skips the ATS \u2014 highest-conversion channel there is." },
    { id: 's10', ch: 'Interview', t: '90-second pivot story ready',
      d: "\u201cI've built Java automation 3 yrs; I want to own the services, not just test them.\u201d Confident, no apology." }
  ];

  var VOL_TARGET = 5; // weekly application target the volume axis measures against

  /* ---- hooks + state --------------------------------------------------- */
  var H = {};                 // injected hooks
  var mount = null;
  var state = { done: {}, last: {}, volManual: 0 };

  function persist() { if (H.saveState) { try { H.saveState(state); } catch (e) { /* host handles */ } } }

  function loadOrSeed() {
    var loaded;
    if (H.loadState) { try { loaded = H.loadState(); } catch (e) {} }
    state = normalise(loaded);
  }

  // Normalise any prior/partial vault state against the current schema.
  function normalise(s) {
    s = (s && typeof s === 'object') ? s : {};
    var out = { done: {}, last: {}, volManual: 0 };
    if (s.done && typeof s.done === 'object') out.done = s.done;
    if (s.last && typeof s.last === 'object') out.last = s.last;
    if (typeof s.volManual === 'number') out.volManual = s.volManual;
    // Seed lastDone for any cadence habit that has never been marked, so a
    // brand-new user starts "due now" rather than crashing on undefined.
    CADENCE.forEach(function (c) {
      if (typeof out.last[c.id] !== 'number') out.last[c.id] = 0;
    });
    return out;
  }

  function weeklyApps() {
    if (H.getWeeklyApps) { try { return H.getWeeklyApps() | 0; } catch (e) {} }
    return state.volManual | 0;
  }

  /* ---- cadence status -------------------------------------------------- */
  function cadStatus(c) {
    var last = state.last[c.id] || 0;
    // last===0 means never done -> treat as due now
    var due = last === 0 ? Date.now() : last + c.every * DAY;
    var diff = Math.ceil((due - Date.now()) / DAY);
    if (last === 0) return { cls: 'red', card: 'overdue', txt: 'Do first' };
    if (diff < 0)  return { cls: 'red', card: 'overdue', txt: 'Overdue \u00b7 ' + (-diff) + 'd' };
    if (diff <= 1) return { cls: 'amber', card: 'due', txt: diff === 0 ? 'Due today' : 'Due in 1d' };
    return { cls: 'green', card: '', txt: 'On track \u00b7 ' + diff + 'd' };
  }

  /* ---- render ---------------------------------------------------------- */
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#14101B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function esc(s){ return String(s).replace(/[&<>"]/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m];}); }

  function render() {
    if (!mount) return;
    var hasVolHook = !!H.getWeeklyApps;
    var v = weeklyApps();

    var sDone = SETUP.filter(function (s) { return state.done[s.id]; }).length;
    var hGreen = CADENCE.filter(function (c) { return cadStatus(c).cls === 'green'; }).length;
    var hOver  = CADENCE.filter(function (c) { return cadStatus(c).cls === 'red'; }).length;
    var sig = Math.round((sDone / SETUP.length * 0.6 + hGreen / CADENCE.length * 0.4) * 100);
    var sigState = sig === 0 ? 'Noise floor' : sig < 30 ? 'Breaking through' : sig < 60 ? 'Getting seen' : sig < 90 ? 'Signal strong' : 'Signal locked \u2726';

    var html = '';

    /* signal panel */
    html += '<div class="thpb-panel">'
      + '<div class="thpb-ptop"><div class="thpb-state">' + sigState + '</div>'
      + '<div class="thpb-read"><b>' + sig + '%</b> profile signal</div></div>'
      + '<div class="thpb-track"><div class="thpb-fill" style="width:' + sig + '%"></div><div class="thpb-segs"></div></div>'
      + '<div class="thpb-axes">'
      +   '<div class="thpb-axis"><div class="thpb-k">Set up once</div><div class="thpb-v">' + sDone + ' / ' + SETUP.length + '</div></div>'
      +   '<div class="thpb-axis' + (hOver > 0 ? ' thpb-warn' : '') + '"><div class="thpb-k">Habits on track</div><div class="thpb-v">' + (CADENCE.length - hOver) + ' / ' + CADENCE.length + '</div></div>'
      +   '<div class="thpb-axis' + (v < VOL_TARGET ? ' thpb-warn' : '') + '"><div class="thpb-k">Apps this week</div><div class="thpb-v">' + v + ' / ' + VOL_TARGET
      +      (hasVolHook ? '' : '<span class="thpb-vol"><button data-vol="-1" aria-label="one fewer">\u2212</button><button data-vol="1" aria-label="one more">+</button></span>')
      +      '</div></div></div>'
      + '</div>';

    /* nag */
    var bits = [];
    if (hOver > 0) bits.push('<b>' + hOver + '</b> habit' + (hOver > 1 ? 's' : '') + ' due');
    var short = Math.max(0, VOL_TARGET - v);
    if (short > 0) bits.push('<b>' + short + '</b> more app' + (short > 1 ? 's' : '') + ' to hit this week');
    if (bits.length) html += '<div class="thpb-nag"><span class="thpb-badge">Do now</span><span>' + bits.join(' \u00b7 ') + '</span></div>';

    /* cadence */
    html += '<div class="thpb-glabel">Keep doing \u00b7 cadence habits</div>'
      + '<div class="thpb-gsub">These reset on a schedule. Green = on track, amber = due, red = overdue.</div>';
    CADENCE.forEach(function (c) {
      var st = cadStatus(c);
      var showRunway = st.card !== '' && c.runway && H.addRunwayTask;
      html += '<div class="thpb-card ' + st.card + '">'
        + '<span class="thpb-box thpb-mark" role="button" tabindex="0" data-mark="' + c.id + '" aria-label="Mark ' + esc(c.t) + ' done"></span>'
        + '<div><div class="thpb-head"><span class="thpb-title">' + esc(c.t) + '</span>'
        +   '<span class="thpb-chip thpb-ch">' + esc(c.ch) + '</span>'
        +   '<span class="thpb-chip thpb-every">every ' + c.every + 'd</span></div>'
        + '<div class="thpb-detail">' + c.d + '</div>'
        + '<div class="thpb-foot"><span class="thpb-status ' + st.cls + '">' + st.txt + '</span>'
        +   '<button class="thpb-btn thpb-mark" data-mark="' + c.id + '">Mark done</button>'
        +   (showRunway ? '<button class="thpb-btn thpb-ghost" data-runway="' + c.id + '">\uFF0B Add to Runway</button>' : '')
        + '</div></div></div>';
    });

    /* setup */
    html += '<div class="thpb-glabel">Set up once \u00b7 foundations</div>'
      + '<div class="thpb-gsub">Check these off as you finish them \u2014 they stay done.</div>';
    SETUP.forEach(function (s) {
      var done = !!state.done[s.id];
      html += '<div class="thpb-card' + (done ? ' done' : '') + '">'
        + '<span class="thpb-box thpb-toggle" role="checkbox" tabindex="0" aria-checked="' + done + '" data-toggle="' + s.id + '">' + CHECK + '</span>'
        + '<div><div class="thpb-head"><span class="thpb-title">' + esc(s.t) + '</span>'
        +   '<span class="thpb-chip thpb-ch">' + esc(s.ch) + '</span></div>'
        + '<div class="thpb-detail">' + s.d + '</div></div></div>';
    });

    mount.innerHTML = html;
    wire();
  }

  function wire() {
    mount.querySelectorAll('[data-toggle]').forEach(function (b) {
      var fn = function () { var id = b.dataset.toggle; state.done[id] = !state.done[id]; persist(); render(); };
      b.onclick = fn;
      b.onkeydown = function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); fn(); } };
    });
    mount.querySelectorAll('[data-mark]').forEach(function (b) {
      var fn = function () { state.last[b.dataset.mark] = Date.now(); persist(); render(); };
      b.onclick = fn;
      if (b.classList.contains('thpb-box')) b.onkeydown = function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); fn(); } };
    });
    mount.querySelectorAll('[data-runway]').forEach(function (b) {
      b.onclick = function () {
        var c = CADENCE.filter(function (x) { return x.id === b.dataset.runway; })[0];
        if (c && H.addRunwayTask) {
          try { H.addRunwayTask(c.t, new Date().toISOString().slice(0, 10)); } catch (e) {}
        }
      };
    });
    mount.querySelectorAll('[data-vol]').forEach(function (b) {
      b.onclick = function () {
        state.volManual = Math.max(0, (state.volManual | 0) + parseInt(b.dataset.vol, 10));
        persist(); render();
      };
    });
  }

  /* ---- scoped styles (injected once) ----------------------------------- */
  function injectStyles() {
    if (document.getElementById('thpb-styles')) return;
    var css = ''
    + '.thpb-wrap{--thpb-signal:#E6A94E;--thpb-verified:#48C9A9;--thpb-danger:#E0705E;'
    +   '--thpb-surface:#1E1826;--thpb-hi:#261E30;--thpb-ink:#ECE6DE;--thpb-muted:#8B8296;--thpb-dim:#635A70;'
    +   '--thpb-line:rgba(230,169,78,.14);--thpb-soft:rgba(236,230,222,.08);color:var(--thpb-ink);'
    +   'font-family:Inter,system-ui,sans-serif;line-height:1.55}'
    + '.thpb-panel{background:var(--thpb-surface);border:1px solid var(--thpb-line);border-radius:14px;padding:20px 22px}'
    + '.thpb-ptop{display:flex;justify-content:space-between;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:14px}'
    + '.thpb-state{font-family:"Space Grotesk",Inter,sans-serif;font-weight:600;font-size:1.1rem}'
    + '.thpb-read{font-family:"Space Mono",monospace;font-size:13px;color:var(--thpb-muted)}.thpb-read b{color:var(--thpb-signal)}'
    + '.thpb-track{position:relative;height:18px;border-radius:5px;background:rgba(0,0,0,.28);overflow:hidden;border:1px solid var(--thpb-soft)}'
    + '.thpb-fill{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,#B67A2E,var(--thpb-signal));box-shadow:0 0 14px rgba(230,169,78,.5);transition:width .5s cubic-bezier(.4,0,.2,1)}'
    + '.thpb-segs{position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,transparent 0,transparent calc(5% - 2px),rgba(20,16,27,.9) calc(5% - 2px),rgba(20,16,27,.9) 5%);pointer-events:none}'
    + '.thpb-axes{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}'
    + '.thpb-axis{flex:1;min-width:150px;background:var(--thpb-hi);border:1px solid var(--thpb-soft);border-radius:10px;padding:12px 14px}'
    + '.thpb-k{font-family:"Space Mono",monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--thpb-dim)}'
    + '.thpb-v{font-family:"Space Grotesk",Inter,sans-serif;font-weight:600;font-size:1.25rem;margin-top:3px;display:flex;align-items:center;gap:8px}'
    + '.thpb-vol{display:inline-flex;gap:4px;margin-left:auto}'
    + '.thpb-vol button{width:26px;height:26px;border-radius:7px;border:1px solid var(--thpb-line);background:var(--thpb-surface);color:var(--thpb-ink);font-size:15px;cursor:pointer;line-height:1}'
    + '.thpb-vol button:hover{border-color:var(--thpb-signal)}'
    + '.thpb-axis.thpb-warn{border-color:var(--thpb-danger);background:rgba(224,112,94,.14)}.thpb-axis.thpb-warn .thpb-v{color:var(--thpb-danger)}'
    + '.thpb-nag{display:flex;gap:10px;align-items:center;background:rgba(224,112,94,.14);border:1px solid rgba(224,112,94,.3);border-radius:12px;padding:13px 16px;margin:20px 0 4px;font-size:.92rem}'
    + '.thpb-badge{font-family:"Space Mono",monospace;font-size:11px;font-weight:700;background:var(--thpb-danger);color:#1a0f0c;padding:3px 8px;border-radius:6px;text-transform:uppercase;letter-spacing:.06em}'
    + '.thpb-nag b{color:var(--thpb-ink)}'
    + '.thpb-glabel{font-family:"Space Mono",monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--thpb-dim);margin:32px 0 6px;display:flex;align-items:center;gap:12px}'
    + '.thpb-glabel::after{content:"";flex:1;height:1px;background:var(--thpb-soft)}'
    + '.thpb-gsub{color:var(--thpb-muted);font-size:.85rem;margin-bottom:14px}'
    + '.thpb-card{display:grid;grid-template-columns:auto 1fr;gap:15px;background:var(--thpb-surface);border:1px solid var(--thpb-soft);border-left:3px solid transparent;border-radius:14px;padding:16px 18px;margin-bottom:10px;transition:border-color .2s,background .2s}'
    + '.thpb-card:hover{background:var(--thpb-hi)}'
    + '.thpb-card.done{border-left-color:var(--thpb-verified);background:linear-gradient(90deg,rgba(72,201,169,.06),var(--thpb-surface) 42%)}'
    + '.thpb-card.overdue{border-left-color:var(--thpb-danger)}.thpb-card.due{border-left-color:var(--thpb-signal)}'
    + '.thpb-box{width:24px;height:24px;border-radius:7px;border:1.5px solid var(--thpb-dim);display:grid;place-items:center;margin-top:1px;cursor:pointer;flex-shrink:0;transition:all .2s;background:none}'
    + '.thpb-card.done .thpb-box{background:var(--thpb-verified);border-color:var(--thpb-verified)}'
    + '.thpb-box svg{width:14px;height:14px;opacity:0;transform:scale(.4);transition:all .2s}.thpb-card.done .thpb-box svg{opacity:1;transform:scale(1)}'
    + '.thpb-box:focus-visible{outline:2px solid var(--thpb-signal);outline-offset:2px}'
    + '.thpb-head{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:4px}'
    + '.thpb-title{font-family:"Space Grotesk",Inter,sans-serif;font-weight:600;font-size:1rem;letter-spacing:-.01em}'
    + '.thpb-card.done .thpb-title{color:var(--thpb-muted)}'
    + '.thpb-chip{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;padding:2px 7px;border-radius:5px;font-weight:700}'
    + '.thpb-ch{background:rgba(139,130,150,.14);color:var(--thpb-muted)}'
    + '.thpb-every{background:rgba(230,169,78,.16);color:var(--thpb-signal)}'
    + '.thpb-detail{color:var(--thpb-muted);font-size:.9rem}.thpb-detail b{color:var(--thpb-ink);font-weight:600}'
    + '.thpb-foot{display:flex;align-items:center;gap:10px;margin-top:11px;flex-wrap:wrap}'
    + '.thpb-status{font-family:"Space Mono",monospace;font-size:12px;font-weight:700;padding:4px 10px;border-radius:7px}'
    + '.thpb-status.green{background:rgba(72,201,169,.14);color:var(--thpb-verified)}'
    + '.thpb-status.amber{background:rgba(230,169,78,.16);color:var(--thpb-signal)}'
    + '.thpb-status.red{background:rgba(224,112,94,.14);color:var(--thpb-danger)}'
    + '.thpb-btn{font-family:"Space Mono",monospace;font-size:12px;padding:5px 12px;border-radius:7px;border:1px solid var(--thpb-line);background:var(--thpb-surface);color:var(--thpb-ink);cursor:pointer;transition:all .16s}'
    + '.thpb-btn:hover{border-color:var(--thpb-signal);color:var(--thpb-signal)}'
    + '.thpb-ghost{border-style:dashed;color:var(--thpb-muted)}'
    + '@media(prefers-reduced-motion:reduce){.thpb-wrap *{transition:none!important}}'
    + '@media(max-width:520px){.thpb-axis{min-width:100%}}';
    var el = document.createElement('style');
    el.id = 'thpb-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ---- public API ------------------------------------------------------ */
  var Playbook = {
    init: function (opts) {
      opts = opts || {};
      mount = opts.mount || null;
      if (mount && !mount.classList.contains('thpb-wrap')) mount.classList.add('thpb-wrap');
      H = {
        loadState: opts.loadState,
        saveState: opts.saveState,
        getWeeklyApps: opts.getWeeklyApps,
        addRunwayTask: opts.addRunwayTask
      };
      injectStyles();
      loadOrSeed();
      render();
      return Playbook;
    },
    // Call when the Playbook tab becomes visible, so cadence "due" states
    // recompute against the current date (they drift day-to-day).
    refresh: function () { loadOrSeed(); render(); },
    // Expose state for your vault save routine if you'd rather pull than push.
    getState: function () { return state; }
  };

  global.Playbook = Playbook;
})(window);
