import React, { useEffect, useState } from "react";
import {
    useParams
} from "react-router-dom";
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import DashboardContent from "../dashboard/Dashboard";
import Search from "../dashboard/Search";
import { Flex, Box } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";

<<<<<<< HEAD

=======
>>>>>>> 032cf43519c079c8ec33ca538b558df5a6375ef0
function Dashboard() {
    var { id } = useParams();
    var page, page_name;
    switch (id) {
        case 'search':
            page = <Search />;
            page_name = 'search';
            break;
        default:
            page = <DashboardContent />;
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
<<<<<<< HEAD
            <>
                <Navbar />
                <Sidebar />
            </>

=======
        <>
            <Navbar />
            <Flex>
                <Sidebar page={page_name} />
                <Box w='5'/>
                {page}
            </Flex>
        </>
>>>>>>> 032cf43519c079c8ec33ca538b558df5a6375ef0
    )
}

export default Dashboard;