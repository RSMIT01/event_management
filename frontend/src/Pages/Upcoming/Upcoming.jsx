import React, { useState ,useEffect } from 'react'
import Events from "../../components/Events/Events";
import axios from 'axios';
import "./upcoming.css"
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';


const Upcoming = () => {
    const[event,setEvent]=useState([]);
    const [Load,setLoad]=useState(true);
    
    useEffect(()=>{
        const fetchEvents= async ()=>{

            const res= await axios.post("/event/allevent");
             setEvent(res.data.sort((p1,p2)=>{
                return  new Date(p1.datee)-new Date(p2.datee);
            }));
            setLoad(false);
        };
        fetchEvents();
    },[])

    return (
        <div>
            <Navbar/>
        {(Load )? <Loading/> :<div className="Home_events" >
            <h3>Upcoming  Events</h3>
            {event.map((e)=>(
            <Events key={e._id} Event={e}/>
            ))}
        </div>}
        </div>
    )
}

export default Upcoming