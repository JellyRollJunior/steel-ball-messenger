# steel-ball-messenger

### Endpoints

| METHOD | URI    | Function                       | Body                  | Notes              |
| ------ | ------ | ------------------------------ | --------------------- | ------------------ |
| POST   | /users | Create user                    | { username, password} |                    |
| POST   | /login | Login user                     | { username, password} |                    |
| GET    | /chats | Retrieve all chats for user    | token                 | chat: { id, users} |
| POST   | /chats | Create chat between >= 1 users | token, { users }      | returns chat id    |

## TODOS - backend

-   chats

    -   GET /chats

-   messaging

    -   db queries
        -   create message
    -   /messages
        -   POST

-   chat
    -   latest message

## TODOS - frontend

-   creating component to show all chats

    -   retrieve all chats
    -   display them

-   creating a chat
    -   create button to show chat form
    -   creating chat form
        -   retrieve all users
    -   send post request with all users on form submit

### TODO LATER

-   FIX: disallow creating chats that already exist (same users)
-   signup redirects to login
-   login redirects to index
-   index redirects to login if user not logged in
