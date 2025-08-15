import React from 'react'
import { PrivateNavbar, PublicNavbar } from './index'
import News from './News'

function Header() {
  return (
    <div >
      <News />
       <PublicNavbar />
    </div>
  )
}

export default Header
