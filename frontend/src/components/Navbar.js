
import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import Logo from "./Logo";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { IoLogoWindows } from "react-icons/io5";

const NavBar = ({background}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [Adress, setAdress] = React.useState("test");
    const toggle = () => setIsOpen(!isOpen);
    const [currentAccount, setCurrentAccount] = React.useState(localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null);



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

let web3 = undefined;

const MenuLinks = ({ isOpen }) => {
    const { ethereum } = window;

    // console.log(currentAccount, "oui");
    // React.useEffect()
    // if (currentAccount !== null){
    //     return (
    //         <Box
    //           display={{ base: isOpen ? "block" : "none", md: "block" }}
    //           flexBasis={{ base: "100%", md: "auto" }}
    //         >
    //           <Stack
    //             spacing={8}
    //             align="center"
    //             justify={["center", "space-between", "flex-end", "flex-end"]}
    //             direction={["column", "row", "row", "row"]}
    //             pt={[4, 4, 0, 0]}
    //           >
    //             {/* <MenuItem onClick={()=> console.log("oui")} isLast > */}
    //             {/* </MenuItem> */}
    //           </Stack>
    //         </Box>
    //       );
    // }
    const handleSignMessage = async (data) =>
    {
      // console.log(data, "je suis ici");
      try {
        const address = data.address;
        const signature = await web3.eth.personal.sign(
          `You are signing a random nonce in order to login to snitcher: ${data.nonce}`,
          address,
          '' // MetaMask will ignore the password argument here
        );

        return { address , signature };
      } catch (err) {
        throw new Error(
          'You need to sign the message to be able to log in.'
        );
      }
      // setCurrentAccount("oui");
    }

    const handleAuthenticate = ({address, signature}) =>
    fetch(`http://192.168.1.13:3000/api/auth`, {
			body: JSON.stringify({ address, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());

    const IsInstalled = async () =>
    {

    if(!ethereum) {
        // console.log(ethereum);
        // alert("You might not have MetaMask ! Install it first");
        return;
    }else{
        // alert("MetaMask existe !");
    }

    if (!web3) {
      try {

        await ethereum.request({ method: 'eth_requestAccounts' });


				web3 = new Web3(window.ethereum);
        // console.log(web3);

			} catch (error) {
				window.alert('You need to allow MetaMask.');
        web3 = undefined;
				return;
			}
      const coinbase = await web3.eth.getCoinbase();
      // console.log(coinbase);

      if (!coinbase) {
        web3 = undefined;
        // window.alert('Please activate MetaMask first.');
        return;
      }

      const publicAddress = coinbase.toLowerCase();
      // setCurrentAccount(publicAddress);
      // console.log(currentAccount, "wsh la zone !");
        fetch(
          "http://192.168.1.13:3000/api/user", {
            body: JSON.stringify({"address" : publicAddress}),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',}
        )
          .then((response) => response.json())
          // If yes, retrieve it. If no, create it.
          .then((users) =>
            // console.log(users.nonce)
            users
          )
          // Popup MetaMask confirmation modal to sign message
          .then(handleSignMessage)
          // Send signature to backend on the /auth route
          .then(handleAuthenticate)
          // Pass accessToken back to parent component (to save it in localStorage)
          .then((resp) => {localStorage.setItem("accessToken", resp.token);
                          window.location.reload()})
          .catch((err) => {
            web3 = undefined;
            console.log(err);
          });
		}

    return;
}
const Disconnect = () => {
  localStorage.removeItem("accessToken");
  window.location.reload();
  console.log("oui")
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
          {currentAccount ? (<Button
            onClick={ () => {
              Disconnect();
            }}
            size="sm"
            rounded="md"
            color={["black", "white", "black", "black"]}
            bg={["white", "white", "white", "white"]}
            _hover={{
              bg: ["#54a0ff", "#54a0ff", "#54a0ff", "#54a0ff"]
            }}
          >
            Disconnect
          </Button>) : (<Button
            onClick={ () => {
              IsInstalled();
            }}
            size="sm"
            rounded="md"
            color={["black", "white", "black", "black"]}
            bg={["white", "white", "white", "white"]}
            _hover={{
              bg: ["#54a0ff", "#54a0ff", "#54a0ff", "#54a0ff"]
            }}
          >
            Connect with MetaMask
          </Button> )}
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
export default NavBar;