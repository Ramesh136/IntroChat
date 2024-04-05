import React, { useContext, useState } from 'react'
import { db } from '../firebase'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { AuthContext } from '../context/authContext'
import { ChatContext } from '../context/chatContext'

const Search = () => {

  const [userInput , setUserInput] = useState("")
  const [suser , setsUser] = useState(null)
  const [error , setError] =useState(false)

  const user = useContext(AuthContext)
  const {dispatch} =useContext(ChatContext)

  const handleSelect = async ()=>{
    const combinedId =
      user.uid > suser.uid
        ? user.uid + suser.uid
        : suser.uid + user.uid
    
    try {
      
      const res = await getDoc(doc(db, "chats", combinedId));
      

      if (!res.exists()) {
        //create a chat in chats collection
         
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        try{
          const resp  = await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: suser.uid,
            displayName: suser.displayName,
            photoURL: suser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),  
        }
        );
      
      }
        catch(err){
          console.log(err)
        }
        
        await updateDoc(doc(db, "userChats", suser.uid), {

          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      else{
        dispatch({ type: "CHANGE_USER", payload: suser });
      }
    } catch (err) {
      console.log(err)
    }
    
    setsUser(null);
    setUserInput("");

  }
  

  const fetchUser = async ()=>{
   
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userInput)
    );

    try {
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.size===1){
        
        querySnapshot.forEach((doc) => {
          setsUser(doc.data());
         
        });
      }
      else{
        setsUser(null);
        
      }
       
        

    } catch (err) {
      console.log(err)
      setError(true);
    }
    setError(false)
  }

  const searchHandler = (e)=>{
    e.code === "Enter" && fetchUser()
  }

  return (
    <div className="search">
      <div>
        <input type="text" placeholder="find user" value={userInput} onKeyDown={searchHandler} onChange={(e)=>setUserInput(e.target.value)}/>
      </div>
      {error && <span>Couldnt find user</span>}
      {suser && <div className="userChat" onClick={handleSelect}>
        <img src={suser?.photoURL}/>
        <div className="userChatInfo">
          <span>{suser?.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Search