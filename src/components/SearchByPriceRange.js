import React, { useState } from 'react';

export default function ProductsSearch () {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('https://croffle-haus.onrender.com/products/searchByPrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ minPrice, maxPrice })
      });

      if (!response.ok) {
        throw new Error('Error fetching products');
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              className="form-control"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              className="form-control"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h3>Available Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

