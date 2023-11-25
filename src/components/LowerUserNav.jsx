import React from 'react'
import menu from '../assets/home-icon.svg'
import chat from '../assets/chat-icon.svg'
import profile from '../assets/avatar-anisha.png'

export default function LowerUserNav() {
  return (
    <div className='flex flex-row justify-around items-center p-2 fixed bottom-0 left-0 w-full  bg-black'>
      <img src={menu} alt="" />
      <img src={chat} alt="" />
      <img src={profile} alt="" className='h-10'/>
    </div>
  )
}
