# TrackHawk

An encrypted job-hunt pipeline and a revision flashcard deck, in one installable app.
No server, no hosting bill. GitHub Pages serves the app; a private repo holds your data
as ciphertext. Your password never leaves the browser.

**Job Hunter** — Board · Insights · Library
**Flashcards** — decks → sections → cards, in the same deck design as your DSA set

---

## Before you start: pick a new password

The one you sent me is in a chat log now. It is also the only thing standing between your
salary expectations and anyone who gets your phone. Use a fresh one, 12+ characters, and
one you don't use anywhere else. **If you forget it, the data is gone** — there is no reset,
because there is no server holding a copy. That is the point.

The password is *not* in the code. You set it on first unlock, on each device.

---

## Setup — about 10 minutes, once

### 1. Two repos

| Repo | Visibility | Holds |
|---|---|---|
| `trackhawk` | **public** | the app (this folder). No secrets — safe to be public. |
| `trackhawk-data` | **private** | `trackhawk.enc.json` + `files/*.enc`. Created for you on first save. |

Push this folder to `trackhawk`. Create `trackhawk-data` empty, but **tick "Add a README"** so
the repo has a `main` branch to write to.

### 2. Turn on Pages

In `trackhawk` → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
A minute later you'll have `https://<you>.github.io/trackhawk/`.

### 3. Make a token

github.com/settings/tokens → **Fine-grained tokens** → Generate new token:

- Repository access: **Only select repositories** → `trackhawk-data`
- Permissions → Repository permissions → **Contents: Read and write**
- Expiry: 90 days or a year — you'll re-paste it when it lapses

Copy it. It's shown once.

### 4. Open the app and pair

Open the Pages URL. Choose **Sync via GitHub**, set your password, and enter your username,
`trackhawk-data`, and the token. That's the last time you touch the token on that device.

Repeat on your phone: same URL, same password, same token. Chrome menu → **Add to Home screen**
and it installs as a standalone app with its own icon.

There's also a **This device only** mode if you want to try it without GitHub. No sync, but
everything else works.

---

## How the security actually works

- Your password runs through **PBKDF2-SHA256, 310,000 rounds** to derive an **AES-256-GCM** key.
- Jobs, documents, flashcards, progress — all of it is encrypted into one envelope
  (`{salt, iv, ciphertext}`) before it is written to the repo. GitHub stores an opaque blob.
- Resume PDFs are encrypted separately into `files/<id>.enc`, so the main file stays small and
  fast. They're decrypted in the browser when you tap download.
- The **GitHub token is encrypted with the same password and kept in this device's localStorage.**
  It never goes into the repo. Steal the repo and you get ciphertext; steal the phone and you
  still need the password.
- The vault auto-locks after 30 minutes in the background, and on the Lock button.

**What this does not protect against:** malware on your own machine, or you typing the password
into a phishing page. It's a personal vault, not a bank.

---

## Sync

Save → pull → merge → push, then a poll every 10 seconds and a pull whenever the app regains
focus. Each record carries a timestamp, so if the phone and the laptop both changed *different*
things, both survive; if they changed the *same* record, the later edit wins. Nothing gets
clobbered wholesale.

The commit history in `trackhawk-data` is a free, permanent, diffable backup of your job hunt.
Settings → **Export JSON** if you ever want out.

---

## Job Hunter

**Board** — Wishlist → Applied → Screen → Interview → Offer → Rejected. Drag on desktop; on mobile
the columns collapse to one at a time with a stage picker, because dragging cards across six
horizontally-scrolling columns on a phone is a punishment.

Each job carries a **track** (Java Backend / Automation-SDET / …), a **stack** (one-tap chips for
Java, Spring Boot, Selenium, TestNG, REST Assured, Jenkins, Kafka, Docker…), CTC, source, resume
match %, next action, and notes.

**Insights** — response / interview / offer rates, funnel, applications per week, stage donut,
salary spread, **which technologies keep appearing in the roles you chase**, which channel actually
produces interviews, and a "needs a nudge" list of anything silent for 14+ days.

**Library** —
- *Documents*: ATS resume, designed resume, cover letters. PDFs are encrypted before upload.
- *Handy lines*: 13 seeded openers, salutations, proof paragraphs and closers, written for Java
  backend and automation/SDET roles. Tap to copy, then swap the `{placeholders}`.
- *Keyword check*: paste a JD against your ATS resume text. Stack terms (Selenium, Spring Boot,
  REST Assured, CI/CD…) are weighted heavier and outlined in the results, so you fix the ones
  that matter. Only add back what's actually true of you.

---

## Flashcards

Decks (DSA, Java Backend, Spring, System Design…) → sections inside each deck → cards. The study
UI is the deck you already have: flip, Know it / Again, shuffle, progress bar, section chips,
`Space` `←` `→` `K` `R`.

**Getting notes into the deck — the .html route (what you'll actually use):**

Send me your Notability PDF or screenshots in chat. I hand you back a **flashcard .html file**.
Then: Flashcards → **↑ Upload flashcards (.html)** → pick the file (or just drag it onto the deck). TrackHawk reads the cards straight
out of it and asks you two things:

- **Which deck** — an existing one, or type a name to spin up a new one.
- **Sections** — keep the topics the file already carries (they become chips automatically), or
  collapse everything into one section, new or existing.

If the file has your **handwritten scans** embedded, it finds those too and offers to import them.
They're encrypted like everything else, and each card that came from a page gets a
**"See the page ↗"** button on its back that decrypts the original scan and shows it full size —
the same source-viewer you had in the standalone deck.

Nothing else is needed: no API key, no billing, no Anthropic console.

*
and have the app do the conversion itself. It's optional and costs a few cents per run. The .html
route is free.)*

A JSON array still imports too — the toggle is under the file picker.

Card schema, if you're writing them by hand:

```json
{
  "section": "Sliding window",
  "q": "Longest subarray with sum ≤ k",
  "hint": "Grow right, shrink left",
  "idea": "Expand on the right; while the constraint <b>breaks</b>, shrink from the left.",
  "steps": ["Add nums[right] to curr", "While curr > k, subtract nums[left++]"],
  "code": "int left = 0, curr = 0, ans = 0;\n…",
  "time": "O(n)",
  "space": "O(1)",
  "extra": "Only valid when all numbers are non-negative",
  "added": false
}
```

---

## Cost

₹0. GitHub Pages is free for public repos; private repos are free; the API calls are free.
Nothing to pay for, ever. No API key, no billing, no server.
