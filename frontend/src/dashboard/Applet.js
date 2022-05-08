import { InputGroup, InputLeftElement, Heading, Box, Flex, Input, Center, Stack, Text, Button } from '@chakra-ui/react'
import { FiHash } from 'react-icons/fi'
import { useState } from 'react'
import EventsMenu from '../components/automations/Events'
import ActionsMenu from '../components/automations/Actions'
import { FiActivity, FiDownload, FiUpload, FiLogOut, FiLogIn, FiCheck, FiArrowRight, FiShuffle } from "react-icons/fi"

function getEvent(event) {
    for (let ev of allEvents)
        if (ev.enum === event)
            return ev
    return undefined
}
const allEvents = [
    {
        "enum": "ADDRESS_ACTIVITY",
        "name": "Any activity",
        "icon": <FiActivity />,
        "command": ""
    },
    {
        "enum": "ADDRESS_RECEIVED_NATIVE_CURRENCY",
        "name": "Receiving Currency",
        "icon": <FiDownload />,
        "command": ""
    },
    {
        "enum": "ADDRESS_SENT_NATIVE_CURRENCY",
        "name": "Sending Currency",
        "icon": <FiUpload />,
        "command": ""
    },
    {
        "enum": "EVENT_TRANSFER",
        "name": "Token Transfer",
        "icon": <FiLogOut />,
        "command": "ERC20"
    },
    {
        "enum": "EVENT_MINT",
        "name": "Token Mint",
        "icon": <FiLogIn />,
        "command": "ERC20"
    },
    {
        "enum": "EVENT_APPROVAL",
        "name": "Token Approval",
        "icon": <FiCheck />,
        "command": "ERC20"
    },
    {
        "enum": "ERC721_EVENT_TRANSFER",
        "name": "Token Transfer",
        "icon": <FiLogOut />,
        "command": "ERC721"
    }
    ,
    {
        "enum": "ERC1155_EVENT_TRANSFER_SINGLE",
        "name": "Single Transfer",
        "icon": <FiArrowRight />,
        "command": "ERC1155"
    }
    ,
    {
        "enum": "ERC1155_EVENT_TRANSFER_BATCH",
        "name": "Batch Transfer",
        "icon": <FiShuffle />,
        "command": "ERC1155"
    }
]

function Applet() {
    const [event, setEvent] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const [action, setAction] = useState(undefined)
    console.log(event)
    return (
        <Box w='100%' mt={5}>
            <Center py={6}>
                <Stack maxW={'400px'} w={'full'} spacing={10}>
                    <Box
                        w={'full'}
                        bg={'white'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Stack
                            textAlign={'center'}
                            p={6}
                            color={'gray.800'}
                            align={'center'}>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                                bg={'#e3efff'}
                                p={2}
                                px={3}
                                color={'#0250b8'}
                                rounded={'full'}>
                                LISTEN FOR
                            </Text>
                            {
                                (event) ?
                                    <p>Event {getEvent(event).name}</p>
                                    : <EventsMenu events={allEvents} onChange={(param) => { setEvent(param) }} />
                            }
                        </Stack>
                    </Box>
                    <Box
                        w={'full'}
                        bg={'white'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Stack
                            textAlign={'center'}
                            p={6}
                            color={'gray.800'}
                            align={'center'}>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                                bg={'#e3efff'}
                                p={2}
                                px={3}
                                color={'#0250b8'}
                                rounded={'full'}>
                                ON WALLET
                            </Text>
                            <InputGroup mt={3} w='90%'>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FiHash />}
                                />
                                <Input type='text' placeholder='Wallet' />
                            </InputGroup>
                        </Stack>
                    </Box>
                    <Box
                        w={'full'}
                        bg={'white'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Stack
                            textAlign={'center'}
                            p={6}
                            color={'gray.800'}
                            align={'center'}>
                            <Text
                                fontSize={'sm'}
                                fontWeight={'bold'}
                                bg={'#e3efff'}
                                p={2}
                                px={3}
                                color={'#0250b8'}
                                rounded={'full'}>
                                AND TRIGGER
                            </Text>
                            <ActionsMenu />
                        </Stack>
                    </Box>
                </Stack>
            </Center>
        </Box>
    )
}

export default Applet;