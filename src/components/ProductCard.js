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
            <h3>{name}</h3>
            <h5>Description:</h5>
            <p>{description}</p>
            <h5>Price:</h5>
            <p>₱ {price}</p>
            <h5>Availability:</h5>
            <p>
                {isActive ? <Card.Text>Available</Card.Text> : <Card.Text>Unavailable</Card.Text>}
            </p>
            <Link className="btn btn-custom" to={`/products/${_id}`}>Order Now!</Link>
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
