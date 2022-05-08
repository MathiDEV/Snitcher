import React from "react";
import { Box, Flex, Text, Square } from "@chakra-ui/react";
import logo from '../assets/icon.png'

export default function Logo(props) {
  return (
    <Box {...props}>
        <Flex align="center">
            <img src={logo} alt="Logo of Snitcher" style={{"height":"50px"}}/>
            <Text fontSize="2xl" fontWeight="bold" fontFamily="'Lato', sans-serif" ml="5" id="logo">
            Snitcher
            </Text>
        </Flex>
    </Box>
  );
}