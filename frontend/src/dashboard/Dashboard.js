import { Heading, Flex, Center, Box } from '@chakra-ui/react'
import Applets from "./dashboardParts/Applets";
import Saved from "./dashboardParts/Saved";
function Dashboard() {
    return (
        <Box w={'100%'} mt={5}>
            <Flex justifyContent={'center'}>
                <Saved />
                <Applets />
            </Flex>
        </Box>
    )
}

export default Dashboard;