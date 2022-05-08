import { Menu, MenuButton, MenuList, MenuItem, MenuOptionGroup, MenuItemOption, Button } from "@chakra-ui/react"
import { FiZap } from "react-icons/fi"


export default function EventsMenu({ events, onChange }) {
    return (<Menu>
        <MenuButton
            as={Button}
            aria-label='Options'
            leftIcon={<FiZap />}
            variant='outline'
        >
            EVENT
        </MenuButton>
        <MenuList>
            {events.map((event) => {
                return (<MenuItem onClick={() => { onChange(event.enum) }} icon={event.icon} command={event.command}>
                    {event.name}
                </MenuItem>)
            })}
        </MenuList>
    </Menu>)
}