import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/AuthContext";
import Events from '../../components/Events/Events';
import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios";

const Myevents = () => {
    const [myevent, setMyvent] = useState([]);
    const { user } = useContext(AuthContext)
    const [Load, setLoad] = useState(true);
    useEffect(() => {
        const fetchEvents = async () => {

            const res = await axios.get(`/user/${user._id}`);
            setMyvent(res.data.sort((p1, p2) => {
                return new Date(p1.datee) - new Date(p2.datee);
            }));
            setLoad(false);
        };
        fetchEvents();
    }, [user._id])
    return (
        <div>
            <Navbar />

            {(Load) ? <Loading /> : <div className="Home_events" >
                <h3>Upcoming  Events</h3>

                {myevent.length !== 0 &&  myevent.map((e) => (
                    <Events key={e._id} Event={e} />
                ))}
            </div>}
        </div >
    )
}

export default Myevents