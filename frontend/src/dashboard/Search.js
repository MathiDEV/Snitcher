import { Heading, InputGroup, InputLeftElement, Input, Flex, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import Starton from '../api/Starton'
import WalletResult from '../components/WalletResult'


function Search() {
    const [search, setSearch] = useState(undefined)

    function getWallet(wallet) {
        if (!wallet.length) {
            return setSearch(undefined);
        }
        setSearch(null)
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
        <Box w='100%'>
            <Heading mt={3}>Search</Heading>
            <Flex justify="center">
                <InputGroup mt={3} w='90%' maxW={500}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<FiSearch />}
                    />
                    <Input onKeyPress={(e) => {
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