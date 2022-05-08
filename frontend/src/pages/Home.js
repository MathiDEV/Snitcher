import React, { useEffect, useState } from "react";
import Nightsky from "../components/Nightsky";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Price from "../components/Price";
function Home() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null);

    if (localStorage.getItem("accessToken")) {
        return <Navigate to="/dashboard" />
    }
    // if(token)
    //     return <Navigate to="/dashboard" />;

    return (
        <>
            <Nightsky />
            <div id="hero">
                <Hero />
                <div id="features">
                    <Feature />
                </div>
                <div id="prices">
                    <Price id="prices" />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Home;