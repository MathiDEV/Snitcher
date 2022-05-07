import { Box, Avatar, Text, Stack, Badge, Center, Button, Flex, Td, Thead, Table, TableContainer, Tr, Th, Tbody, Heading } from "@chakra-ui/react";
import React from "react";
import { FiBookmark, FiCpu, FiX } from 'react-icons/fi'
import { FaEthereum } from 'react-icons/fa'
import WalletLogo from '../assets/wallet.png'

export default function WalletResult({ data }) {
    console.log(data);
    if (!data) {
        return (<p>Loading...</p>);
    }
    if (data.status) {
        let estimation;
        if (localStorage.getItem('ethvalue')) {
            estimation = (parseFloat(data.data.balance.formatted) * parseFloat(localStorage.getItem('ethvalue'))).toFixed(2);
        }
        console.log(estimation);
        return (<Center py={6}>
            <Box
                minW={'320px'}
                w='50%'
                maxW={'620px'}
                w={'full'}
                bg={'white'}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={
                        WalletLogo
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: data.data.balance.raw == 0 ? 'gray.400' : 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {data.data.address}
                </Text>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Type</Th>
                                <Th>Balance</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Hex</Td>
                                <Td>{data.data.balance.hex}</Td>
                            </Tr>
                            <Tr>
                                <Td>Formatted</Td>
                                <Td>{data.data.balance.formatted} {data.data.currencySymbol}</Td>
                            </Tr>
                            { (estimation == undefined)
                                ? (<></>)
                                : (<Tr>
                                    <Td>Estimated</Td>
                                    <Td>${estimation}</Td>
                                  </Tr>)
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={'gray.50'}
                        fontWeight={'400'}>
                        <Flex align={'center'}><FaEthereum />{data.data.network}</Flex>
                    </Badge>
                </Stack>
                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        <FiBookmark style={{ "marginRight": 5 }} /> Save for later
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        <FiCpu style={{ "marginRight": 5 }} /> Automatize
                    </Button>
                </Stack>
            </Box>
        </Center>);
    }
    return (<Center py={6}>
        <Box
            minW={'320px'}
            w='50%'
            maxW={'620px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Box textAlign="center" py={10} px={6}>
                <Box display="inline-block">
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        bg={'red.500'}
                        rounded={'50px'}
                        w={'55px'}
                        h={'55px'}
                        textAlign="center">
                        <FiX color={'white'} style={{ "fontSize": "30px" }} />
                    </Flex>
                </Box>
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Unable to find wallet
                </Heading>
                <Text color={'gray.500'}>
                    The adress you entered may be mispelled or invalid.
                </Text>
            </Box>
        </Box>
    </Center>);
}