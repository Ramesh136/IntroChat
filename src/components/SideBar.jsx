import React from 'react'
import NavList from './NavList'
import Search from './Search'
import ChatLists from './ChatLists'

const SideBar = () => {
  return (
    <div className='sideBar'>
        <NavList />
        <Search />
        <ChatLists />
    </div>
  )
}

export default SideBar