import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	
	const { productId } = useParams();
	const { user } = useContext(UserContext);
	
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [totalAmount, setTotalAmount] = useState(0);
	const [productImage, setProductImage] = useState('')
	
	useEffect(()=> {

		fetch(`https://croffle-haus.onrender.com/products/${productId}`)
		.then(res => res.json())
		.then(data => {

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			setProductImage(data.productImage);

      const newTotalAmount = price * quantity;
		  setTotalAmount(newTotalAmount);
	  }, [price, quantity]);

		});


	const order = (productId, quantity) => {

		fetch(`https://croffle-haus.onrender.com/users/order`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				productId: productId,
				quantity: Number(quantity),
				productName: name,
        		totalAmount: totalAmount,
				productImage: productImage
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data)
			console.log(data.message);

			if (data.message === 'Order Successful') {

				Swal.fire({
					title: "Successfully ordered",
					icon: 'success',
					text: "You have successfully order this product."
				});

				navigate("/products");

			} else {

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				});

			}

		});

	};

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Img src={`https://croffle-haus.onrender.com/products/${productImage}`} />
						<Card.Body className="text-center">
							<Card.Title>{name}</Card.Title>
							<Card.Subtitle>Description:</Card.Subtitle>
							<Card.Text>{description}</Card.Text>
							<Card.Subtitle>Price:</Card.Subtitle>
							<Card.Text>PhP {price}</Card.Text>
							<Form>
							<Form.Group controlId="quantity">
							<Form.Label><b>Quantity:</b></Form.Label>
							<Form.Control
								type="Number"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
							/>
							</Form.Group>
							</Form>
							<Card.Subtitle>Total Amount:</Card.Subtitle>
							<Card.Text>PhP {totalAmount}</Card.Text>
							{ user.id !== null ? 
									<Button variant="primary" block onClick={() => order(productId, quantity)}>Order</Button>
								: 
									<Link className="btn btn-danger btn-block" to="/login">Log in to Order</Link>
							}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}