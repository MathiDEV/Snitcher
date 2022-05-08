import { Box, Text, Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FiX } from 'react-icons/fi'
import TopWallets from '../components/TopWallets'
import { ScaleLoader } from "react-spinners";
import WalletCard from '../components/WalletCard'

export default function WalletResult({ data }) {
    if (data === undefined)
        return (<Box py={6}>
            <TopWallets />
        </Box>);
    if (data === null) {
        return (<Center py={6}>
            <ScaleLoader color="#54a0ff" size={20} />
        </Center>);
    }
    if (data.status) {
        return (<Center py={6}>
            <WalletCard data={data.data} />
        </Center>);
    }
    return (<Center py={6}>
        <Box
            minW={'320px'}
            w='50%'
            maxW={'620px'}
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