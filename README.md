# steel-ball-messenger

### Endpoints

| METHOD | URI                     | Function                       | Body                  | Notes                |
| ------ | ----------------------- | ------------------------------ | --------------------- | -------------------- |
| POST   | /login                  | Login user                     | { username, password} |                      |
| GET    | /current                | Get current user data          | token                 | id, username, bio    |
| PATCH  | /current                | Update user profile            | token, { bio }        |                      |
| GET    | /users                  | Retrieve all user              | token                 |                      |
| POST   | /users                  | Create user                    | { username, password} | creates user profile |
| GET    | /users/:userId/profiles | Retrieve user profile          |                       |                      |
| GET    | /chats                  | Retrieve all chats for user    | token                 |                      |
| POST   | /chats                  | Create chat between >= 1 users | token, { users }      | chat: { id, users}   |
| GET    | /chats/:chatId          | Retrive chat messages          | token                 |                      |
| POST   | /chats/:chatId/messages | Create chat message            | token, { content }    |                      |

## TODOS - backend

-   user avatar
-   refactor to ID validation?
-   FIX: disallow creating chats that already exist (same users)

## TODOS - frontend

-   always call get /current on homepage load

### TODO LATER

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
-   merge get current and chats (?)
-   getToken util that redirects to login if token expires