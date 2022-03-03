import "./more.css"
import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Loading from '../../components/Loading/Loading';


const More = () => {
    const pb = process.env.REACT_APP_IMG_FOLDER;
    const id = localStorage.getItem('eid');



    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;


    const [event, setEvent] = useState({});
    const [Load, setLoad] = useState(true);
    const [certis, setCertis] = useState([]);

    useEffect(() => {
        const getevent = async () => {
            const res = await axios.get(`/event/${id}`)
            setEvent(res.data);
            setLoad(false);
        }
        getevent();
    }, [id])

    useEffect(() => {
        const getcertificates = async () => {
            const res = await axios.get(`/certificate/${id}`)
            setCertis(res.data);
            console.log(res.data);
        }
        getcertificates();
    }, [id])



    return (<div>
        <Navbar />
        {(Load) ? <Loading /> :
            <div className="data_event">
                <div className="event_data">
                    <img src={pb + event.banner} alt="banner" className="event_image" />
                    <div className="other_data">
                        <div className="event_title">{event.title}</div>
                        <table>
                            <tbody>


                                <tr>
                                    <td>Category</td>
                                    <td>{event.category}</td>

                                </tr>
                                <tr>
                                    <td>Resource Person Name</td>
                                    <td>{event.rp_name}</td>

                                </tr>
                                <tr>
                                    <td>Organization</td>
                                    <td>{event.organization}</td>

                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{event.desc}</td>

                                </tr>
                                <tr>
                                    <td>Venue</td>
                                    <td>{event.venue}</td>

                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>{event.datee}</td>

                                </tr>
                                <tr>
                                    <td>time</td>
                                    <td>{event.time}</td>

                                </tr>
                                <tr>
                                    <td>organized by</td>
                                    <td>{event.org_by}</td>

                                </tr>
                                <tr>
                                    <td>Technical body </td>
                                    <td>{event.tech_body}</td>

                                </tr>
                                <tr>
                                    <td>Coordinator </td>
                                    <td>i{event.coordinator}</td>

                                </tr>
                                <tr>
                                    <td>Fees </td>
                                    <td>{event.fees}</td>

                                </tr>
                                <tr>
                                    <td>participants </td>
                                    <td>{event.participants.length}</td>

                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
               {event.datee<today && <div className="certificate_container">
                    <h3 className="certi_title">  Certificates  </h3>
                    <div className="certis">

                        {certis.map((e) => (
                            <div className="certificate_img">
                                <h2 className="certi_name">{e.name}</h2>
                                <img src={pb + e.certificate} className="event_image" alt="..." />
                            </div>
                        ))}
                    </div>
                </div>}
            </div>}
    </div>);
};

export default More;
