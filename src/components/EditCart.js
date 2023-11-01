import {Button, Modal, Form} from 'react-bootstrap';
import {useState} from 'react';
import Swal from 'sweetalert2';


export default function EditCart({product, fetchData}){

	const[productId, setProductId] = useState('')

	const [quantity, setQuantity] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	const [showEdit, setShowEdit] = useState(false)

	
	const openEdit = (productId) => {
		fetch('https://croffle-haus.onrender.com/users/userOrder')
		.then(res => res.json())
		.then(data => {
			
			setProductId(data._id);
			setQuantity(data.quantity);
			setTotalAmount(data.totalAmount);
		})

		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false);
		setQuantity(0);
		setTotalAmount(0);
	}

	
	const editProduct = (e, productId) => {
		e.preventDefault();

		fetch(`https://croffle-haus.onrender.com/products/${productId}` , {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				quantity: quantity,
				totalAmount: totalAmount,
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data === true){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product Successfully Updated'
				})
				closeEdit();
				fetchData()
			} else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			}
		})
	}

	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

			{/*EDIT MODAL*/}
			<Modal show={showEdit} onHide={closeEdit}>
			    <Form onSubmit={e => editProduct(e, productId)}>
			        <Modal.Header closeButton>
			            <Modal.Title>Edit product</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>    
			            <Form.Group controlId="productName">
			                <Form.Label>Name</Form.Label>
			                <Form.Control type="text" value={quantity} onChange={e => setQuantity(e.target.value)}required/>
			            </Form.Group>
			            <Form.Group controlId="productDescription">
			                <Form.Label>Description</Form.Label>
			                <Form.Control type="text" value={totalAmount} onChange={e => setTotalAmount(e.target.value)}required/>
			            </Form.Group>
			        </Modal.Body>
			        <Modal.Footer>
			            <Button variant="secondary" onClick={closeEdit}>Close</Button>
			            <Button variant="success" type="submit">Submit</Button>
			        </Modal.Footer>
			    </Form>
			</Modal>
		</>
	)
}