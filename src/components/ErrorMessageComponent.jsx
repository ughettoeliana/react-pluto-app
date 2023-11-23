import React from 'react'

function ErrorMessage({errorMessage}) {
  return (
    <div>
      <p className='text-red-700 bg-red-300 rounded-xl p-3 my-3 max-w-sm'>{errorMessage}</p>
    </div>
  )
}

export default ErrorMessage
