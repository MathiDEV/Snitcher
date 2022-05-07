import React, { useState, Link } from 'react'
import {
    Flex,
    IconButton,
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiSearch,
} from 'react-icons/fi'
import NavItem from '../components/NavItem'

export default function Sidebar({page}) {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            h="95vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={navSize == "small" ? "63px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="10px"
                flexDir="column"
                w="100%"
                alignItems="flex-start"
                as="nav"
            >
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
            </Flex>
        </Flex>
    )
}