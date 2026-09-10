---
name: start-working-on-new-ticket
description: Use when start working a new ticket
version: 1.0.0
license: MIT
---
We use JIRA for this project

If the ticket is already assigned to someone else other than me, confirm me if I really want this ticket.
If the ticket is unassigned, assign it to me.

Move the ticket to "In Progress". If it is already In Progress or further along, leave the status alone.

If the ticket title does not contain the word "hotfix", create the branch from `develop`. 
If the ticket title contains the word "hotfix", ask me where I would like to create the branch from.
Match "hotfix" regardless of case.

Name the branch the way JIRA's "Create branch" suggestion does: `<TICKET-KEY>-<ticket title>`,
keeping the original capitalisation, turning each space into a hyphen, dropping every character
that is not a letter, a digit or a hyphen, then collapsing repeated hyphens and trimming any
leading or trailing hyphen.

Create the branch from the remote tip, not a stale local copy.

Check out the branch. 

Ask me if I want to work on it right away.