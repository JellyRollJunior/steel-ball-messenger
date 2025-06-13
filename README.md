# steel-ball-messenger

### Endpoints

| METHOD | URI    | Function                       | Body                  | Notes              |
| ------ | ------ | ------------------------------ | --------------------- | ------------------ |
| GET    | /users | Retrieve all user              | token                 |                    |
| POST   | /users | Create user                    | { username, password} |                    |
| POST   | /login | Login user                     | { username, password} |                    |
| GET    | /chats | Retrieve all chats for user    | token                 |                    |
| POST   | /chats | Create chat between >= 1 users | token, { users }      | chat: { id, users} |

## TODOS - backend

-   queries
    -   return chats by ID or some order that makes sense

## TODOS - frontend

-   profiles
    -   edit own profile
-   user context
    -   on login, save user data
    -   move usercontext to separate file
    -   

### TODO LATER

-   user avatar
-   GET /chats -> implement get latest message
-   FIX: disallow creating chats that already exist (same users)
-   signup redirects to login
-   login redirects to index
-   index redirects to login if user not logged in
-   error handling
    -   send message
        -   errors
        -   no token goto login
-   context for controlling homepage display logic
-   context for storing current user data on login
-   notifications context
-   refetch user data if user is null (context)