const axios = require("axios");

const keys = require('../config/keys');

exports.getCivicInfo = async function(req, res) {
 try {
    const URL = `https://www.googleapis.com/civicinfo/v2/representatives?key=${keys.google_civic_info_api}&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS`;

    const response = await axios.get(URL);

    res.json({ message: "civic info retrieved successfully", body: response.data })
 }
 catch (error) {
     res.json({ error })
 }
}