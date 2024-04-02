import React, { useContext, useState } from 'react'
import Attach from "../images/attach.png"
import Image from "../images/img.png"
import { AuthContext } from '../context/authContext'
import { ChatContext } from '../context/chatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'

const ChatInput = () => {

  const [text , setText] = useState("")
  const [img , setImg] = useState(null)

  const currentUser = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async()=>{
      console.log(img)
     if (img) {
       const storageRef = ref(storage, uuid());

       const uploadTask = uploadBytesResumable(storageRef, img);

       uploadTask.on(
         (error) => {
           //TODO:Handle Error
         },
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
             await updateDoc(doc(db, "chats", data.chatId), {
               messages: arrayUnion({
                 id: uuid(),
                 text,
                 senderId: currentUser.uid,
                 date: Timestamp.now(),
                 img: downloadURL,
               }),
             });
           });
         }
       );
     }
     else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  



  return (
    <div className="chatInput">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e)=>setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach}/>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => {
            console.log(e)
            setImg(e.target.files[0])}}
        />
        <label htmlFor="file" >
          <img src={Image}/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatInput