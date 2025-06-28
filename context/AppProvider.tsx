'use client';
import React, { useState } from 'react'
import AppContext from './AppContext'

function AppProvider( { children }: { children: React.ReactNode }) {
 const [ lang, setLang ] = useState<'en' | 'fr'>('en') 
 const [ isSidebarOpen, setSidebar ] = useState(false)
 
  function toggleSidebar() {
    setSidebar((prev) => !prev);
  }

    const values = {
        lang, setLang,
        isSidebarOpen, toggleSidebar,
    }
  return (
    <AppContext value= { values}>
      { children }
    </AppContext>
  )
}

export default AppProvider
