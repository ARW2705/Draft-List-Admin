import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Button    from '../../../components/Common/Button/Button'
import DraftList from '../../../components/DraftComponents/DraftList/DraftList'
import DraftForm from '../../../components/DraftComponents/DraftForm/DraftForm'

import './Drafts.css'


function Drafts() {
  const navigate = useNavigate()

  return (
    <div className='route drafts-router'>
      <Routes>
        <Route
          path='/'
          element={
            <div className='drafts-container'>
              <Button
                customClass='new-draft-button'
                name='add-draft'
                text='Add New Draft'
                onClick={ () => navigate('form') }
              />
              <DraftList />
            </div>
          }
        />
        <Route path='/form' element={ <DraftForm /> } />
      </Routes>
    </div>
  )
}


export default Drafts
