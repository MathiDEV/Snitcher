import React, { useState } from "react";
import Nightsky from "../components/Nightsky";
import { Navigate } from "react-router-dom";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import Price from "../components/Price";
import { Box } from '@chakra-ui/react';
function Home() {
    if (localStorage.getItem("accessToken")) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <Box minHeight={'800px'}>
                <Nightsky />
                <Hero />
            </Box>
            <div id="features">
                <Feature />
            </div>
            <div id="prices">
                <Price id="prices" />
            </div>
            <Footer />
        </>
    )
}

export default Home;