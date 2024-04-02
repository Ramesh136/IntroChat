import React from 'react'
import SideBar from '../components/SideBar'
import ChatBox from '../components/ChatBox'

const Home = () => {
  return (
    <div className="home">
      <div className="homeWrapper">
        <SideBar />
        <ChatBox />
      </div>
    </div>
  );
}

export default Home