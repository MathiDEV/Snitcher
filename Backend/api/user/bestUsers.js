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
                return {
                    rank: column[0],
                    address: column[1],
                    balance: column[3].replace(" Ether", ""),
                };
            });
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({"msg": "Internal server error"})
        })
}

module.exports = {
    bestUsers
}