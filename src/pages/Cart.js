import { useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';

export default function Cart() {

  const [details, setDetails] = useState([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);

  useEffect(() => {
      fetch(`https://croffle-haus.onrender.com/users/details`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(res => res.json())
      .then(data => {
          console.log('Data received:', data);
          setDetails(data.orderedProduct);
          
          // Calculate the total amount sum
          const sum = data.orderedProduct.reduce((acc, order) => acc + order.totalAmount, 0);
          setTotalAmountSum(sum);
      });
  }, []);

  return (
    <>
      <h1 className="text-center my-4">Cart Dashboard</h1>
  
      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Purchased Date</th>
            <th>Quantity</th>
            <th>Total Amount</th>
          </tr>
        </thead>
  
        <tbody>
          {details.map((order, index) => (
            order.products.map((product, pIndex) => (
              <tr key={pIndex}>
                <td>{index + 1}</td>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>{order.purchasedOn}</td>
                <td>{product.quantity}</td>
                <td>{order.totalAmount}</td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <h2>Total Amount Sum: {totalAmountSum}</h2>
      </div>
    </>
  )
}
