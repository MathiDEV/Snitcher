
import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    useColorModeValue,
    Box,
    Button,
    Spacer,
    useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { FiCpu } from 'react-icons/fi';



export default function Applets() {
    const [accounts, setAccounts] = useState([]);
    const toast = useToast();

    function wipToast() {
        return toast({
            title: 'WORK IN PROGRESS',
            description: 'This feature is not yet available',
            status: 'info',
            duration: 5000,
            isClosable: true,
        })
    }


    useEffect(() => {
        fetch("http://192.168.1.13:3000/api/user/automations", {
            headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") },
        }).then((resp) => resp.json())
            .then((data) => setAccounts(data.automations));
    }, [])
    return (
        <Stack direction={'column'}
            height="500px"
            maxwidth="50px"
            width={400}
            mt="10" ml={10} p="3"
            borderRadius={"xl"} boxShadow={"2xl"}
        >
            <Flex alignItems={"center"}><FiCpu style={{ "margin": "0 0 0 5px", "font-size": "30px" }} /><Text ml="2" fontSize={30} fontWeight="600" color={'black'}>My Applets </Text></Flex>
            <Box overflowY={"auto"}>
                {accounts.map((data) => {
                    return (
                        <Flex justify={"space-between"} alignItems='center' mt={5} mb={5} pr="5" pl="5">
                            <Text fontWeight={600} color={'gray.500'} >
                                {JSON.parse(data.options).title}
                            </Text>
                            <Flex as='span' alignItems={"center"} ml="10" w={125}>
                                <Spacer />
                                <Button rounded={'full'}
                                    size={"3xl"}
                                    fontSize={'xl'}
                                    bg={'red.400'}
                                    color="white"
                                    p="2"
                                    boxShadow={
                                        '0px 1px 25px -5px rgb( 220 20 60 / 48%), 0 10px 10px -5px rgb(220 20 60 / 43%)'
                                    }
                                    _hover={{
                                        bg: '#DC143C',
                                    }}
                                    _focus={{
                                        bg: 'red.400',
                                    }}
                                    _active={{
                                        bg: '#DC143C',
                                    }}
                                    onClick={wipToast}>
                                    <FiTrash2 as='span' />
                                </Button>
                                <Spacer />
                                <Button rounded={'full'}
                                    size={"3xl"}
                                    fontSize={'xl'}
                                    p="2"
                                    _hover={{
                                        bg: 'gray',
                                    }}
                                    _focus={{
                                        bg: 'gray.400',
                                    }}
                                    _active={{
                                        bg: 'gray',
                                    }}
                                    onClick={wipToast}>
                                    <FiEdit2 as='span' />
                                </Button>
                            </Flex>
                        </Flex>
                    )
                })}
            </Box>
        </Stack>
    )
}