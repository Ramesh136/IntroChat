import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/chatContext';

const ChatLists = () => {

  const curUser = useContext(AuthContext)
  const [chats , setChats] = useState([])

  const {dispatch}  = useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", curUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    curUser.uid && getChats();
  }, [curUser.uid]);

  const handleSelect = (user)=>{
    dispatch({ type: "CHANGE_USER", payload: user });
  }


  return (
    <>
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img src={chat[1]?.userInfo?.photoURL} />
                <div className="userChatInfo">
                  <span>{chat[1]?.userInfo?.displayName}</span>
                  <p>{chat[1]?.lastMessage?.text}</p>
                </div>
              </div>
            );
          })}
    </>
  );
}

export default ChatLists