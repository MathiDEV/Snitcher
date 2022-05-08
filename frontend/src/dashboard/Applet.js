import { Badge, Heading } from '@chakra-ui/react'

function Applet() {
    return (
        <div>
            <Heading mt={3}>Applet</Heading>
            <Heading fontSize={"9xl"}>On</Heading>
            <Badge>THIS</Badge>
            <Heading fontSize={"9xl"}>Do</Heading>
            <Badge>THAT</Badge>
        </div>
    )
}

export default Applet;