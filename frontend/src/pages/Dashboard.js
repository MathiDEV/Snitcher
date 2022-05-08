import React, { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import DashboardContent from "../dashboard/Dashboard";
import Search from "../dashboard/Search";
import Applet from "../dashboard/Applet";
import { Flex, Box } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";


function Dashboard() {
    var { id, type } = useParams();
    var page, page_name;

    // console.log(id, type);

    if (!localStorage.getItem("accessToken")){
        return <Navigate to="/" />
    }

    switch (id) {
        case 'search':
            page = <Search data={type}/>;
            page_name = 'search';
            break;
        case 'applet':
            page = <Applet data={type}/>;
            page_name = 'applet';
            break;
        default:
            page = <DashboardContent data={type}/>;
            page_name = 'dashboard';
            break;
    }

    if (!localStorage.getItem('ethvalue')) {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(res => {
            res.json().then(data => {
                localStorage.setItem('ethvalue', data.ethereum.usd)
            })
        })
    }



    return (
        <>
            <Navbar />
            <Flex height={"100%"}>
                <Sidebar page={page_name} />
                <Box w='5'/>
                {page}
            </Flex>
        </>
    )
}

export default Dashboard;