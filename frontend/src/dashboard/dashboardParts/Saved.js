
import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Box,
    Button,
    Spacer
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import { ReactElement, useState} from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { FiCpu } from 'react-icons/fi';
import { FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';



const testAccounts = ["0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa","0x00000000219ab540356cbb839cbe05303d7705fa"]
export default function Saved()
{
    const [accounts, setAccounts] = useState(testAccounts);
    console.log(accounts);


    function deleteSaved(address){
        fetch("http://192.168.1.13:3000/api/user/")
    }


    return (
        <Stack  direction={'column'}
        height="500px"
        maxwidth="100px"
        // align={'center'}
        mt="10" ml={10} p="3"
        borderRadius={"xl"} boxShadow={"2xl"}
        // divider={
        //     <StackDivider

        //       borderColor={useColorModeValue('#CCC', '#CCC')}
        //     />
        //   }
        >
        {/* <Container> */}
          <Flex alignItems={"center"}><FiBookmark style={{"margin" : "0 0 0 5px", "font-size" : "30px"}}/><Text ml= "2"fontSize={30} fontWeight="600" color={'black'}>Saved Wallets </Text></Flex>
            <Box         overflow={"scroll"}>
            {accounts.map((data) => {
                return (
                    <Flex justify={"space-between"} alignItems='center' mt={5} mb={5} pr="5">
                        <Text fontWeight={600} color={'gray.500'} >
                            <Link to={"/dashboard/search/"+data}>
                            {data}
                            </Link>
                        </Text>
                        <Flex as='span' alignItems={"center"} ml="10" w={125}>
                        <Button rounded={'full'}
                                size={"3xl"}
                                fontSize={'xl'}
                                bg={'red.400'}
                                color="white"
                                p="2"
                                ml={10}
                                mr="5"
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
                                onClick = {() => deleteSaved(data)}>
                            <FiTrash2 as='span'/>
                        </Button>
                        <Link to={"/dashboard/applet/"+data}>
                            <Button
                    // flex={1}
                    size={"3lx"}
                    p="2"
                    fontSize={'xl'}
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
                    <FiCpu />
                </Button>
                </Link>
                        </Flex>
                    </Flex>
                )
            })}
            </Box>
        </Stack>
        // </Container>
    );
};