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

-   messaging

    -   /messages
        -   POST /chats/:chatId/messages

-   queries
    -   return chats by ID or some order that makes sense

## TODOS - frontend



### TODO LATER

-   GET /chats -> implement get latest message
-   FIX: disallow creating chats that already exist (same users)
-   signup redirects to login
-   login redirects to index
-   index redirects to login if user not logged in
-   trigger refetch chats on new chat creation
-   messages -> only return senderId, content, and date 
    -   (dont need to send message id and chatId)
    -   orderby datetime