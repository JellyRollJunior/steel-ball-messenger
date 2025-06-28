const Messages = ({ chatId, returnToChats }) => {

  return (
    <section>
      <h1>Messages! {chatId}</h1>
      <button onClick={returnToChats}>return</button>
    </section>
  )
};

export { Messages }