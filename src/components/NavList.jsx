import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../firebase';
import { AuthContext } from '../context/authContext';

const NavList = () => {
  const user = useContext(AuthContext)
  console.log(user)
  return (
    <div className="navBar">
      <span className="logo">Intro-Chat</span>
      <div className="user">
        <img src={user?.photoURL} />
        <span>{user?.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}

export default NavList