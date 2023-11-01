import {NavLink} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import UserContext from '../UserContext';
import './AppNavbarStyle.css'
import { Helmet } from 'react-helmet';


export default function AppNavbar() {
    const {user} = useContext(UserContext);

    useEffect(() => {
        let menu = document.querySelector('#menu-icon');
        let navlist = document.querySelector('.navlist');
    
        menu.onclick = () => {
          menu.classList.toggle('bx-x');
          navlist.classList.toggle('open');
        }
      }, []); 

    return (
        
        <nav>
            <Helmet>
                <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"/>
            </Helmet>
            <li><NavLink to="/" exact className="logo"><img src={require("../Images/logo.png")} alt="Croffle Haus Logo" /></NavLink></li>
            <ul className="navlist">
                <li><NavLink to="/" exact >Home</NavLink></li>
                <li><NavLink to="/products" exact >Products</NavLink></li>
                
                {(user.id !== null) ? 
                            user.isAdmin 
                            ?
                            <>
                                 <li><NavLink to="/addProduct" exact >Add Product</NavLink></li>
                                 <li><NavLink to="/logout" exact >Logout</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to="/profile" exact >Profile</NavLink></li>
                                <li><NavLink to="/cart" exact >Cart</NavLink></li>
                                <li><NavLink to="/logout" exact >Logout</NavLink></li>
                            </>
                        : 
                            <>
                                <li><NavLink to="/login" exact >Login</NavLink></li>
                                <li><NavLink to="/register" exact >Register</NavLink></li>
                            </>
                        }
            </ul>
            <div className="bx bx-menu" id="menu-icon"></div>
        </nav>
        
    );
}
