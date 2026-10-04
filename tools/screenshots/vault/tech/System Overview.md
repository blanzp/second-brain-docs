---
title: System Overview
tags:
  - reference
  - diagrams
source: claude-code
---

# System Overview

How a note travels from an agent to your phone.

```plantuml
@startuml
actor You
participant "Claude" as C
participant "Unibrain" as U
database "Your GitHub repo" as G
You -> C : "save this to Unibrain"
C -> U : create_note
U -> G : commit, signed "claude"
G --> U : push webhook
U --> You : note in the app
@enduml
```

The same flow as a picture of the parts:

```mermaid
flowchart TD
  A[Claude] --> U[Unibrain]
  B[ChatGPT] --> U
  H[Your own agents] --> U
  U --> G[(Your GitHub repo)]
  U --> W[Web app]
```

Sync time is roughly $t = t_{push} + t_{webhook}$, about a second:

$$
t \approx 0.3\,\mathrm{s} + 0.7\,\mathrm{s}
$$
