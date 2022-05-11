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
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import { ReactElement } from 'react';
import Iphone from "../assets/Iphone.png";
import Arrow from "../assets/Background(1).png";
  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  export default function SplitWithImage() {
    return (
      <Container maxW={'6xl'} py={12} mb={10}>
        <Flex id="flexHero">
          <Stack spacing={3} position = "relative">
            <Heading color={"white"} fontSize={"55"}>INTERACT <Text as='span' bgGradient='linear(to-t, #5076FF, #69A5FF)' bgClip={'text'}>SMARTER</Text> WITH BLOCKCHAIN</Heading>
            <Text color={'white'} fontSize={'lg'}>
              Create your own applets and stay connected to the blockchain !
            </Text>
            <Image
            id="arrow"
            w = {400}
            position = "absolute"
            float = "right"
            bottom={"100"}
            right="100"
              rounded={'md'}
              alt={'feature image'}
              src={
                Arrow
              }
              objectFit={'cover'}
            />
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>

            </Stack>
          </Stack>
            <Image
            id="phone"
            height="auto"
            width="30%"
              alt={'feature image'}
              src={
                Iphone
              }
                />
          </Flex>
      </Container>
    );
  }