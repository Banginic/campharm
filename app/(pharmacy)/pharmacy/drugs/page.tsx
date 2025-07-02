import React from 'react'
import { DrugCard } from '@/pharmacy-components/index'
import { drugs } from '@/constants/drugs'

function Drug() {
  return (
    <section>
      <h1 className='text-lg font-bold lg:text-3xl text-center'>Drugs</h1>
      <DrugCard drug={drugs[0]} />
    </section>
  )
}

export default Drug
