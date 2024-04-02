import React from 'react'
import Messages from './Messages';
import ChatInput from './ChatInput';
import InfoHeader from './InfoHeader';

const ChatBox = () => {
  return (
    <div className="chatBox">
      
      <InfoHeader />
      <Messages />
      <ChatInput />
    </div>
  );
}

export default ChatBox