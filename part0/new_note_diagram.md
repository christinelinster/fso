# 0.4: New Note Diagram

```mermaid
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: POST: https://fullstack-exampleapp.herokuapp.com/new_note
    Server->>Client: 302 Redirect, Location: /exampleapp/notes
    Client-->>Server: GET: https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Client: HTML document
    Client->>Server: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Client: CSS file
    Client-->>Server: GET: https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Client: JavaScript file
    Client->>Server: https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Client: JSON data
```