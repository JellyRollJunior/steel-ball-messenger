# steel-ball-messenger

### Endpoints

| METHOD | URI                     | Function                       | Body                  | Notes                |
| ------ | ----------------------- | ------------------------------ | --------------------- | -------------------- |
| POST   | /login                  | Login user                     | { username, password} |                      |
| GET    | /users                  | Retrieve all user              | token                 |                      |
| POST   | /users                  | Create user                    | { username, password} | creates user profile |
| PATCH  | /users                  | Update user profile            | { bio }               |                      |
| GET    | /users/:userId/profiles | Retrieve user profile          | { userId }            |                      |
| GET    | /chats                  | Retrieve all chats for user    | token                 |                      |
| POST   | /chats                  | Create chat between >= 1 users | token, { users }      | chat: { id, users}   |
| GET    | /chats/:chatId          | Retrive chat messages          | token                 |                      |
| POST   | /chats/:chatId/messages | Create chat message            | token, { content }    |                      |

## TODOS - backend

-   queries
    -   return chats by ID or some order that makes sense
-   backend: implement get self profile

## TODOS - frontend

-   profiles
    -   edit own profile
-   user context
    -   refetch user data if user is null (context) (new get user function)

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
