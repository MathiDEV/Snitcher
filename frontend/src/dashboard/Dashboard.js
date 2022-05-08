import { Heading } from '@chakra-ui/react'
import Applets from "./dashboardParts/Applets";
import Saved from "./dashboardParts/Saved";
import { Flex } from '@chakra-ui/react';
function Dashboard() {
    return (
        <div>
            <Flex>
            <Saved />
            <Applets />
            </Flex>
        </div>
    )
}

export default Dashboard;