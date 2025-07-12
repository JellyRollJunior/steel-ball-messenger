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
    -   "Scroll" to newest message by using flex column-reverse and rendering messages in reverse order
    -   First time using CSS libraries (Motion)
        -   Motion is very fun and easy to use! I will use it for my future projects for sure

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
-   Learning to prioritize fixes. Critical first, non pertinent later
-   Make use of fixed for nav bars next time
    -   Maybe learn tailwind instead. I see a lot of other projects using it

## TODOS - backend

-   FIX: disallow creating chats that already exist (same users)

## TODOS - frontend

-   desktop view
    -   scroll bar styling
    -   messages 
        -   if no chat selected, display select a chat message

### TODO LATER

-   socket

-   bug: profile -> bio + username overflow
-   bug: login button should be disabled when logging in (also signup)
