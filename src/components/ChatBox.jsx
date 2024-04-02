import React, { useContext } from 'react'
import Messages from './Messages';
import ChatInput from './ChatInput';
import InfoHeader from './InfoHeader';
import { ChatContext } from '../context/chatContext';

const ChatBox = () => {

  const {data} = useContext(ChatContext)
  console.log(data)

  if(data.chatId==="null")
    return <div className='chatBox'></div>
  return (
    <div className="chatBox">
      
      <InfoHeader />
      <Messages />
      <ChatInput />
    </div>
  );
}

export default ChatBox