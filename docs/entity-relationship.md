```mermaid
erDiagram

TICKET {
    id SERIAL PK
    name VARCHAR(255)
    description TEXT
    start_time TIMESTAMP
    end_time TIMESTAMP
    location VARCHAR(255)
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

```
