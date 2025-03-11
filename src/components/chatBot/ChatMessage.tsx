import ChatbotIcon from "./ChatBotIcon";

const ChatMessage = ({ chat }: any) => {
  return (
    !chat.hideInChat && (
      <div
        className={`message ${chat.role === "model" ? "bot" : "user"}-message ${
          chat.isError ? "error" : ""
        }`}
      >
        {chat.role === "model" && (
          <div className="flex items-center justify-center rounded-full bg-[#13534B] h-10 w w-10">
            <ChatbotIcon />
          </div>
        )}
        <p className="message-text">{chat.text}</p>
      </div>
    )
  );
};
export default ChatMessage;
