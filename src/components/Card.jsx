import React from 'react'

const Card = (props) => {
  
  const id = props.id
  let name = props.name == "" ? "no brand" : props.name
  const price = props.price
  const brand = props.brand
  return (
    <div className='block w-64 rounded-lg p-6 text-surface outline-none shadow-md'>
      <h5 className=' mb-2 text-xl font-medium leading-tight'>{name}</h5>
      <div className='mb-4 text-base'>
        <p>price: {price}</p>
        <p>brand: {brand}</p>
        <p className='line-clamp-1'>id: {id}</p>
      </div>
    </div>
  )
}

export default Card
  