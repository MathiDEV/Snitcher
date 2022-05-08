import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Tag,
    useColorModeValue,
    Image
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import Logo from "../assets/icon.png";
  
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
  export default function LargeWithLogoCentered() {
    return (
      <Box
      justifyContent={"center"}
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 0, sm: 1, md: 3 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Product</ListHeader>
              <Link href={'#root'}>Overview</Link>
              <Stack direction={'row'} align={'center'} spacing={2}>
                <Link href={'#features'}>Features</Link>
              </Stack>
              <Link href={'#prices'}>Pricing</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Company</ListHeader>
              <Link href={'#'}>About Us</Link>
              <Link href={'#'}>Contact Us</Link>
              <Link href={'#'}>Partners</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Legal</ListHeader>
              <Link href={'#'}>Cookies Policy</Link>
              <Link href={'/privacy_policy'}>Privacy Policy</Link>
              <Link href={'#'}>Terms of Service</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
            <Image width={35} src={Logo}/>
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © 2022 Snitcher. All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }