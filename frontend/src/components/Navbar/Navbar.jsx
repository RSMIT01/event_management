import React, { useState } from 'react';
import "./navbar.css"
import { Link } from 'react-router-dom'
const Navbar = () => {

    const[ismobile,setIsmobile]=useState(false);
   return (
      <nav className='navbar'>
         <h3 className='logo'>DDU_FEST</h3>
         <ul className={ismobile ? "nav-links-mobile":"nav-links"} onClick={()=>setIsmobile(false)}>
            <Link to='/' className='path'>
               <li>Home</li>
            </Link>
            <Link to='/create' className='path'>
               <li>Create Event</li>
            </Link>
            <Link to='/profile'className='path'>
               <li><i className="profile fas fa-user-circle fa-lg"></i></li>
            </Link>
            <Link to='/'className='path'>
               <li><i className="fas fa-sign-out-alt"></i></li>
            </Link>
         </ul>
         <button onClick={()=>setIsmobile(!ismobile)} className='mobile-menu-icon' >
            {ismobile ? <i className="fas fa-times"></i>:<i className="fas fa-bars"></i> }
         </button>
      </nav>
   );
};

export default Navbar;
