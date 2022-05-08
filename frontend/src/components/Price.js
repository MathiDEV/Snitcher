import {
    Box,
    Button,
    Divider,
    Heading,
    List,
    ListIcon,
    ListItem,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { FaCheckCircle } from 'react-icons/fa';
  
  const freePlan = [
    { id: 1, desc: '3 Applets' },
    { id: 2, desc: 'Searching Engine' },
    { id: 3, desc: 'Monthly Updates' },
  ];
  const snitcher = [
    { id: 1, desc: 'Infinite Applets' },
    { id: 2, desc: 'Improved Searching Engine' },
    { id: 3, desc: 'Monthly Updates' },
  ];

  const PackageTier = ({
    title,
    options,
    typePlan,
    checked = false,
  }) => {
    const colorTextLight = checked ? 'white' : 'purple.600';
    const bgColorLight = checked ? 'purple.400' : 'gray.300';
  
    const colorTextDark = checked ? 'white' : 'purple.500';
    const bgColorDark = checked ? 'purple.400' : 'gray.300';
  
    return (
      <Stack
        p={3}
        py={3}
        justifyContent={{
          base: 'flex-start',
          md: 'space-around',
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
        alignItems={{ md: 'center' }}>
        <Heading width={300} size={'md'}>{title}</Heading>
        <List width={300} spacing={3} textAlign="start">
          {options.map((desc, id) => (
            <ListItem key={desc.id}>
              <ListIcon as={FaCheckCircle} color="green.500" />
              {desc.desc}
            </ListItem>
          ))}
        </List>
        <Heading width={300} size={'xl'}>{typePlan}<Text as='span' fontSize={"xs"}>/month</Text></Heading>
      </Stack>
    );
  };
  const ThreeTierPricingHorizontal = () => {
    return (
      <Box py={6} px={5} min={'100vh'} bg = "#f5f6fa">
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'space-around',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
            <Stack
              width={{
                base: '100%',
                md: '40%',
              }}
              textAlign={'center'}>
              <Heading size={'lg'}>
                The Right Plan for <Text color="blue.400">You !</Text>
              </Heading>
            </Stack>
            <Stack
              width={{
                base: '100%',
                md: '60%',
              }}>
              <Text textAlign={'center'}>
                  We know that everything is expensive in the blockchain ! So we want to help you as much as possible giving you free access to most of our features !
                   But if you want to support us you can buy the 
              </Text>
            </Stack>
          </Stack>
          <Divider />
          <PackageTier title={'Free Plan'} typePlan="$0.00" options={freePlan} />
          <Divider />
          <PackageTier title={'Snitcher'} typePlan="$15.00" options={snitcher} />
        </Stack>
      </Box>
    );
  };
  
  export default ThreeTierPricingHorizontal;