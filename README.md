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

### Learning Outcomes

-   Backend



-   Frontend


### Retrospective aka yapping

-   using prisma connect to connect two models! neato
-   getting confident using prisma select and include
-   Proud: custom "liquid glass" card stying
-   Font face font-weights (didn't know i could set those)
-   as always, color palette pulled from Araki's art




## TODOS - backend

-   user avatar
-   refactor to ID validation?
-   FIX: disallow creating chats that already exist (same users)

## TODOS - frontend

-   homepage
    -   chats
        -   cards on each chat
        -   search bar
        -   profile pictures
            -   chat cards
        -   cards on each title thingy? play around with it
-   extract icon button

### TODO LATER

-   desktop view
-   signup redirects to login
-   index redirects to login if user not logged in
-   error handling
    -   send message
        -   errors
        -   no token goto login
-   context for controlling homepage display logic
-   context for storing current user data on login
-   notifications context
    -   set errors in notifications!
-   merge get current and chats (?)
-   getToken util that redirects to login if token expires
-   slide animations for page change?