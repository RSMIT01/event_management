import "./home.css"
import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar"
import { Link } from "react-router-dom";
import axios from "axios";
import Events from "../../components/Events/Events";
import Loading from "../../components/Loading/Loading";

const Home = () => {
   
   const[pastevent,setPastevent]=useState([]);
   const [Load, setLoad] = useState(true);

    useEffect(() => {
      
        const fetchEvents = async () => {

            const res = await axios.post("/event/pastevent");
            setPastevent(res.data.sort((p1, p2) => {
                return new Date(p1.datee) - new Date(p2.datee);
            }));
            setLoad(false);
        };
       
        fetchEvents();
    }, [])
    

    
    return (
        <div>
            <Navbar />
            <section className="banner-area">
                <div className="banner-img"></div>
                <h1>Welcome to DDU Events</h1>
                <h3>Parcipate to Events</h3>
                <Link className="banner-btn" to="/upcoming" >Upcoming events</Link>
            </section>
             <section className="past_events" >
                <h3>Past  Events</h3>
                <div>  
               
                {(Load) ? <Loading /> :
                    <div>
                        {pastevent.map((e)=>(
                            <Events key={e._id} Event={e} p={false} />
                        ))}
                    </div>}
                </div>
             </section>

            <section className="about-area" id="about">
                <h3 className="section-title">About Us</h3>
                <ul className="about-content">
                    <li className="about-left"></li>
                    <li className="about-right">
                        <h2>About our Company</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt iusto unde modi aspernatur amet blanditiis quibusdam ipsam. Veritatis, rerum, fuga.</p><Link to="/" ><button className="about-btn" >Learn more</button></Link>
                    </li>
                </ul>
            </section>
            <section className="contact-area" id="contact">
                <h3 className="section-title">Contact</h3>
                <ul className="contact-content">
                    <li>
                        <i className="fa fa-map-marker"></i>
                        <p>247 Westwood Lane<br />
                            Blackfen, UK</p>
                    </li>
                    <li>
                        <i className="fa fa-phone"></i>
                        <p>+123 456 789<br />
                            +789 456 123</p>
                    </li>
                    <li>
                        <i className="fa fa-envelope"></i>
                        <p>info@saffron.com<br />
                            yourdomain@website.com</p>
                    </li>
                </ul>
            </section>
            <footer>
                <p>All Right Reserved by Your Website</p>
            </footer>
        </div>

    );
};

export default Home;
