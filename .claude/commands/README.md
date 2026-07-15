# Project Slash Commands

These commands are available in any Claude Code session opened in this folder.

---

## `/ucs-status`

**What it does:** Reads the project state and prints a quick re-orientation — confirmed decisions, current phase, and open questions still needing input.

**When to use:** At the start of a new session, or after a break, to get Claude up to speed without re-explaining everything.

```
/ucs-status
```

---

## `/ucs-log <new information>`

**What it does:** Records a new decision or answer. Updates both `CLAUDE.md` and the memory file automatically — moves answered questions out of the open list and into the decisions table.

**When to use:** Any time you have an answer to one of the open questions, or a new decision has been made.

```
/ucs-log ThingsBoard approach: option C (subdomain) then B (REST API)
/ucs-log AWS: using existing prod account, IAM role already set up
/ucs-log ROI formula: annual saving = (throughput × error% × price) + (downtime × loss_rate) - subscription
/ucs-log YouTube channel: https://youtube.com/@unifiedcloudsensors
/ucs-log M500: UCS reference installation, open data, no privacy constraint
```

---

## How it works

Both commands read from and write to:
- `CLAUDE.md` — the project brief, auto-loaded every session
- `.claude/projects/.../memory/project_ucs_web.md` — persistent memory across sessions

You never need to re-explain the project from scratch. Start a session, run `/ucs-status`, and Claude is immediately current.
