import React, { useState } from 'react'
import {
    Box,
    Flex,
    IconButton,
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiSearch,
    FiPlus,
} from 'react-icons/fi'
import NavItem from '../components/NavItem'

export default function Sidebar({ page }) {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Box w={'63px'} zIndex={3}>
            <Flex
                backgroundColor={'white'}
                pos="sticky"
                top={0}
                h="100vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                w={navSize == "small" ? "63px" : "200px"}
                flexDir="column"
                justifyContent="space-between">
                <Flex
                    p="10px"
                    flexDir="column"
                    w="100%"
                    alignItems="flex-start"
                    as="nav">
                    <IconButton
                        background="none"
                        mt={5}
                        icon={<FiMenu />}
                        onClick={() => {
                            if (navSize == "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                    <NavItem navSize={navSize} icon={FiHome} title="Dashboard" href="/dashboard" active={page == "dashboard"} />
                    <NavItem navSize={navSize} icon={FiSearch} title="Search" href="/dashboard/search" active={page == "search"} />
                    <NavItem navSize={navSize} icon={FiPlus} title="Applet" href="/dashboard/applet" active={page == "applet"} />
                </Flex>
            </Flex>
        </Box>
    )
}