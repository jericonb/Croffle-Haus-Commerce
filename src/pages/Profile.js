import {useContext, useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import UserContext from '../UserContext';
import { Navigate } from 'react-router-dom';
import UpdateProfile from '../components/UpdateProfile';
import ResetPassword from '../components/ResetPassword';



export default function Profile(){

    const token = localStorage.getItem('token')

    const {user} = useContext(UserContext);

    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`https://croffle-haus.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
        console.log(data)
        if(typeof data._id !== "undefined"){
            setDetails(data)
            }
        });
    }, [])

    return (
        (user.access === null) ?
        <Navigate to="/products" />
        :
        <>
        <Row>
            <Col className="p-5 bg-primary text-white">
                <h1 className="my-5 ">Profile</h1>
                <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                <hr />
                <h4>Contacts</h4>
                <ul>
                    <li>Email: {details.email}</li>
                    <li>Mobile No: {details.mobileNo}</li>
                </ul>
            </Col>
        </Row>
        <Row className='pt-4 mt-4'>
                <Col>
                    <ResetPassword />
                </Col>
        </Row>
        <Row>
            <UpdateProfile token={token}/>
        </Row>
        </>

    )

}