
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


const testAccounts = ["AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER","AZERAZERAZERAZERAZER"]


export default function Applets() 
{
    const [accounts, setAccounts] = useState(testAccounts);


    console.log(accounts);
    return (
<Stack  direction={'column'} 
        height="500px"
        maxwidth="50px" 
        width={400}
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
          <Flex alignItems={"center"}><FiCpu style={{"margin" : "0 0 0 5px", "font-size" : "30px"}}/><Text ml= "2"fontSize={30} fontWeight="600" color={'black'}>My Applets </Text></Flex>
            <Box         overflow={"scroll"}>
            {accounts.map((data) => {
                return (
                    <Flex justify={"space-between"} alignItems='center' mt={5} mb={5} pr="5" pl="5">
                        <Text fontWeight={600} color={'gray.500'} >
                            {data}
                        </Text>
                        <Flex as='span' alignItems={"center"} ml="10" w={125}>
                            <Spacer/>
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
                                }}>
                            <FiTrash2 as='span'/>
                        </Button>
                        <Spacer/>
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
                                >
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