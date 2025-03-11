import { Send } from "lucide-react";
import { useRef } from "react";
const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: any) => {
  const inputRef: any = useRef();
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory((history: any) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    setTimeout(() => {
      setChatHistory((history: any) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };
  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input
        ref={inputRef}
        placeholder="Message..."
        className="message-input"
        required
      />
      <button
        type="submit"
        id="send-message"
        className="material-symbols-rounded"
      >
        <Send />
      </button>
    </form>
  );
};
export default ChatForm;
