```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server->>Client: Updated JSON data
```