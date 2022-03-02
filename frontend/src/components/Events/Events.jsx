import "./events.css"
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const Events = ({ Event  , updatehandle }) => {
    const { user } = useContext(AuthContext)
 
    const ispart=(Event.participants.includes(user?._id));
 
    const pb = process.env.REACT_APP_IMG_FOLDER;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;



    const participate=async()=>{
        const partipate_data={
            uid:user._id,
             eid:Event._id
        }
        if (window.confirm('Are you want to participate?'))
        {
            const res= await axios.post("/user/participate",partipate_data)
            if(!alert(res.data)){window.location.reload();}
        }
    }
     
    const handledelete = async () => {
        if (window.confirm('Are you want to delete this event?'))
        {
            const res=await axios.delete(`/event/${Event._id}`)
            if(!alert(res.data)){window.location.reload();}
           
        }
        
    }
    const savedata = () => {
        localStorage.setItem("eid", Event._id)
    }


    
    return (
        <div>

           
            <div className="event-conatainer">
                <div className="image">
                    {/* "https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg?size=626&ext=jpg" */}
                    <img src={pb + Event.banner} className="photo" alt="" />

                </div>
                <div className="detail">
                    <div className="title">{Event.title}</div>
                    <div className="event-data">

                        <div className="time">Starting  from:{Event.datee}</div>
                        <div className="category">{Event.category}</div>
                    </div>
                    <div className="discription">{Event.desc}</div>

                    <div className="btns">
                        {user != null && user.role !== "admin" && !ispart && Event.datee>today && <button type="button" onClick={participate} className="btn btn-danger">Paricipate</button>}
                        {user != null && user.role !== "admin" && ispart && Event.datee>today &&  <button type="button" className="btn btn-secondary btn-lg" disabled>participated</button>}
                        <Link to="/more" onClick={savedata}><button type="button" className="btn btn-outline-primary">more</button></Link>
                        {user != null && user.role === "admin" && <div onClick={()=>{updatehandle(Event)}} className="edit"><i className="fas fa-edit"></i></div>}
                        {user != null && user.role === "admin" && <div className="dlt" onClick={handledelete}><i className="fas fa-trash"></i></div>}
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Events;