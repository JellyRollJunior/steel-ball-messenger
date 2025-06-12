import { useState } from 'react';
import { useMessages } from '../../../hooks/useMessages.js';

const Messages = ({ chatId }) => {
  const { messages, isLoading, error } = useMessages(chatId);
  const [content, setContent] = useState('');

  const createChat = async () => {};

  if (!chatId) {
    return <h2>Messages</h2>;
  }

  return (
    <section>
      <h2>Messages</h2>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>loading chats</h2>}
      {messages && (
        <>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <div>{message.content}</div>
                <div>
                  {message.sender.id} {message.sender.username}
                </div>
                <div>{message.sendTime}</div>
              </li>
            ))}
          </ul>
          <form onSubmit={createChat}>
            <input
              type="text"
              name='content'
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
            />
            <button>send</button>
          </form>
        </>
      )}
    </section>
  );
};

export { Messages };
