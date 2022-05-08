import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import WalletCard from '../components/WalletCard'

export default function TopWallets(props) {
    const [wallets, setWallets] = useState(undefined);
    fetch("http://localhost:3000/bestusers").then(res => { }).then(data => {
        setWallets(data);
    }).catch(err => {
        setWallets(null);
    });

    return (
        <>
            <Heading textAlign={"center"} mb={"5"} fontWeight={"light"} fontSize={"3xl"}><b>Top 10</b> best wallets</Heading>
            <Flex w="100%" flexWrap={"wrap"} gap={"20px"} justify={"center"}>
                {(wallets === undefined) ? <ScaleLoader color="#00BFFF" /> :
                    (wallets === null) ? <h1>No wallets found :(</h1> :
                        wallets.map(wallet => {
                            return (<WalletCard data={wallet} />)
                        })
                }
            </Flex>
        </>
    );
}