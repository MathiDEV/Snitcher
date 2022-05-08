const fetch = require('node-fetch');

const bestUsers = (req, res) => {
    fetch('https://etherscan.io/accounts')
        .then(res => res.text())
        .then(data => {
            const body = data.split('<tbody>')[1].split('</tbody>')[0];
            const rows = body.split('<tr>');
            rows.shift();
            const columns = rows.map(row => {
                const columns = row.split('<td>');
                columns.shift();
                return columns.map(column => {
                    let value = column.split('</td>')[0];
                    value = value.replace(/<\/?[^>]+(>|$)/g, "");
                    return value;
                }
                );
            }
            );
            const users = columns.map(column => {
                let balance = column[3].replace(" Ether", "").replace(/,/g, "");
                    rawBalance = parseInt(balance.replace(".", ""));
                rawBalance *= Math.pow(10, 16 - rawBalance.toString().length);
                return {
                    network: "ethereum-mainnet",
                    address: column[1],
                    balance: {
                        hex: '0x' + rawBalance.toString(16),
                        formatted: balance
                    },
                    currencySymbol: "ETH"
                };
            });
            res.status(200).json(users.slice(0, 10))
        })
        .catch(err => {
            res.status(500).json({ "msg": "Internal server error" })
        })
}

module.exports = {
    bestUsers
}