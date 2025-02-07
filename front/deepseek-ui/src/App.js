import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBox from './ChatBox';
import './index.css';
const App = () => {
  const [currentChat, setCurrentChat] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar setCurrentChat={setCurrentChat} />
      <ChatBox currentChat={currentChat} />
    </div>
  );
};

export default App;
