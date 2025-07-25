
## Challenge

- Implement server-side pagination
    - create GET endpoint
        - /incidents
        - Add pagination logic
            - optional query params: page=&limit=
- Render incidents in a table 
    - Call /incidents endpoint to fetch data
    - Add a table view in React app (I used AI assistant to make it look great) 

## Install dependencies
```
npm install
```

## Run backend server
```
npm run dev
```

## Run frontend app
```
npm run dev
```

## API Usage examples
- GET /incidents - Returns first 10 incidents (default)
- GET /incidents?page=2&limit=5 - Returns 5 incidents from page 2
- GET /incidents?limit=20 - Returns first 20 incidents
- GET /incidents?page=3 - Returns 10 incidents from page 3


## Possible Future Improvements
- Add cache. Since data may not change as often, we can add cache:
    - React level (SWR or REact Query Caching)
    - HTTP (set headers from Express)
    - Endpoint cache using node-cache
- Access Controls
    - IP whitelisting, 
    - session management
- UI
    - Sortable columns 
    - Export to CSV


## UI screenshot
<img width="1310" height="868" alt="Screenshot 2025-07-15 at 2 04 03 PM" src="https://github.com/user-attachments/assets/d27e677e-962c-4aaf-a9e1-4160a6aabda5" />
