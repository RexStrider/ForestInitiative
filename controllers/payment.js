const axios = require("axios");

const keys = require('../config/keys');

exports.getPayment = async function(req, res) {
 try {
    const URL = `https://demo.docusign.net/v2.1/accounts/3ae994d5-e05f-47a4-a125-c251b21b7de3/payment_gateway_accounts`;

    const response = await axios.get(URL);
     console.log(response);
    res.json({ message: "payment info retrieved successfully", body: response.data })
 }
 catch (error) {
     res.json({ error })
 }
}