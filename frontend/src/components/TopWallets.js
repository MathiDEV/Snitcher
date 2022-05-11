import React from "react";
import { Flex, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import WalletCard from '../components/WalletCard'
import Snitcher from '../api/Snitcher'

export default function TopWallets(props) {
    const [wallets, setWallets] = useState(undefined);
    const toast = useToast();
    if (wallets === undefined) {
        Snitcher.getTopWallets()
        .then(data => {
            setWallets(data);
        }).catch(err => {
            toast({
                title: "Error",
                description: "Failed to get wallets",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            setWallets(null);
        })
    }
    return (
        <>
            <Heading textAlign={"center"} mb={"5"} fontWeight={"light"} fontSize={"3xl"}><b>Top 10</b> best wallets</Heading>
            <Flex w="100%" flexWrap={"wrap"} gap={"20px"} justify={"center"}>
                {(wallets === undefined) ? <ScaleLoader color="#54a0ff" /> :
                    (wallets === null) ? <h1>No wallets found :(</h1> :
                        wallets.map((wallet, i) => {
                            return (<WalletCard key={"wallet"+i}data={wallet} />)
                        })
                }
            </Flex>
        </>
    );
}