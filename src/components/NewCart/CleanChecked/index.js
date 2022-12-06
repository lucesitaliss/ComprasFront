import React from 'react'
import './cleanChecked.css'

export default function CleanChecked() {
  
  const handleSumit = async (e) => {
    try{
      const resetChecked = await fetch(
        'http://www.localhost:4000/products/checked/reset',
        {
          method: 'PUT',
        },
      )
      window.location.reload()
    }catch(error){
      console.error()
    }
  }

  return (
    <div className='cleanChecked'>
      <button className="buttonClearChecked" onClick={handleSumit}>
        Clear
      </button>
    </div>
  )
}
