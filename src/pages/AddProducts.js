import {useState, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import axios from 'axios';

export default function AddProducts(){

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [image,setImage] = useState("")

    async function createProduct(e) {
        e.preventDefault();
    
        let token = localStorage.getItem('token');
    
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
    
        try {
            const response = await axios.post(`https://croffle-haus.onrender.com/products/add`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (response.data) {
                Swal.fire({
                    icon: "success",
                    title: "Product Added"
                });
    
                navigate("/products");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessful Product Creation",
                    text: response.data.message
                });
            }
    
        } catch (error) {
            console.error('Error creating product:', error);
        }
    
        setName("");
        setDescription("");
        setPrice(0);
        setImage("");
    }
    
    return (

            (user.isAdmin === true)
            ?
            <>
                <h1 className="my-5 text-center">Add Product</h1>
                <Form onSubmit={e => createProduct(e)} encType='multipart/form-data'>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group controlId='fileName'>
                        <Form.Label>Upload Image:</Form.Label>
                        <Form.Control type="file" required name='image' onChange={(e) => setImage(e.target.files[0])} size="lg" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
            :
            <Navigate to="/products" />

    )


}
