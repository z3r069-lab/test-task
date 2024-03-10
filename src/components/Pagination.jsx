import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers = [];
  
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  

  if (pageNumbers.length > 10){
    return (
      <nav>
  <ul className='list-none flex flex-row flex-wrap items-center justify-center text-xl gap-3'>
    {pageNumbers.slice(0, 3).map(number => (
      <li key={number} className='h-10 w-10 border-0 outline-none shadow-md rounded-full '>
        <a onClick={() => paginate(number)}  className='w-full h-full flex items-center justify-center text-black no-underline'>
          {number}
        </a>
      </li>
    ))}
    <li>
      <input type="text" onKeyDown={(e) => e.key === 'Enter' && paginate(e.target.value)} className='h-10 outline-none shadow-sm rounded-full border-0' placeholder='Go to page...'/>
    </li>
    {pageNumbers.slice(-3).map(number => (
      <li key={number} className='h-10 w-10 border-0 outline-none shadow-md rounded-full '>
        <a onClick={() => paginate(number)}  className='w-full h-full flex items-center justify-center text-black no-underline'>
          {number}
        </a>
      </li>
    ))}
  </ul>
</nav>
    )
  }


  return (
    <nav>
      <ul className='list-none flex flex-row flex-wrap items-center justify-center text-xl gap-3'>
        {pageNumbers.map(number => (
          <li key={number} className='h-10 w-10 border-0 outline-none shadow-md rounded-full '>
            <a onClick={() => paginate(number)}  className='w-full h-full flex items-center justify-center text-black no-underline'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination