import Card from './Card'

const FilteredCardHolder = ({results}) => {
  return (
    <main className='flex flex-wrap gap-2 w-full mx-auto max-w-screen-lg items-stretch'>
        {results.map(({id, product, price, brand}, index) => (
          <Card key={index} id ={id} name={product} price={price} brand={brand} />
        ))}
    </main>
  )
}

export default FilteredCardHolder