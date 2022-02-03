import "./events.css"
import React from 'react';
import { Link } from "react-router-dom";
const Events = () => {
    return (
        <div>
<div className="event-conatainer">
            <div className="image">
                <img src="https://img.freepik.com/free-psd/banner-template-concert_23-2148403186.jpg?size=626&ext=jpg" className="photo" alt="" />
            </div>
            <div className="detail">
                <div className="title">felicipic 2022</div>
                <div className="event-data">
               
                <div className="time">Starting  from:19 oct 10pm</div>
                 <div className="category">cultural event</div>
                </div>
                <div className="discription">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi accusamus, possimus fuga odio, dicta deserunt sit iusto, sed nesciunt fugit officiis adipisci voluptates alias praesentium amet quasi repellat doloremque neque.</div>
                
                <div className="btns">
                    <button type="button" className="btn btn-danger">Paricipate</button>
                    <Link to="/more"><button type="button" className="btn btn-outline-primary">more</button></Link>
                    <div className="edit"><i className="fas fa-edit"></i></div>
                    <div className="dlt"><i className="fas fa-trash"></i></div>
                </div>
            </div>
        </div>
       
        </div>
        
    );
};

export default Events;
