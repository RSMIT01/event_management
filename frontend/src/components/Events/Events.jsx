import "./events.css"
import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const Events = ({ Event, updatehandle }) => {
    const { user } = useContext(AuthContext)

    const ispart = (Event.participants.includes(user?._id));
    const [certificateimg, setCertificateimg] = useState(null)
    const pb = process.env.REACT_APP_IMG_FOLDER;

    const ispartuploaded = (Event.uploaded.includes(user?._id));


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;



    const participate = async () => {
        const partipate_data = {
            uid: user._id,
            eid: Event._id
        }
        if (window.confirm('Are you want to participate?')) {
            const res = await axios.post("/user/participate", partipate_data)
            if (!alert(res.data)) { window.location.reload(); }
        }
    }

    const handledelete = async () => {
        if (window.confirm('Are you want to delete this event?')) {
            const res = await axios.delete(`/event/${Event._id}`)
            if (!alert(res.data)) { window.location.reload(); }

        }

    }
    const savedata = () => {
        localStorage.setItem("eid", Event._id)
    }

    const certificateupload = async (e) => {
        e.preventDefault();
        const newcerti = {
            userId: user._id,
            eventId: Event._id,
            name: user.name,
            certificate: null,
        }
        if (certificateimg) {
            const data = new FormData();
            const filename = Date.now() + certificateimg.name;
            data.append("name", filename);
            data.append("file", certificateimg);
            newcerti.certificate = filename;
            try {
                await axios.post("/upload", data)
            } catch (error) {
                console.log(error);
            }

        }
        try {
            await axios.post("/certificate/certificate_upload", newcerti)
            alert("Certificate uploaded successfully");
        } catch (error) {
            console.log(error);
        }
        window.location.reload();


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
                        {user != null && user.role !== "admin" && !ispart && Event.datee >= today && <button type="button" onClick={participate} className="btn btn-danger">Paricipate</button>}
                        {user != null && user.role !== "admin" && ispart && Event.datee > today && <button type="button" className="btn btn-secondary btn-lg" disabled>participated</button>}
                        <Link to="/more" onClick={savedata}><button type="button" className="btn btn-outline-primary">more</button></Link>
                        {user != null && user.role === "admin" && <div onClick={() => { updatehandle(Event) }} className="edit"><i className="fas fa-edit"></i></div>}
                        {user != null && user.role === "admin" && <div className="dlt" onClick={handledelete}><i className="fas fa-trash"></i></div>}
                        {user != null && ispart && !ispartuploaded && user.role !== "admin" && Event.datee < today && <form className="certiform" onSubmit={certificateupload}>
                            <input required type="file" accept=".png,.jpeg,.jpg" onChange={(e) => setCertificateimg(e.target.files[0])} />
                            <button type="submit" className="btn btn-secondary certificatebtn">Upload certificate</button>
                        </form>}
                        {ispartuploaded && <button type="submit" className="btn btn-secondary certificatebtn">certificate uploaded</button>
                        }
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Events;