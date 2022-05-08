import { InputGroup, InputLeftElement, InputRightElement, Button, Badge, Box, Flex, Input, Center, Stack, Text, Divider, FormControl, FormHelperText, FormErrorMessage, Link, useToast } from '@chakra-ui/react'
import { FiHash, FiX, FiBox, FiMessageCircle } from 'react-icons/fi'
import { useState } from 'react'
import EventsMenu from '../components/automations/Events'
import ActionsMenu from '../components/automations/Actions'
import { FiActivity, FiDownload, FiUpload, FiLogOut, FiLogIn, FiCheck, FiArrowRight, FiShuffle, FiCpu } from "react-icons/fi"
import { SiDiscord, SiMicrosoftteams, SiTelegram } from 'react-icons/si'

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
    const [confirmation, setConfirmation] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const [action, setAction] = useState(undefined)
    const [title, setTitle] = useState(undefined)
    const [actionForm, setActionForm] = useState({})
    const validationError = (confirmation && (confirmation < 1 || confirmation > 128 || parseFloat(confirmation) != parseInt(confirmation)))
    const walletError = (wallet && !wallet.match(/^0x[0-9a-fA-F]{40}$/))
    const titleError = title && !title.match(/^[\w ]+$/)
    const allActions = [
        {
            "enum": "DISCORD",
            "name": "Discord Webhook",
            "icon": <SiDiscord />,
            "check": (action) => {
                if (action.url && !action.url.match(/^https:\/\/([\w.]+).com\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9-_]+/))
                    return true;
                return false;
            },
            "form": (error) => (<Box>
                <FormControl isInvalid={error}>
                    <InputGroup mt={3} w='100%'>
                        <InputLeftElement children={<SiDiscord />} />
                        {(Object.values(actionForm).filter(function (el) { return el.length; }).length && !error) ?
                            <InputRightElement
                                zIndex={0}
                                color={'green.500'}
                                children={<FiCheck />}
                            /> : <></>}
                        <Input placeholder='Webhook URL' type="text" onChange={(event) => {
                            setActionForm({ ...actionForm, url: event.target.value })
                        }} />
                    </InputGroup>
                    {
                        error ?
                            <FormErrorMessage>
                                Invalid Webhook URL
                            </FormErrorMessage>
                            : <></>
                    }
                </FormControl>
            </Box>)
        },
        {
            "enum": "TELEGRAM",
            "name": "Telegram Bot",
            "icon": <SiTelegram />,
            "check": (action) => {
                if (action.chatId && !action.chatId.match(/^[0-9]{6,15}$/))
                    return true;
                return false;
            },
            "form": (error) => (<Box>
                <FormControl isInvalid={error}>
                    <InputGroup mt={3} w='100%'>
                        <InputLeftElement children={<SiTelegram />} />
                        {(Object.values(actionForm).filter(function (el) { return el.length; }).length && !error) ?
                            <InputRightElement
                                zIndex={0}
                                color={'green.500'}
                                children={<FiCheck />}
                            /> : <></>}
                        <Input placeholder='Chat ID' type="number" onChange={(event) => {
                            setActionForm({ ...actionForm, chatId: event.target.value })
                        }} />
                    </InputGroup>
                    {
                        error ?
                            <FormErrorMessage>
                                Invalid Chat ID
                            </FormErrorMessage>
                            : <FormHelperText>
                                To use the bot, you need to start a conversation with it. <Link color={'blue.300'} target={'_blank'} href='https://t.me/SnitcherNotifBot'>Click here</Link> to get started.
                            </FormHelperText>
                    }
                </FormControl>
            </Box>)
        },
        {
            "enum": "TEAMS",
            "name": "Teams Webhook",
            "icon": <SiMicrosoftteams />,
            "check": (action) => {
                if (action.url && !action.url.match(/^https:\/\/[\w.-]+office\.com\/webhookb2\/[\w@-]+\/IncomingWebhook\/[\w@-]+\/[\w@-]+$/))
                    return true;
                return false;
            },
            "form": (error) => (<Box>
                <FormControl isInvalid={error}>
                    <InputGroup mt={3} w='100%'>
                        <InputLeftElement children={<SiMicrosoftteams />} />
                        {(Object.values(actionForm).filter(function (el) { return el.length; }).length && !error) ?
                            <InputRightElement
                                zIndex={0}
                                color={'green.500'}
                                children={<FiCheck />}
                            /> : <></>}
                        <Input placeholder='Webhook URL' type="text" onChange={(event) => {
                            setActionForm({ ...actionForm, url: event.target.value })
                        }} />
                    </InputGroup>
                    {
                        error ?
                            <FormErrorMessage>
                                Invalid Teams Webhook
                            </FormErrorMessage>
                            : <></>
                    }
                </FormControl>
            </Box>)
        },
        {
            "enum": "SMS",
            "name": "Text Message",
            "icon": <FiMessageCircle />,
            "check": (action) => {
                if (action.number && !action.number.match(/^\+[1-9]\d{1,14}$/))
                    return true;
                return false;
            },
            "form": (error) => (<Box>
                <FormControl isInvalid={error}>
                    <InputGroup mt={3} w='100%'>
                        <InputLeftElement children={<FiMessageCircle />} />
                        {(Object.values(actionForm).filter(function (el) { return el.length; }).length && !error) ?
                            <InputRightElement
                                zIndex={0}
                                color={'green.500'}
                                children={<FiCheck />}
                            /> : <></>}
                        <Input placeholder='Phone number' type="text" onChange={(event) => {
                            setActionForm({ ...actionForm, number: event.target.value })
                        }} />
                    </InputGroup>
                    {
                        error ?
                            <FormErrorMessage>
                                Invalid international phone number
                            </FormErrorMessage>
                            : <></>
                    }
                </FormControl>
            </Box>)
        }
    ]

    function getAction(action) {
        for (let act of allActions)
            if (act.enum === action)
                return act
        return undefined
    }

    const actionError = action && getAction(action) && getAction(action).check(actionForm)
    const toast = useToast()
    return (
        <Box w='100%' mt={5}>
            <FormControl display={'block'} m={'auto'} w='100%' maxW={'500px'} isInvalid={titleError}>
                <InputGroup mt={3}>
                    <Input placeholder='My applet name' type="text" value={title} onChange={(event) => {
                        setTitle(event.target.value)
                    }} />
                </InputGroup>
                {titleError ?
                    <FormErrorMessage>
                        Title must be alphanumeric
                    </FormErrorMessage> : <></>}
            </FormControl>
            <Center py={6}>
                <Stack alignItems={'center'} maxW={'400px'} w={'full'} spacing={0}>
                    <Box
                        w={'full'}
                        bg={'white'}
                        transition='box-shadow 1s'
                        border={'10px solid white'}
                        boxShadow={(event && confirmation && !validationError) ? 'md' : '2xl'}
                        rounded={'2xl'}
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
                                    <Box>
                                        <Divider mb={3} mt={1} />
                                        <Flex alignItems={"center"}>
                                            Event
                                            <Badge fontSize={"md"} ml={2}>
                                                <Flex alignItems={"center"}>{getEvent(event).name}
                                                    <FiX cursor={"pointer"} onClick={() => { setEvent(undefined); setConfirmation(undefined) }} />
                                                </Flex>
                                            </Badge>
                                        </Flex>
                                        <FormControl isInvalid={validationError}>
                                            <InputGroup mt={3} w='100%'>
                                                <InputLeftElement
                                                    zIndex={0}
                                                    children={<FiBox />}
                                                />
                                                {(!validationError && confirmation && confirmation.length) ?
                                                    <InputRightElement
                                                        zIndex={0}
                                                        color={'green.500'}
                                                        children={<FiCheck />}
                                                    /> : <></>}
                                                <Input min="1" max="128" step="1" type='number' placeholder='Confirmation blocks' value={confirmation} onChange={(event) => {
                                                    { setConfirmation(event.target.value) }
                                                }
                                                } />
                                            </InputGroup>
                                            {validationError ?
                                                <FormErrorMessage>
                                                    Number between 1 and 128
                                                </FormErrorMessage> : <></>}
                                        </FormControl>
                                    </Box>
                                    : <EventsMenu events={allEvents} onChange={(param) => { setEvent(param) }} />
                            }
                        </Stack>
                    </Box>
                    <Box w={3} h={9} backgroundColor={'white'} transition='box-shadow 1s' boxShadow={(event && confirmation && !validationError) ? 'md' : '2xl'}></Box>
                    <Box
                        w={'full'}
                        bg={'white'}
                        transition='box-shadow 1s'
                        boxShadow={(wallet && !walletError) ? 'md' : '2xl'}
                        rounded={'2xl'}
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
                            <FormControl isInvalid={walletError}>
                                <InputGroup w='90%' m={'auto'} mt={3} >
                                    <InputLeftElement
                                        children={<FiHash />}
                                    />
                                    {(!walletError && wallet && wallet.length) ?
                                        <InputRightElement
                                            zIndex={0}
                                            color={'green.500'}
                                            children={<FiCheck />}
                                        /> : <></>}
                                    <Input type='text' placeholder='Wallet' value={wallet} onChange={(event) => {
                                        { setWallet(event.target.value) }
                                    }} />
                                </InputGroup>
                                {walletError ?
                                    <FormErrorMessage>
                                        Invalid wallet format
                                    </FormErrorMessage> : <></>}
                            </FormControl>
                        </Stack>
                    </Box>
                    <Box w={3} h={9} backgroundColor={'white'} transition='box-shadow 1s' boxShadow={(wallet && !walletError) ? 'md' : '2xl'}></Box>
                    <Box
                        w={'full'}
                        bg={'white'}
                        transition='box-shadow 1s'
                        boxShadow={(action && Object.values(actionForm).filter(function (el) { return el.length; }).length && !actionError) ? 'md' : '2xl'}
                        rounded={'2xl'}
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
                            {
                                (action) ?
                                    <Box>
                                        <Divider mb={3} mt={1} />
                                        <Flex alignItems={"center"} justifyContent={'center'}>
                                            Action
                                            <Badge fontSize={"md"} ml={2}>
                                                <Flex alignItems={"center"}>{getAction(action).name}
                                                    <FiX cursor={"pointer"} onClick={() => { setAction(undefined); setActionForm({}) }} />
                                                </Flex>
                                            </Badge>
                                        </Flex>
                                        {getAction(action).form(actionError)}
                                    </Box>
                                    : <ActionsMenu actions={allActions} onChange={(param) => { setAction(param); setActionForm({}); console.log(param) }} />
                            }
                        </Stack>
                    </Box>

                </Stack>

            </Center>
            <Center>
                <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'blue.400'}
                    color={'white'}
                    maxW={'200px'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                        bg: '#4886d4',
                    }}
                    _focus={{
                        bg: '#54a0ff',
                    }}
                    _active={{
                        bg: '#4886d4',
                    }}
                    onClick={()=>{
                        if (validationError || titleError || walletError || actionError || !title || !event || !confirmation || !wallet || !action || Object.values(actionForm).filter(function (el) { return el.length; }).length == 0)
                            return toast({
                                title: 'Your applet structure is incomplete.',
                                description: "Check the data you entered before submitting again",
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            })
                    }}
                    >
                    <FiCpu style={{ "marginRight": 5 }} /> Deploy
                </Button>
            </Center>
        </Box>
    )
}

export default Applet;