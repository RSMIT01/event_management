import React, { useState, useEffect, useRef } from 'react'
import Events from "../../components/Events/Events";
import axios from 'axios';
import "./upcoming.css"
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';


const Upcoming = () => {
    const [event, setEvent] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [Load, setLoad] = useState(true);
    const [isfill, setIsfill] = useState(false);
    const from = useRef(null);
    const to = useRef(null);

    const [uevent, setUevent] = useState('');
    const [banner, setBanner] = useState(null)





    const [pastevent, setPastevent] = useState([]);
    const [poastLoad, setPastload] = useState(true);

    useEffect(() => {

        const fetchEvents = async () => {

            const res = await axios.post("/event/pastevent");
            setPastevent(res.data.sort((p1, p2) => {
                return new Date(p1.datee) - new Date(p2.datee);
            }));
            setPastload(false);
        };

        fetchEvents();
    }, [])

    const ref = useRef('');

    const updatehandle = (Ev) => {
        ref.current.click();
        setUevent(Ev)
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
            await axios.put(`/event/${uevent._id}`, uevent);
            alert("event updated successfully");

        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }
    const handlechange = (e) => {
        setUevent({ ...uevent, [e.target.name]: e.target.value });
    }





    const date_filter = async (e) => {
        e.preventDefault();
        const ob = {
            from: from.current.value,
            to: to.current.value
        }
        const newres = await axios.post("/event/filter_date", ob);
        setFiltered((newres.data.sort((p1, p2) => {
            return new Date(p1.datee) - new Date(p2.datee);
        })));
        setIsfill(true);
    }

    useEffect(() => {
        const fetchEvents = async () => {

            const res = await axios.post("/event/allevent");
            setEvent(res.data.sort((p1, p2) => {
                return new Date(p1.datee) - new Date(p2.datee);
            }));
            setLoad(false);
        };
        fetchEvents();
    }, [])

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
                                            <input id="photo" name="banner" type="file" style={{ color: "white" }} className="file_photo" accept=".png,.jpeg,.jpg" onChange={(e) => setBanner(e.target.files[0])} />
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

            <Navbar />
            <form className='date_container' onSubmit={date_filter}>
                    <h6>Filter by date</h6>
                    <div className='input_date'>
                        <label >From: </label>
                        <input className="date_input" ref={from} type="date" />
                    </div>
                    <div className='input_date'>
                        <label>to: </label>
                        <input className="date_input" ref={to} type="date" />
                    </div>
                    <button type="submit" className="btn btn-primary search_btn">Filter</button>
                </form>
           {isfill && <div className='Home_events'>
            <h3>Filtered events</h3>
            {filtered.length !== 0 && from && to && filtered.map((e) => (
                    <Events key={e._id} Event={e} updatehandle={updatehandle} />
                ))}
            </div>}
            {(Load) ? <Loading /> : <div className="Home_events" >
                <h3>Upcoming  Events</h3>
                
                <div>
                    { event.map((e) => (
                        <Events key={e._id} Event={e} updatehandle={updatehandle} />
                    ))}
                </div>
              
            </div>}
            <section className="past_events" >
               
                <div>

                    {(poastLoad) ? <Loading /> :
                        <div>
                             <h3>Past  Events</h3>
                            {pastevent.map((e) => (
                                <Events key={e._id} Event={e}  updatehandle={updatehandle} />
                            ))}
                        </div>}
                </div>
            </section>
        </div>
    )
}

export default Upcoming