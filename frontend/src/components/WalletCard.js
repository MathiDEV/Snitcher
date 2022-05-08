import React from "react";
import { Box, Avatar, Text, Stack, Badge, Button, Flex, Td, Thead, Table, TableContainer, Tr, Th, Tbody } from "@chakra-ui/react";
import { FiBookmark, FiCpu } from 'react-icons/fi'
import { FaEthereum } from 'react-icons/fa'
import WalletLogo from '../assets/wallet.png'

export default function Logo({ data }) {
    let estimation;
    if (localStorage.getItem('ethvalue')) {
        estimation = (parseFloat(data.balance.formatted) * parseFloat(localStorage.getItem('ethvalue'))).toFixed(2);
    }
    return (
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
                    bg: data.balance.raw == 0 ? 'gray.400' : 'green.300',
                    border: '2px solid white',
                    rounded: 'full',
                    pos: 'absolute',
                    bottom: 0,
                    right: 3,
                }}
            />
            <Text fontWeight={600} color={'gray.500'} mb={4}>
                {data.address}
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
                            <Td>{data.balance.hex}</Td>
                        </Tr>
                        <Tr>
                            <Td>Formatted</Td>
                            <Td>{data.balance.formatted} {data.currencySymbol}</Td>
                        </Tr>
                        {(estimation == undefined)
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
                    <Flex align={'center'}><FaEthereum />{data.network}</Flex>
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
                        bg: '#4886d4',
                    }}
                    _focus={{
                        bg: '#54a0ff',
                    }}
                    _active={{
                        bg: '#4886d4',
                    }}>
                    <FiCpu style={{ "marginRight": 5 }} /> Automatize
                </Button>
            </Stack>
        </Box>
    );
}