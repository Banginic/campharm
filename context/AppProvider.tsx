'use client';
import React, { useState } from 'react'
import AppContext from './AppContext'

function AppProvider( { children }: { children: React.ReactNode }) {
 const [ lang, setLang ] = useState<'en' | 'fr'>('en')

    const values = {
        lang, setLang
    }
  return (
    <AppContext value= { values}>
      { children }
    </AppContext>
  )
}

export default AppProvider
