import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"
import { FiCompass } from "react-icons/fi"


export default function EventsMenu({ actions, onChange }) {
    return (<Menu>
        <MenuButton
            as={Button}
            aria-label='Options'
            leftIcon={<FiCompass />}
            variant='outline'
        >
            ACTION
        </MenuButton>
        <MenuList>
            {actions.map((event, i) => {
                return (<MenuItem key={"event"+i} onClick={() => { onChange(event.enum) }} icon={event.icon} command={event.command}>
                    {event.name}
                </MenuItem>)
            })}
        </MenuList>
    </Menu>)
}