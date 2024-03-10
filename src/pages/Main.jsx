
import React, { useEffect, useState } from 'react';
import GetHash from '../helpers/GetHash';
import { FilterIds } from '../helpers/JsUtils';
import Card from '../components/Card';
import Filter from '../components/Filter';
import DefaultCardHolder from '../components/DefaultCardHolder';
import FilteredCardHolder from '../components/FilteredCardHolder';
import Pagination from '../components/Pagination';

const Main = () => {
  
  const [records, setRecords] = useState([]);
  // const [results, setResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);


  useEffect(() => {

    const hash = GetHash();
    const url = 'https://api.valantis.store:41000/'
    let Action_data = {
      "action": "get_ids"
    }
    
    fetch(url, {
      method: "POST", 
      body: JSON.stringify(Action_data), 
      headers: {
        "Content-Type": "application/json",
        "X-Auth": `${hash}`
      },
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data.result)
      data = FilterIds(data)
      Action_data = {
        "action": "get_items",
        "params": {"ids": data}
      }
      return fetch(url, {
        method: "POST", 
        body: JSON.stringify(Action_data), 
        headers: {
          "Content-Type": "application/json",
          "X-Auth": `${hash}`
        },
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.result)
      setRecords(data.result)})
    .catch(err => console.log(err))
  }, [])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);



  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <section className='w-screen h-full'>
      <div>
        <Filter setResults={setRecords} setIsFiltered={setIsFiltered} results={records}/> 
        
      </div>
      {isFiltered ? <FilteredCardHolder results={currentPosts}/> 
      : <DefaultCardHolder records={currentPosts}/>
      }
      <Pagination postsPerPage={postsPerPage} totalPosts={records.length} paginate={paginate}/>
      </section>
    </>
  )
}

export default Main