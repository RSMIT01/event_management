import "./create_event.css"

import React from 'react';
import Navbar from "../../components/Navbar/Navbar";

export const CreateEvent = () => {
  return (
    <div>
    <Navbar/>
    <div className="create_event_container">
    <div className="wrapper">
    <div className="title-event">Create Event</div>
    <form action="" className="form">
        <div className="inputfield">
            <label >Title</label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >Category</label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >Resource Person Name</label>
            <input type="text" className="input" />
        </div>
        <div className="inputfield">
            <label >Organization</label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >Description</label>
            <textarea type="text" className="input" />
        </div>
        <div className="inputfield">
            <label >Venue</label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >Date </label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >time </label>
            <input type="text" className="input" />
        </div>
        <div className="inputfield">
            <label >organized by </label>
            <input type="text" className="input" />
        </div>
        <div className="inputfield">
            <label >Technical body </label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >Coordinator</label>
            <input type="text" className="input" />
        </div>
        <div className="inputfield">
            <label >Fees</label>
            <input type="text" className="input"/>
        </div>
        <div className="inputfield">
            <label >Technical body </label>
            <input type="text" className="input" />
        </div>
        <div className="inputfield">
            <label  htmlFor="photo">Banner</label>
            <input id="photo" type="file" className="file_photo" />
        </div>
        <div className="inputfield">
            <input type="submit" className="btn" value="Create Event"/>
        </div>
    </form>
</div>
</div>
</div>
  );
};
