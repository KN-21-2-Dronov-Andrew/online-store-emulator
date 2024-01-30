import React from 'react'

const Category = (props) => {
  return (
    <button onClick={() => props.clickHandler(props.data.name)}>{props.data.name}</button>
  )
}

export default Category