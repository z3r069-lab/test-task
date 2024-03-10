import React, { useEffect, useState } from "react";
import { CallAPIforBrands } from "../helpers/CallAPI";
import { FilterBrands } from "../helpers/JsUtils";

const Selector = ({setSelection, selection}) => {
  const [brands, setBrands] = useState(null);
  
  useEffect(() => {
    CallAPIforBrands()
    .then(data => {
      data = FilterBrands(data)
      data.unshift('NO BRAND', null)
      setBrands(data)
    })
  }, [])

  

  return (
    <select 
    value={selection}
    onChange={e => {setSelection(e.target.value) ; 
      console.log(e.target.value)
    }} 
    className="outline-none shadow-sm rounded-r-full border-0 pl-4 hover:outline-none"
    
    style={{ appearance: "none", WebkitAppearance: "none", MozAppearance: "none" }}>
      {brands && brands.map((brand, index) => (
        <option key={index} value={brand}>{brand}</option>
      ))}
      
    </select>
    


  )
};

export default Selector;