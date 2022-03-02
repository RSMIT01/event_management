import React, { useState, useRef } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Exel } from '../../components/Exel/Exel';

import axios from 'axios';
import "./report.css"



const Report = () => {
  const [filtered, setFiltered] = useState([]);
  const from = useRef(null);
  const to = useRef(null);
  const fileName = "myfile";




  const date_filter = async (e) => {
    e.preventDefault();
    const ob = {
      from: from.current.value,
      to: to.current.value
    }
    const newres = await axios.post("/event/report", ob);
    setFiltered(newres.data);


  }


  return (
    <div>
      <Navbar />
      {/* <div className="exel">

      
      <div className="Home_events" >
        <h3> Report</h3>
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
 
       
        {filtered.length!==0 && <Exel apiData={filtered} fileName={fileName} /> }
        
        </div>

       
      </div> */}
      <div className="card text-center">
        <div className="card-header fs-1">
          Generate Report
        </div>
        <div className="card-body">
          <h5 className="card-title">Select date</h5>
          <form className="row g-3" onSubmit={date_filter}>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">From</label>
              <input type="date" ref={from} className="form-control" id="inputEmail4" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">TO</label>
              <input type="date" ref={to} className="form-control" id="inputPassword4" />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Filter</button>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted">
          {filtered.length !== 0 && <Exel apiData={filtered} fileName={fileName} />}
        </div>
      </div>
    </div>
  )
}

export default Report