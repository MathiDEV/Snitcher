import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";


function Dashboard() {



    return (
            <>
                <Navbar />
                <Sidebar />
            </>

    )
}

export default Dashboard;