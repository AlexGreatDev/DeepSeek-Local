import { FaPaperPlane, FaStop } from 'react-icons/fa';
import { useState, useEffect} from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ModelDropdown from "./Model"; 
const  ChatBox = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [selectedModel, setSelectedModel] = useState("deepseek-r1:1.5b");

  useEffect(() => {
    if (currentChat) {
      setMessages(currentChat.messages);
    }
  }, [currentChat]);
  const sendMessage = async () => {
    if (isProcessing || !inputText) return;
    setIsProcessing(true);
   
    const userMessage = { text: inputText, sender: 'user' };
  
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      updateLocalStorage(updatedMessages);
      return updatedMessages;
    });
   const controller = new AbortController();
  setAbortController(controller); 

  const signal = controller.signal;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/DeepSeek/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText , model:selectedModel }),
        signal
      });
      setInputText('');
      if (!response.ok || !response.body) {
        throw new Error("Failed to fetch response");
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
  
      while (true) {
        if (signal.aborted) {
          console.log("Request aborted");
          break;
        }
        const { done, value } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        var models=JSON.parse(chunk);
        accumulatedText += models.response;
  
        const newText = accumulatedText;
  
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          var lastSender =updatedMessages[updatedMessages.length-1]?.sender;
          if (lastSender ===  "user") {
            updatedMessages.push({ text: newText, sender: "server" });
          } else {
            updatedMessages[updatedMessages.length-1] = { ...updatedMessages[updatedMessages.length-1], text: newText };
          }
  
          updateLocalStorage(updatedMessages);
          return updatedMessages;
        });
      }
    } catch (error) {
      alert("Ollama model not found.")
      console.error("Error streaming response:", error);
    }
  
    setInputText('');
    setIsProcessing(false);
  };
  
  const updateLocalStorage = (updatedMessages) => {
    const updatedChat = { ...currentChat, messages: updatedMessages };
    const chats = JSON.parse(localStorage.getItem('chats')) || [];
    const updatedChats = chats.map(chat =>
      chat.id === currentChat.id ? updatedChat : chat
    );
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  };
  const renderMessage = (msg) => {
   // 
    if (msg.text.includes('```')) {
      let splitMessage = msg.text.split('```');
      let messageContent = [];
      for (let i = 0; i < splitMessage.length; i++) {
        if (i % 2 === 0) {
          // Normal text, show it as paragraph
          const lines = splitMessage[i].split('\n');
          messageContent.push(
            <p key={`text-${i}`}>
              {lines.map((line, index) => (
                <>
                  {line}
                  {index < lines.length - 1 && <br />}
                </>
              ))}
            </p>
          );
        } else {
          messageContent.push(
            <SyntaxHighlighter key={i} language="javascript" style={solarizedlight}>
              {splitMessage[i]}
          </SyntaxHighlighter>
          );
        }
      }
      
      return <div>{messageContent}</div>;
    } else {
      return (
        <p>
          {msg.text.split('\n').map((line, index) => (
            <>
              {line}
              {index < msg.text.split('\n').length - 1 && <br />}
            </>
          ))}
        </p>
      );
    }
  };
  

const stopProcessing = () => {
  if (abortController) {
    abortController.abort(); 
  }
  setIsProcessing(false); 
};

  return (
    <div className="flex-1 flex flex-col p-4  items-center bg-[#f6f6f6]">
  <div className="absolute top-4 right-4">
        <ModelDropdown selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
      </div>
    {currentChat  ? (
        <>
       
    <div className="flex-grow overflow-y-auto items-center  mb-4 flex flex-col w-full  ">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg w-full mb-2 max-w-xl md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
          style={{wordWrap: "break-word" }}
        >
          
          <p>{msg.sender === 'user' ? 'User: ' : 'Server: '} {renderMessage(msg)}</p>
        </div>
        
      ))}
    </div>
    <div className="flex justify-center w-full max-w-xl md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
      <div className="w-full">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); 
              sendMessage();
            }
          }}
          className="w-full bg-gray-300 text-gray-800 placeholder-gray-500 outline-none rounded-lg py-3 px-4 h-32 resize-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="How can I help you?"
        />
        <div className="flex justify-end items-center mt-2">
          <button
            className="ml-2 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition"
            onClick={isProcessing ? stopProcessing : sendMessage}
           
          >
            {isProcessing ? <FaStop size={20} /> : <FaPaperPlane size={20} />}
          </button>
        </div>
      </div>
    </div>
    </>
) : (
        <p>Please select a chat or start a new one.</p>
      )}
  </div>
   
  );
}

export default ChatBox;
