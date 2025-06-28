import React from 'react'
import { Logo, Navlinks, User } from '@/components/index'

function PublicNavbar() {
  return (
    <nav className='h-[13dvh] flex items-center'>
      <div className='flex items-center justify-around w-full'>
        <Logo/>
        <Navlinks />
        <User />
      </div>
    </nav>
  )
}

export default PublicNavbar
