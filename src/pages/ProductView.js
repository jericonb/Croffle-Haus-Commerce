import { useState, useEffect, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import './ProductViewStyle.css'

export default function ProductView() {
	const { productId } = useParams();
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const [image, setImage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`https://croffle-haus.onrender.com/products/${productId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				});
				const data = await response.json();

				setName(data.name);
				setDescription(data.description);
				setPrice(data.price);
				setImage(data.image);

				const newTotalAmount = price * quantity;
				setTotalAmount(newTotalAmount);
			} catch (error) {
				console.error('Error fetching product:', error);
			}
		};

		fetchData();
	}, [productId, price, quantity]);

	const order = async (productId, quantity) => {
		try {
			const response = await fetch(`https://croffle-haus.onrender.com/users/order`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify({
					productId: productId,
					quantity: Number(quantity),
					productName: name,
					totalAmount: totalAmount,
					image: image
				})
			});
			const data = await response.json();

			if (data.message === 'Order Successful') {
				Swal.fire({
					title: "Successfully ordered",
					icon: 'success',
					text: "You have successfully ordered this product."
				});

				navigate("/products");
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});
			}
		} catch (error) {
			console.error('Error ordering product:', error);
		}
	};

	return (
		<div className='productviewcontainer'>
			<div className='productviewbox'>
				<img className='productviewimg' src={`https://croffle-haus.onrender.com/${image}`} alt='' />
				<h3>{name}</h3>
				<h5>Description:</h5>
				<p>{description}</p>
				<h5>Price:</h5>
				<p>₱ {price}</p>
				<Form className='productviewform'>
					<Form.Group controlId="quantity">
						<Form.Label><b>Quantity:</b></Form.Label>
						<Form.Control className='productviewcontrol'
							type="Number"
							value={quantity}
							onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value)))}
						/>
					</Form.Group>
				</Form>
				<h5>Total Amount:</h5>
				<p>₱ {Math.max(0, totalAmount)}</p>
				{user.id !== null ?
					<Button variant="primary" block onClick={() => order(productId, quantity)}>Order</Button>
					:
					<Link className="btn btn-danger btn-block" to="/login">Log in to Order</Link>
				}
			</div>
		</div>
	);
}
