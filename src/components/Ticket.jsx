import React from 'react'
import ticket from '../assets/images/pattern-ticket.svg'
import github from '../assets/images/icon-github.svg'

const Ticket = ({title,profile,name,username}) => {
  return (
    <div className='relative max-w-sm sm:max-w-sm  md:max-w-lg ' >
      <img  src={ticket} alt="" />
      <img className='absolute top-5 left-5'  src={title} alt="" />
      <p className='font-inconsolata text-white absolute top-14 left-[70px]'>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} / Austin, TX</p>
      <p className='absolute text-gray-400 text-xl md:right-3 md:top-24 right-1 top-20 rotate-90'>#01609</p>
      <img className='absolute w-16 rounded-lg md:top-40 left-5 top-24' src={profile} alt="" />
      <p className='text-white font-inconsolata absolute bottom-11 left-24 font-bold text-lg'>{name}</p>
      <div className='absolute flex gap-1 bottom-7 left-[96px]'>
        <img className='w-3' src={github} alt="" />
      <p className='text-white font-inconsolata text-[12px]'>{username}</p>
      </div>
      
    </div>
  )
}

export default Ticket
