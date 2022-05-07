import React from 'react'
import {
    Flex,
    Text,
    Link,
    Icon,
    Menu,
    MenuButton
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


export default function NavItem({ icon, title, active, navSize, href }) {
    const history = useNavigate();

    return (
        <Flex
            mt={5}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "#54a0ff"}
                    p={3}
                    borderRadius={8}
                    color={active && "#fff"}
                    _hover={{ textDecor: 'none', backgroundColor: (active ? "#54a0ff" : "#e2e8f0") }}
                    w={navSize == "large" && "100%"}
                    onClick={() => history(href)}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}