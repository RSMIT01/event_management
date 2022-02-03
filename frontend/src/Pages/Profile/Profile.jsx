import "./profile.css"
import React from 'react';
import Navbar from "../../components/Navbar/Navbar"
export const Profile = () => {
    return (
        <div>
            <Navbar />
            <div className=" bg-light">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-10 mt-5 pt-5">
                            <div className="row z-depth-3">
                                <div className="col-sm-4 bg-info rounded-left">
                                    <div className="card-block text-center text-white">
                                        <i className="fas fa-user-tie fa-7x mt-5"></i>
                                        <h2 className="font-weight-bold mt-4">Nickson</h2>
                                        <p>Web Designer</p><i className="far fa-edit fa-2x mb-4"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8 bg-white rounded-right">
                                    <h3 className="mt-3 text-center">Information</h3>
                                    <hr className="bg-primary mt-0 w-25" />
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <p className="font-weight-bold">Username:</p>
                                            <h6 className=" text-muted">nick32</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="font-weight-bold">Name:</p>
                                            <h6 className=" text-muted">nick jdksjd</h6>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="font-weight-bold">Email:</p>
                                            <h6 className=" text-muted">nick32@gmail.com</h6>
                                        </div>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
