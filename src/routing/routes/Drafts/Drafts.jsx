import React from 'react'
import { Route, Routes } from 'react-router-dom'

import DraftList from '../../../components/DraftComponents/DraftList/DraftList'
import DraftForm from '../../../components/DraftComponents/DraftForm/DraftForm'

import './Drafts.css'


function Drafts() {
  return (
    <main className='route drafts-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='drafts-container'>
              <DraftList />
            </div>
          }
        />
        <Route path='/form' element={ <DraftForm /> } />
      </Routes>
    </main>
  )
}


export default Drafts
