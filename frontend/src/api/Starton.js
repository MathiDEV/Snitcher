const apiEndpoint = "https://api.starton.io/v2"
const apiKey = "6Ub7jn8UYFc4IWgBpF2D66FPWHP4nUdf"

const startonApi = {
    getWallet: function (wallet, fail, success) {
        if (!wallet.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
            return fail("Invalid wallet")
        }

        fetch(apiEndpoint + "/wallet/" + wallet + "/ethereum-mainnet/balance", { headers: { "x-api-key": apiKey } })
            .then(res => {
                res.json().then(data => {
                    if (res.status === 200) {
                        success(data)
                    } else {
                        fail("No wallet found")
                    }
                })
            })
            .catch(err => {
                fail("No wallet found")
            })
    }
}

module.exports = startonApi