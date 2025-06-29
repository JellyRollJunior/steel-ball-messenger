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

    -   using prisma connect to connect two models! neato

-   Frontend
    -   Font face font-weights (didn't know i could set those)

### Retrospective aka yapping

-   I tried implement backend and frontend at the same time again. I would make a basic UI after completing each backend feature (just enough to use the backend).
    -   pros:
        -   Actually using each backend route is useful because it shows what data to return and what is not needed
    -   cons:
        -   I really do not like creating an ugly UI (it hurts my soul)
        -   I tried incorporating some of the prototype into my final design. (BAD IDEA IT WAS NOT GOOD CODE CUZ IT WAS A PROTOTYPE)
    -   Takeaways: I will continue this process but treat the basic frontend as a prototype and delete it after backend is "complete"
-   getting confident using prisma select and include
-   Proud: custom "liquid glass" card stying
-   as always, color palette pulled from Araki's art

## TODOS - backend

-   user avatar
-   refactor to ID validation?
-   FIX: disallow creating chats that already exist (same users)
-   return chats by latest creation

## TODOS - frontend

-   chats
    -   search bar
-   new chats section
    -   style selected radio button
    -   search bar
-   profile
    -   logout
-   messages
    -   style messages
        -   send button feedback
    -   messages scroll to bottom

### TODO LATER

-   wrap homepage pages in a light opacity card (redesign)
-   desktop view
-   notifications context
    -   set errors in notifications!
    -   success notifications!
-   slide animations for page change?
-   redesign the homepage buttons. they dont fit the design
-   latest message not updated on returning to chat page (refetch all chats)

-   extra: allow selecting multiple users (group chats)
