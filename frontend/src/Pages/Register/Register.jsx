import "./register.css"
import { Link } from "react-router-dom";
import React from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import  { useRef,useState } from 'react'

const  Register = () => {
  const username=useRef();
    const email=useRef();
     const password=useRef();
     const Conformpassword=useRef();
     const navigate=useNavigate();
     const[exist,setExist]=useState(false);
   

     const submitHandler= async (e)=>{
        e.preventDefault();
        if(Conformpassword.current.value!==password.current.value)
        {
            Conformpassword.current.setCustomValidity("passwords Don't match!!!")
        }
        else
        {
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try {
             await axios.post("user/register",user);
            
             navigate("/login");

            } catch (error) {
              setExist(true)
                console.log(error);
            }
            
        }
    }
  return (  
     <div className="register-page">
  <span className="register-title">Register</span>
      {exist && <h1>already regitered pls login</h1>}
  <form className="register-form" onSubmit={submitHandler}>
  <label >Username</label>
      <input className="register-input" type="text"  required ref={username}  placeholder="Enter your username..." />
      <label >Email</label>
      <input className="register-input" type="email"  required ref={email}  placeholder="Enter your email..." />
      <label >Password</label>
      <input className="register-input" type="password" required ref={password}  placeholder="Enter your password..." />
      <label >Conform Password</label>
      <input className="register-input" type="password" ref={Conformpassword}  placeholder="Enter your password again..." />
  <button className="register-btn-rg" type="submit" >Register</button>
  </form>
    <Link className="link" to="/login" >  <button className="login-btn-rg">Login</button></Link>
</div>);
};
export default Register;

