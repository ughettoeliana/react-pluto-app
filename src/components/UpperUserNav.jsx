import React from 'react'
import profilePic from '../assets/avatar-anisha.png'
import notification from '../assets/notification-icon.svg'


export default function UpperNav() {
  return (
    <nav className='flex flex-row justify-between items-center p-2 mb-3'>
      <div className='flex flex-row items-center '>
        <img src={profilePic} alt="foto del usuario" className='h-12'/>
        <p className='px-2 mx-2'>Hola @user</p>
      </div>
      <div>
        <img src={notification}/>
      </div>
    </nav>
  )
}
