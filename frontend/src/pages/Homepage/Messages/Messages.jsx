import { useMessages } from '../../../hooks/useMessages.js';

const Messages = ({ chatId }) => {
  const { messages, isLoading, error } = useMessages(chatId);

  if (!chatId) {
    return <h2>Messages</h2>;
  }

  return (
    <section>
      <h2>Messages</h2>
      {error && <h2>{error}</h2>}
      {isLoading && <h2>loading chats</h2>}
      {messages && (
        <ul>
          {messages.map((message) => (
            <li>
              <div>{message.content}</div>
              <div>{message.senderId}</div>
              <div>{message.sendTime}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { Messages };
