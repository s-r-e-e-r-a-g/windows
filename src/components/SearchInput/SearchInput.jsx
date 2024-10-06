import React from 'react'
import './searchInput.css'

const SearchInput = () => {
  return (
    <div className='searchInput'> 
        <span className="material-symbols-outlined">search</span>
        <input type='text' placeholder='Type here to search' className='inputBar' />
    </div>
  )
}

export default SearchInput
