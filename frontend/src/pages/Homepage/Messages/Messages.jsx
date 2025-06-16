import { useState } from 'react';
import { useMessages } from '../../../hooks/useMessages.js';
import { makeRequest } from '../../../utils/requests.js';
import { getUrl } from '../../../utils/serverUrl.js';

const Messages = ({ chatId, setUserProfileId }) => {
  const { messages, isLoading, error, refetch: refetchMessages } = useMessages(chatId);
  const [content, setContent] = useState('');

  const createChat = async (event) => {
    event.preventDefault();
    // goto login page if no token
    const token = localStorage.getItem('token');
    try {
      await makeRequest(getUrl(`/chats/${chatId}/messages`), {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      refetchMessages();
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
                <button onClick={() => setUserProfileId(message.sender.id)}>
                  {message.sender.id} {message.sender.username}
                </button>
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
