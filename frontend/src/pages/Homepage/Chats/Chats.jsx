import { useChats } from '../../../hooks/useChats.jsx';

const Chats = () => {
  const { chats, loading, error } = useChats();
  console.log(chats);

  return (
    <>
    <h2>chats</h2>
    {chats && <ul>
      {chats.map((chat) => (
        <li>
          <div>{chat.id}</div>
          {chat.users.map((user) => (
            <div>{user.username}</div>
          ))}
        </li>
      ))}
      </ul>}
    </>

  )
};

export { Chats };
