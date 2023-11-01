import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import "./UserViewStyle.css"
// import SearchByPriceRange from './SearchByPriceRange';



export default function UserView({productsData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
      
            // if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            // } else {
            //     return null;
            // }
        })

       
        setProducts(productsArr)

    }, [productsData])

    return(
        <div className="userviewcontainer">
            <ProductSearch />
            {/* <SearchByPriceRange /> */}
            <div className="userviewproductsbox">
                <div className="userviewproducts">
                { products }
                </div>
            </div>
        </div>
        
        )
}