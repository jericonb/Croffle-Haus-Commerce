import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductSearchStyle.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


const ProductSearch = () => {
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://croffle-haus.onrender.com/products/searchByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div className='search'>
        {/* <div className='searchlabel'>
        <label htmlFor="productName">Product Search:</label>
        </div> */}
        <div className="searchcontainer">
          <div className="searchbox">
            <input type="text" id="productName" className="searchbar" placeholder="Product Search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
            <button onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        {/* <h3>Search Results:</h3> */}
        <ul>
          {searchResults.map(product => (
            <ProductCard productProp={product} key={product._id}/>
          ))}
        </ul>
    </div>
  );
};

export default ProductSearch;