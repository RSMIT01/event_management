import "./events.css"
import React, { useContext, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const Events = ({ Event ,p=true}) => {
    const { user } = useContext(AuthContext)
    const [uevent, setUevent] = useState(Event)
    const [banner, setBanner] = useState(null)
    const ispart=(Event.participants.includes(user?._id));
 
    const pb = process.env.REACT_APP_IMG_FOLDER;


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


    const ref = useRef('');

    const updatehandle = () => {
        ref.current.click();
    }
    const handleupdatetevent = async (e) => {
        e.preventDefault();
        if (banner) {
            const data = new FormData();
            const filename = Date.now() + banner.name;
            data.append("name", filename);
            data.append("file", banner);
            uevent.banner = filename;
            try {
                await axios.post("/upload", data)
                
            } catch (error) {
                console.log(error);
            }

        }
        else {
            uevent.banner = Event.banner
        }
        try {
            await axios.put(`/event/${Event._id}`, uevent);
            alert("event updated successfully");

        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }
    const handlechange = (e) => {
        setUevent({ ...uevent, [e.target.name]: e.target.value });
    }
    return (
        <div>

            <div>


                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="wrapper">
                                    {/* {created && <div className="title-event">event created succsessfully</div>} */}
                                    <div className="title-event">Update Event</div>
                                    <form action="" className="form" onChange={handlechange} onSubmit={handleupdatetevent}>
                                        <div className="inputfield">
                                            <label >Title</label>
                                            <input type="text" name="title" required defaultValue={uevent.title} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Category</label>
                                            <input type="text" name="category" defaultValue={uevent.category} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Resource Person Name</label>
                                            <input type="text" name="rp_name" defaultValue={uevent.rp_name} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Organization</label>
                                            <input type="text" name="organization" defaultValue={uevent.organization} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Description</label>
                                            <textarea type="text" name="desc" defaultValue={uevent.desc} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Venue</label>
                                            <input type="text" name="venue" defaultValue={uevent.venue} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Date </label>
                                            <input type="date" name="datee" defaultValue={uevent.datee} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >time </label>
                                            <input type="time" name="time" defaultValue={uevent.time} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >organized by </label>
                                            <input type="text" name="org_by" defaultValue={uevent.org_by} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Technical body </label>
                                            <input type="text" name="tech_body" defaultValue={uevent.tech_body} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Coordinator</label>
                                            <input type="text" name="coordinator" defaultValue={uevent.coordinator} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Fees</label>
                                            <input type="number" name="fees" defaultValue={uevent.fees} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label htmlFor="photo">Banner</label>
                                            <input id="photo" name="banner"  type="file" style={{ color: "white" }} className="file_photo" accept=".png,.jpeg,.jpg" onChange={(e) => setBanner(e.target.files[0])} />
                                        </div>
                                        <div className="inputfield">
                                            <input type="submit" className="btn" value="Save changes" />
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


            </div>
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
                        {user != null && user.role !== "admin" && !ispart && p && <button type="button" onClick={participate} className="btn btn-danger">Paricipate</button>}
                        {user != null && user.role !== "admin" && ispart && p &&  <button type="button" className="btn btn-secondary btn-lg" disabled>participated</button>}
                        <Link to="/more" onClick={savedata}><button type="button" className="btn btn-outline-primary">more</button></Link>
                        {user != null && user.role === "admin" && <div onClick={updatehandle} className="edit"><i className="fas fa-edit"></i></div>}
                        {user != null && user.role === "admin" && <div className="dlt" onClick={handledelete}><i className="fas fa-trash"></i></div>}
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Events;
