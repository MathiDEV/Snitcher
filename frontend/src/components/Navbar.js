
import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import Logo from "./Logo";

const NavBar = ({background}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const toggle = () => setIsOpen(!isOpen);

    return (
      <NavBarContainer background={background}>
        <Logo
          w="100px"
          color={["white", "white", "white", "white"]}
        />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </NavBarContainer>
    );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);



const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

// const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
//   return (
//     <Link href={to}>
//       <Text display="block" {...rest}>
//         {children}
//       </Text>
//     </Link>
//   );
// };

const MenuLinks = ({ isOpen }) => {
    const [currentAccount, setCurrentAccount] = React.useState(null);
    const isInstalled = async () => 
{
    const { ethereum } = window;

    
    if(!ethereum) {
        console.log(ethereum);
        alert("You might not have MetaMask ! Install it first");
        return;
    }else{
        alert("MetaMask existe !");
    }
    
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    console.log(accounts);

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
      console.log("oui")
    return;
}
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        {/* <MenuItem onClick={()=> console.log("oui")} isLast > */}
          <Button
            onClick={() => isInstalled()}
            size="sm"
            rounded="md"
            color={["black", "white", "black", "black"]}
            bg={["white", "white", "white", "white"]}
            _hover={{
              bg: ["#54a0ff", "#54a0ff", "#54a0ff", "#54a0ff"]
            }}
          >
            Connect with MetaMask
          </Button>
        {/* </MenuItem> */}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children,  background}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
    //   mb={8}
      p={8}
      bg={background == "transparent" ? ["transparent", "transparent", "transparent", "transparent"] : ["black", "black", "black", "black"]}
      color={["white", "white", "black", "black"]}
    >
      {children}
    </Flex>
  );
};

export default NavBar;