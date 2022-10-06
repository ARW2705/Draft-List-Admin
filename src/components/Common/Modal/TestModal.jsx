import React from 'react'

function TestModal({ data, onDismiss }) {
  return (
    <>
      <h1>TEST: { data.text }</h1>
      <button onClick={ () => onDismiss({ data: 'some data' }) }>Done</button>
    </>
  )
}

export default TestModal
