import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import WalletCard from '../components/WalletCard'

export default function TopWallets(props) {
    const [wallets, setWallets] = useState(undefined);

    if (wallets === undefined) {
        fetch("https://api.snitcher.socialeo.net/api/user/bestusers", { headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") } }).then(data => {
            data.json().then(data => {
                setWallets(data);
            }).catch(err => {
                setWallets(null);
            });
        }).catch(err => {
            setWallets(null);
        });
    }
    return (
        <>
            <Heading textAlign={"center"} mb={"5"} fontWeight={"light"} fontSize={"3xl"}><b>Top 10</b> best wallets</Heading>
            <Flex w="100%" flexWrap={"wrap"} gap={"20px"} justify={"center"}>
                {(wallets === undefined) ? <ScaleLoader color="#54a0ff" /> :
                    (wallets === null) ? <h1>No wallets found :(</h1> :
                        wallets.map(wallet => {
                            return (<WalletCard data={wallet} />)
                        })
                }
            </Flex>
        </>
    );
}