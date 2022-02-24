import React, { useState, useEffect, useRef } from 'react'
import Events from "../../components/Events/Events";
import axios from 'axios';
import "./upcoming.css"
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';
import { Exel } from '../../components/Exel/Exel';

const Upcoming = () => {
    const [event, setEvent] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [Load, setLoad] = useState(true);
    const [isfill, setIsfill] = useState(false);
    const from = useRef(null);
    const to = useRef(null);
    const fileName = "myfile";

    const date_filter = async (e) => {
        e.preventDefault();
        const ob = {
            from: from.current.value,
            to: to.current.value
        }
        const newres = await axios.post("/event/filter_date", ob);
        setFiltered(newres.data);

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
            <Navbar />
            {(Load) ? <Loading /> : <div className="Home_events" >
                <h3>Upcoming  Events</h3>
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
                    <button type="submit" className="btn btn-primary search_btn">Search</button>
                </form>
                <br />
                <Exel apiData={filtered} fileName={fileName} />
                <br />
                <div>
                    {!isfill && event.map((e) => (
                        <Events key={e._id} Event={e} />
                    ))}
                </div>
                {filtered.length !== 0 && from && to && filtered.map((e) => (
                    <Events key={e._id} Event={e} />
                ))}
            </div>}
        </div>
    )
}

export default Upcoming