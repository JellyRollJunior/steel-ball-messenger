# steel-ball-messenger

### Endpoints

| METHOD | URI    | Function                       | Body                  | Notes           |
| ------ | ------ | ------------------------------ | --------------------- | --------------- |
| POST   | /users | Create user                    | { username, password} |                 |
| POST   | /login | Login user                     | { username, password} |                 |
| POST   | /chats | Create chat between >= 1 users | token, { users }      | returns chat id |

## TODOS - backend

-   messaging

    -   db queries
        -   create message
    -   /messages
        -   POST

-   chat
    -   latest message

## TODOS - frontend

-   send message
