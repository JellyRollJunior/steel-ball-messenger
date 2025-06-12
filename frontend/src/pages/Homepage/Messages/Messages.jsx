import { useState } from 'react';
import { useMessages } from '../../../hooks/useMessages.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const Messages = ({ chatId }) => {
  const { messages, isLoading, error } = useMessages(chatId);
  const [content, setContent] = useState('');

  const createChat = async (event) => {
    event.preventDefault();
    // goto login page if no token
    const token = localStorage.getItem('token');
    try {
      const message = await makeRequest(getUrl(`/chats/${chatId}/messages`), {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      // refetch messages
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

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
              name="content"
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
