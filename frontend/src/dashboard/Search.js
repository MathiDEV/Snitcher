import { Heading, InputGroup, InputLeftElement, Input, Flex, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Starton from '../api/Starton'
import WalletResult from '../components/WalletResult'


function Search(props = undefined) {
    const [search, setSearch] = useState(undefined)
    let url = props.data;
    if(url != undefined && search == undefined){
        getWallet(url);
    }
    function getWallet(wallet) {
        if (wallet.length == 0)
            return setSearch(undefined)
        if (url) url = undefined;
        Starton.getWallet(wallet,
            function (error) {
                setSearch({ status: false, error: error })
            },
            function (data) {
                setSearch({ status: true, data: data })
            }
        )
    }

    return (
        <Box w='100%' mt={5}>
            <Flex justify="center">
                <InputGroup mt={3} w='90%' maxW={500}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<FiSearch />}
                    />
                    <Input
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            getWallet(e.target.value)
                        }
                    }} type='text' placeholder='Search for a wallet' />
                </InputGroup>
            </Flex>
            <WalletResult data={search} />
        </Box>
    )
}

export default Search;