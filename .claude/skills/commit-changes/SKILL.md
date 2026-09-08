---
name: commit-changes
description: Use when the user asks to commit changes, stage files, or create a git commit in the repository.
version: 1.0.0
license: MIT
---

Run any pre-commit hook if available.

If there are unstaged changes, ask the user whether they want to commit them.

Write a commit message based on the staged changes.

Avoid overly verbose descriptions or unnecessary details.
Start with a short sentence in imperative form, no more than 50 characters long.
Then leave an empty line and continue with a more detailed explanation for the commit body.
Write only one sentence for the first part, and two or three sentences at most for the detailed explanation.
Keep the body to a single paragraph. Do not add a second paragraph for a further detail; leave it out.
Only describe what the commit actually changes. Do not mention behaviour that is the same as before.
Body's lines must not be longer than 100 characters.
Follow @commitlint/config-conventional
Do not use ```
Do not include "Co-Authored-By:"
Do not include "Claude-Session:"

Finally, ask the user to review the commit message. If the user is happy with it, commit the changes to the repository.
