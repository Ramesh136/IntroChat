import React, { useState } from 'react'
import Add from "../images/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth ,db,storage} from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const [error , setError] = useState(false)
  const navigate = useNavigate()

  const registerHandler = async (e)=>{
    e.preventDefault()
    console.log(e)
    const displayName = e.target[0].value
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, displayName );

      await uploadBytesResumable(storageRef, avatar).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setError(true);
            // setLoading(false);
          }
        });
      });
    
    }
    catch(err){
      console.log(err);
      setError(true)
    }

  }
  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Intro-Chat</span>
          <span className="title">Register</span>
          <form onSubmit={registerHandler}>
            <input type="text" placeholder="display name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input  style={{ display: "none" }} type="file" id="file" />
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span className='file'>Add an avatar</span>
            </label>

            <button >Sign up</button>
            {error && <span>Something Went wrong</span>}
          </form>
          <p>
            You do have an account?<Link to="/login">Sign in</Link> 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register