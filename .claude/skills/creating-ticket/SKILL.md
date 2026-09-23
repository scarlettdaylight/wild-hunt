---
name: creating-ticket
description: Use when the user asks to create, file or draft a JIRA ticket.
version: 1.0.0
license: MIT
---

We use JIRA for this project. The board is `wild-hunt.atlassian.net`, project key `WH`.

Ask which kind of ticket it is if it is not obvious from the request.

## Title

Prefix feature titles with their category in square brackets: `[Code]`, `[Design]`, `[AI]`.

Bugs take no prefix — the `Bug` work type already marks them on the board.

Write the title as the outcome, not the activity. "Collapse the sidebar on mobile", not "Sidebar work".

Keep it short. The title becomes the branch name and the PR title, and every character that is
not a letter, a digit or a hyphen is stripped when the branch is built.

## Feature tickets

Issue type `Story`. Use this description:

```markdown
## 📖 User Story

As a **<role>**,
I want **<capability>**,
so that **<why it matters>**.

## 📋 Acceptance Criteria

### AC1 - <short name>

**Given** <starting context>,
**When** <the user does this>,
**Then** <this is observable>.

## 🚫 Out of Scope

- <what a reader might assume is included, but isn't>

## 🔗 Context

- Design: <Figma link, or n/a>
- Depends on: <WH-00, or nothing>
- <constraint or decision worth knowing up front>
```

Add AC2, AC3 and so on as needed. Every criterion must be observable — if it cannot be checked
by looking at the running app, rewrite it.

Fill in Out of Scope with the thing a reader would reasonably assume is included. Leave the
section out entirely rather than writing "n/a".

## Bug tickets

Issue type `Bug`.

```markdown
## 🐞 Summary

<what is broken, in one sentence>

## 🌐 Environment

- Route: </dashboard>
- Viewport / device: <1200px desktop · iPhone 13 · …>
- Signed in: <yes / no>
- First seen: <commit, deploy or date>

## 🔁 Steps to Reproduce

1. <start from a known state — signed out, fresh page>
2. …
3. …

**Expected:** <what should happen>
**Actual:** <what happens instead>

## 📸 Evidence

<screenshot, console output or recording>
```

No acceptance criteria on a bug. Expected versus Actual already defines done.

## Filling the template

I supply the context; you fill the template from it. Draft it, show it to me, then create it
once I am happy. Skip the draft only if I tell you to just create it.

Ask for anything missing rather than inventing it. Never invent reproduction steps, an
environment, or an acceptance criterion I did not give you — an invented repro sends whoever
picks the ticket up chasing a bug that does not exist.

Leave a section out entirely rather than filling it with "n/a" or "TBC".

## After creating

Give me the ticket link.

Do not assign it or move it out of To Do unless I ask. Starting work on it is a separate step —
see the `start-working-on-new-ticket` skill.
