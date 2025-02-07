import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './index.css';
const Sidebar = ({ setCurrentChat }) => {
    const chats = JSON.parse(localStorage.getItem('chats')) || [];

const handleChatClick = (chatItem) => {
    const selectedChat = chats.find(chat => chat.id === chatItem.id);
    setCurrentChat(selectedChat);
  };

  const handleNewChat = () => {
    var id=Date.now();
    const newChat = { id: id,name:'Chats'+id, messages: [] };
    const updatedChats = [...chats, newChat];
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    setCurrentChat(newChat);
  };

  return (
    
    <div className="w-[260px]  h-full bg-gray-800 text-white p-4 bg-[#171717]">
       
      <h2 className="text-2xl mb-4">Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="cursor-pointer hover:bg-gray-600 p-2 rounded"
            onClick={() => handleChatClick(chat)}
          >
            {chat.name}
          </li>
        ))}
      </ul>
      <button
        onClick={handleNewChat}
        className="w-full bg-blue-500 text-white py-2 mt-4 rounded flex items-center justify-center"
      >
        <FaPlus className="mr-2" />
        New Chat
      </button>
    </div>
  );
};

export default Sidebar;
