const axios = require("axios");

const keys = require('../config/keys');

exports.getCivicInfo = async function(req, res) {
 try {
    const address = req.params.address || 'San Francisco CA';
    const URL = `https://www.googleapis.com/civicinfo/v2/representatives?key=${keys.google_civic_info_api}&address=${address}`;

    const response = await axios.get(URL);

    res.json({ message: "civic info retrieved successfully", body: response.data })
 }
 catch (error) {
     res.json({ error })
 }
}