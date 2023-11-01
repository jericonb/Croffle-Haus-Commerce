import './App.css';
import {UserProvider} from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProducts';
import ProductView from './pages/ProductView';
import AdminView from './components/AdminView'
import UserView from './components/UserView';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import { Helmet } from 'react-helmet';


function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () =>{
    localStorage.clear();
  }

  
  useEffect(() => {
    console.log(user);
    fetch(`https://croffle-haus.onrender.com/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(typeof data._id !== "undefined"){
        setUser({
            id: data._id,
            isAdmin: data.isAdmin
        });
  
      }else{
          setUser({
            id: null,
            isAdmin: null
          })
      }
    })
  }, )


  return (
   
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Cinzel:wght@400;500;600;700;800;900&family=Courgette&family=Dancing+Script:wght@400;500;600;700&family=Gloria+Hallelujah&family=Indie+Flower&family=Kaushan+Script&family=Lobster&family=Oswald:wght@200;300;400;500;600&family=Pacifico&family=Permanent+Marker&display=swap" rel="stylesheet" />
        </Helmet>
          <AppNavbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/products/:productId" element={<ProductView/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/addProduct" element={<AddProduct/>}/>
                <Route path="/adminView" element={<AdminView/>}/>
                <Route path="/userView" element={<UserView/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
          <Footer />
      </Router>
    </UserProvider>   
  );
}

export default App;
