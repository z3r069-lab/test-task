function FilterBrands(InitialArray) {
  const originalArray = InitialArray.result;
  const filteredArrayWithoutNull = originalArray.filter(value => value !== null);
  const filteredArray = [...new Set(filteredArrayWithoutNull)];

  return filteredArray
}

function FilterIds(InitialArray){
  const originalArray = InitialArray.result;
  const filteredArray = [...new Set(originalArray)]

  return filteredArray
}
export {FilterBrands, FilterIds}