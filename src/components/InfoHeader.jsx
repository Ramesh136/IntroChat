import React, { useContext } from 'react'
import Cam from "../images/cam.png"
import Add from "../images/add.png"
import More from "../images/more.png"
import { ChatContext } from '../context/chatContext'

const InfoHeader = () => {

  const {data} = useContext(ChatContext)
  console.log(data)
  return (
    <div className="chatheader">
      <div className="user">
        <img src={data.user.photoURL} />
        <span>{data.user.displayName}</span>
      </div>

      <div className="icons">
        <img src={Cam} />
        <img src={Add} />
        <img src={More} />
      </div>
    </div>
  );
}

export default InfoHeader