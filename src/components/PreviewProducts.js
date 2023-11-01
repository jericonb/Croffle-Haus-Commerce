import React from 'react';
import { Link } from 'react-router-dom';
import './PreviewProductStyle.css';


export default function Product(props) {

    const { data } = props;

    const { _id, name, description, price, image } = data;

    return (
                <div className="previewcontainer">
                    <div className="previewbox">
                        <img src={`https://croffle-haus.onrender.com/${image}`} alt='' />
                        <h5><Link className="product-link" to={`/products/${_id}`}>{name}</Link></h5>
                        <p>{description}</p>
                        <h5>₱{price}</h5>
                        <Link className="btn btn-custom" to={`/products/${_id}`}>Order Now!</Link>
                    </div>
                </div>
    );
}