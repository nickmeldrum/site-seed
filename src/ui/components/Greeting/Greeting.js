import React from 'react'

export default props => {
  const updateName = () => props.updateName('Ginger')

  return (
    <div>
      <p>hello {props.name}</p>
      <button onClick={updateName}>change name to Ginger</button>
    </div>
  )
}
