import { useState } from 'react';
import Nav from './Navigation/Nav';
import Products from './Products/Products';
import Recommended from './Recommended/Recommended';
import Sidebar from './Sidebar/Sidebar';
import products from './db/data'
import Card from './components/Card';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const [query, setQuery] = useState("")
  //input filter
  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }
  const filteredItems = products.filter((product) => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() !== -1))

  //radio filter
  const handleChange = (e) => {
    setSelectedCategory(e.target.value)
  }
  //btns filter
  const handleClick = (e) => {
    setSelectedCategory(e.target.value)
  }

  function filteredData(products, selected, query){
    let filteredProducts = products
    //filtering input items
    if(query){
      filteredProducts = filteredItems
    } 
    //selected filter
    if(selected) {
      filteredProducts = filteredProducts.filter(({category, color, company, newPrice, title}) => category === selected || 
      color === selected || 
      company === selected || 
      newPrice === selected || 
      title === selected
      )
    }
    return filteredProducts.map(({img, title, star, reviews, prevPrice, newPrice}) => (
      <Card key={Math.random()}
        img={img}
        title={title}
        star={star}
        reviews={reviews}
        newPrice={newPrice}
        prevPrice={prevPrice}
      />
    ))
  }
  const result = filteredData(products, selectedCategory,query)
  return (
    <>
     <Sidebar handleChange={handleChange} />
     <Nav query={query} handleChange={handleChange} />
     <Recommended handleChange={handleChange} />
     <Products result={result} />
    </>
  );
}

export default App;
