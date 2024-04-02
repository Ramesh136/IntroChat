import React, { useState } from 'react'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

  const [error , setError] = useState(false)
  const navigate = useNavigate()

  const signInHandler = async (e)=>{
    e.preventDefault()
    console.log(e)
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
     
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
          <span className="logo">Intro-chat</span>
          <span className="title">Log In</span>
          <form onSubmit={signInHandler}>
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>Sign in</button>
          </form>
          <p>
            You don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login