import React, { useEffect, useState } from 'react'
import GetHash from '../helpers/GetHash';
import { FilterIds } from '../helpers/JsUtils';
import Selector from './Selector';


const Filter = ({setResults, setIsFiltered}) => {
  
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState(null);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 1000;

  if (selection == 'NO BRAND') {
    setSelection(null);
  }

  useEffect(() => {
    if(selection == null){
      fetchData('')
    }
    fetchDataBrands(selection)
    setIsFiltered(true);
  }, [selection])

  const createFetchData = (action, params) => {
    const url = 'https://api.valantis.store:41000/';
    const hash = GetHash();

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action,
        params,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': `${hash}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data = FilterIds(data);
        return fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            action: 'get_items',
            params: { ids: data },
          }),
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': `${hash}`,
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        setResults(data.result);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const fetchData = async (value) => {
    setLoading(true);
    setRetryCount(0);
    while (retryCount < maxRetries) {
      try {
        await createFetchData('filter', { product: value });
        break;
      } catch (error) {
        console.error('Error in fetchData:', error);
        setRetryCount(retryCount + 1);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
    setLoading(false);
  };

  const fetchDataBrands = async (value) => {
    setLoading(true);
    setRetryCount(0);
    while (retryCount < maxRetries) {
      try {
        await createFetchData('filter', { brand: value });
        break;
      } catch (error) {
        console.error('Error in fetchDataBrands:', error);
        setRetryCount(retryCount + 1);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
    setLoading(false);
  };

  const fetchDataPrice = async (value) => {
    setLoading(true);
    setRetryCount(0);
    while (retryCount < maxRetries) {
      try {
        await createFetchData('filter', { price: value });
        break;
      } catch (error) {
        console.error('Error in fetchDataPrice:', error);
        setRetryCount(retryCount + 1);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
    setLoading(false);
  };

  if (input === '' && selection === 'NO BRAND') {
    setIsFiltered(false);
  }

  if (input == '' && selection == 'NO BRAND') {
    setIsFiltered(false);
  }
  

  const handlePrice = (price) => {
    const value = parseFloat(price.replace(",", "."));
    console.log(value)
    fetchDataPrice(value)
  }

  return (
    <div className='flex flex-row items-center justify-center mb-3'>
      <div className='flex shadow rounded-full w-[50rem] h-14'>
        <input
          type='text'
          className='  w-[60%] border-r-[1px] border-0 outline-none rounded-l-full'
          placeholder='Search something'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            e.key === 'Enter' && fetchData(input) && setIsFiltered(true);
          }}
          value={input}
        />
        <input
          type='text'
          className='w-[25%] outline-none border-0 border-r-[1px] pl-3'
          placeholder='Price...'
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={(e) => {
            e.key === 'Enter' && handlePrice(price);
          }}
        />
        <Selector value={selection} setSelection={setSelection} />
      </div>
      {loading && <div className='absolute top-1/2 left-[50rem] text-5xl font-pixel'>Loading...</div>}
    </div>
  );
}

export default Filter

