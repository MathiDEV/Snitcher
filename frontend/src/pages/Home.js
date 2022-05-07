import React, { useEffect, useState } from "react";
import Nightsky from "../components/Nightsky";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null);

    if (localStorage.getItem("accessToken")){
        return <Navigate to="/dashboard" />
        setToken(localStorage.getItem("acessToken"));
    }
    // if(token)
    //     return <Navigate to="/dashboard" />;

    return (
        <>
            <Nightsky />
        </>
    )
}

export default Home;