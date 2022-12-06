import React, { useState } from 'react'

export default function EditCategory(props) {
  const { id } = props
  const [input, setInput] = useState({
    id: '',
    category: '',
    state_id: '',
  })

  const handleChange = (e) => {
    const info = {
      id: id,
      category: e.target.value,
      state_id: 1,
    }

    setInput(info)
  }

  const handleSumit = async (id, category, state_id) => {
    const result = await fetch('http://www.localhost:4000/categories', {
      method: 'PUT',
      body: JSON.stringify(input),
    })
    alert('Update Category')
  }
  return (
    <div>
      <form onSubmit={handleSumit}>
        <input placeholder="Name" onChange={handleChange} />
        <input type="submit" value="Edit" />
      </form>
    </div>
  )
}
