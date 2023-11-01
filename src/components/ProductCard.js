import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import "./ProductCardStyle.css"

export default function ProductCard({ productProp }) {
    const { _id, name, description, price, isActive, image } = productProp;

    return (
        <div className="productcardbox">
            <img src={`https://croffle-haus.onrender.com/${image}`} alt='' />
            <h1>{name}</h1>
            <h3>Description:</h3>
            <p>{description}</p>
            <h3>Price:</h3>
            <p>PhP {price}</p>
            <h3>Availability:</h3>
            <p>
                {isActive ? <Card.Text>Available</Card.Text> : <Card.Text>Unavailable</Card.Text>}
            </p>
            <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
        </div>
    );
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    })
};
