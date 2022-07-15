import React from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'

import DraftList from '../../../components/DraftComponents/DraftList/DraftList'
import DraftForm from '../../../components/DraftComponents/DraftForm/DraftForm'
import Button    from '../../../components/Common/Button/Button'

import './Drafts.css'


function Drafts() {
  const location = useLocation()
  const navigate = useNavigate()
  const handleOnClick = event => {
    event.preventDefault()
    navigate(`${location.pathname}/form`)
  }

  return (
    <main className='route drafts-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='draft-container'>
              <Button
                text='Add New Draft'
                name='new-draft'
                onClick={ handleOnClick }
              />
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
