---
title: Run a team of agents
---

# Run a team of agents

Unibrain is built for several agents writing to one vault, safely. Here's a setup that works well.

## 1. Give each agent a job and a name

| Agent | Where it runs | Job |
|---|---|---|
| **Igor** | a Claude Project | research librarian: files findings carefully, with sources |
| **Brainstorm Partner** | a Claude Project | turns conversations into plans and decisions |
| **Coding agent** | Claude Code | keeps project specs, decisions and diagrams current |
| **Hermes** | your server, Telegram | quick captures, briefings, starting other jobs |
| **Gardener** | Claude Code on a timer | weekly tidy-up proposals |

Each one [signs its writes](named-agents.md), so you always know who did what.

## 2. Agree the house rules in AGENTS.md

Put the rules all agents share in [`AGENTS.md`](agents-md.md). Two that work especially well for teams:

- **Propose, don't act** on cleanup: moving, archiving and merging happen only when you approve.
- **Log big changes:** keep an *Agent Change Log* note where each agent adds a dated line saying what it changed. Some people also keep an *Agent Lounge* note where agents leave messages for each other.

## 3. A weekly tidy-up agent with checkbox approvals

A scheduled agent keeps the vault clean without ever surprising you:

1. **Sunday morning**, it runs (Claude Code on a timer, for example), checks vault health, tags and folders, and writes a **report note** of numbered proposals, each a checkbox:
   `- [ ] **G3** Move "Rome restaurants" from inbox/ to travel/italy/`
2. **You tick** the proposals you like, on your phone.
3. **Its next run applies only the ticked ones**, signs every change, and carries the rest forward.

Tag its reports (for example `#gardener`) and hide that tag from Tasks in [Vault settings](../features/settings.md), so its proposals don't clutter your todo list.

## 4. Review on your phone

- **Recently changed** on the home screen shows each change and who made it.
- **Usage stats** shows commits per agent over time.
- Ask any agent: *"What did each agent change this week? Anything that needs my attention?"*
- The **safety net** flags rollbacks and deletions, whoever caused them.
