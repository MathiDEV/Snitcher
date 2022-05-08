import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"
import { FiCompass, FiActivity, FiDownload, FiUpload, FiLogOut, FiLogIn, FiCheck, FiArrowRight, FiShuffle } from "react-icons/fi"
export default function ActionsMenu() {
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
            <MenuItem icon={<FiActivity />}>
                Any activity
            </MenuItem>
            <MenuItem icon={<FiDownload />}>
                Receiving Currency
            </MenuItem>
            <MenuItem icon={<FiUpload />}>
                Sending Currency
            </MenuItem>
            <MenuItem icon={<FiLogOut />} command='ERC20'>
                Token Transfer
            </MenuItem>
            <MenuItem icon={<FiLogIn />} command='ERC20'>
                Token Mint
            </MenuItem>
            <MenuItem icon={<FiCheck />} command='ERC20'>
                Token Approval
            </MenuItem>
            <MenuItem icon={<FiLogOut />} command='ERC721'>
                Token Transfer
            </MenuItem>
            <MenuItem icon={<FiArrowRight />} command='ERC1155'>
                Single Transfer
            </MenuItem>
            <MenuItem icon={<FiShuffle />} command='ERC1155'>
                Batch Transfer
            </MenuItem>
        </MenuList>
    </Menu>)
}