'use client';
import React from 'react'
import AppContext from './AppContext'

function AppProvider( { children }: { children: React.ReactNode }) {

    const values = {
        // Define your context values here
    }
  return (
    <AppContext value= { values}>
      { children }
    </AppContext>
  )
}

export default AppProvider
