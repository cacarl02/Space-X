import React, { useState } from 'react'

function Search() {
    const [keywords, setKeywords] = useState('')
  return (
    <div className='w-full'>
        <div>
            <input
                className='px-4 py-2 w-full italic'
                type='text'
                placeholder='Enter keywords'
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search