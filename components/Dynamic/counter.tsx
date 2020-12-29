import React from 'react'
import { useState } from 'react'

const counter = ({ initialValue }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [clicks, setClicks] = useState(initialValue)

  return (
    <div style={{ margin: '10px 0 20px' }}>
      <p>Count: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>increase count</button>
      <button onClick={() => setClicks(clicks - 1)}>decrease count</button>
    </div>
  )
}

export default counter
