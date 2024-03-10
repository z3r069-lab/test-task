import GetHash from "./GetHash";

async function CallAPIForThings(data) {
  
  const hash = GetHash();
  
  const url = 'https://api.valantis.store:41000/'

  try {
    const response = await fetch(url, {
      method: "POST", 
      body: JSON.stringify(data), 
      headers: {
        "Content-Type": "application/json",
        "X-Auth": `${hash}`
      },
    });
    const json = await response.json();
    //console.log("Успех:", JSON.stringify(json));
    return json
  } catch (error) {
    //console.error("Ошибка:", error);
    return error
  }
}


async function CallAPIforBrands() {
  const data = {
    "action": "get_fields", 
    "params": {"field": "brand"}
  };
  var res = await CallAPIForThings(data)
  return res
}

async function CallAPIforItems(filteredArrayIds){
  const arrayOfIds = filteredArrayIds
  const chunkedArrayIds = []
  for (let i = 0; i < arrayOfIds.length; i += 100) {
    chunkedArrayIds.push(arrayOfIds.slice(i, i + 100))
  }

  var res = []

  for (const ids of chunkedArrayIds) {

    const data = {
      "action": "get_items",
      "params": {"ids": ids}
    };
    
    var chunkRes = await CallAPIForThings(data)
    res.push(chunkRes)  
  }
  console.log(res)
  return res;


}

async function CallAPIforIds() {
  const data = {
    "action": "get_ids", 
  };
  var res = await CallAPIForThings(data)
  return res
}

// async function CallAPIforFilter(filter, params) {
//   const FilterType = filter;
//   const data = {
//     "action": "filter",
//     "params": {`${FilterType}`:params} 
//   };

//   var res = await CallAPIForThings(data)
//   return res
// }


export  {CallAPIforIds, CallAPIforBrands , CallAPIforItems}