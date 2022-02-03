import React, { useState } from 'react';
import  {  useRef } from 'react'
import { Link } from 'react-router-dom';
import "./login.css"
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

const Login = () => {

  const[wrong,setWrong]=useState(false);
  const email=useRef();
  const password=useRef();
  const navigate=useNavigate();


  const submited= async (e)=>{
    e.preventDefault();
   
        const user={
             email:email.current.value,
            password:password.current.value,
        }
        
        try {
         await axios.post("user/login",user);
        
         navigate("/");

        } catch (error) {
            setWrong(true)
            console.log(error);
        }
        
    
}

  return (<div className="login-page">
  <span className="login-title">Login</span>
  {wrong && <h3>wrong password or not registered</h3>}
  
  <form className="login-form"  onSubmit={submited}>
      <label >Email</label>
      <input className="login-input" type="email" ref={email} placeholder="Enter your email..." />
      <label >Password</label>
      <input className="login-input" type="password" ref={password} placeholder="Enter your password..." />
      <button className="login-btn" type='submit'>Login</button>
  </form>
  <Link className="link" to="/register" > <button className="register-btn-lg">Register</button></Link>
</div>);
};

export default Login;
