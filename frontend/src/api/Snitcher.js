const apiEndpoint = "https://api.snitcher.socialeo.net/api"

const snitcherAPI = {
    sendSignature: function (address, signature) {
        return fetch(`${apiEndpoint}/auth`, {
            body: JSON.stringify({
                address,
                signature
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((response) => {
            if (response.ok) return response;
            new Error("Failed to send signature");
        })
            .then((data) => data.json())

    },
    getUser: function (address) {
        return fetch(
            `${apiEndpoint}/user`, {
            body: JSON.stringify({
                "address": address
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }
        ).then((response) => {
            if (response.ok) return response;
            new Error("Failed to send signature");
        })
            .then((response) => response.json())

    },
    getTopWallets: function () {
        return fetch(`${apiEndpoint}/user/bestusers`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then((response) => {
                if (response.ok) return response;
                new Error("Failed to get wallets");
            }).then((response) => response.json())

    },
    getAllSaved: function () {
        return fetch(`${apiEndpoint}/user/getAllSave`, {
            headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") },
        }).then((response) => {
            if (response.ok) return response;
            new Error("Failed to get saves");
        }).then((response) => response.json())
    },
    saveToggle : function (address) {
        return fetch(`${apiEndpoint}/user/saveLater`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "toSave": address }),
            method: "POST"
        }).then((response) => {
            if (response.ok) return response;
            new Error("Failed to save user");
        }).then((response) => response.json())
    },
    getAutomation : function (id) {
        fetch(`${apiEndpoint}/user/automations/` + id, { headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") } })
        .then(data => {
            if (data.ok) return data;
            new Error("Failed to get automations");
        }).then(data => data.json())
    },
    getAutomations : function () {
        return fetch(`${apiEndpoint}/user/automations`, { headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") } })
        .then(data => {
            if (data.ok) return data;
            new Error("Failed to get automations");
        }).then(data => data.json())
    }
}

module.exports = snitcherAPI