import "./events.css"
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Events = ({ Event }) => {
    const {user}=useContext(AuthContext)

    const pb=process.env.REACT_APP_IMG_FOLDER;
     
   const handledelete= async ()=>{
         await axios.delete(`/event/${Event._id}`)
          window.location.reload();
   }

    return (
        <div>
<div className="event-conatainer">
            <div className="image">
            {/* "https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg?size=626&ext=jpg" */}
                <img src={ pb + Event.banner } className="photo" alt="" />
              
            </div>
            <div className="detail">
                <div className="title">{Event.title}</div>
                <div className="event-data">
               
                <div className="time">Starting  from:{Event.datee}</div>
                 <div className="category">{Event.category}</div>
                </div>
                <div className="discription">{Event.desc}</div>
                
                <div className="btns">
                {user!=null  && user.role==="admin" && <button type="button" className="btn btn-danger">Paricipate</button>}
                    <Link to="/more"><button type="button" className="btn btn-outline-primary">more</button></Link>
                    {user!=null  && user.role==="admin" && <div className="edit"><i className="fas fa-edit"></i></div> }
                    {user!=null  && user.role==="admin" &&  <div className="dlt"  onClick={handledelete}><i className="fas fa-trash"></i></div> }
                </div>
            </div>
        </div>
       
        </div>
        
    );
};

export default Events;
