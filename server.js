const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const getJsonData = require('./getJsonData');

app.use(bodyParser.json());
app.use(cors());

app.get("/json", async (req, res) => {
    try {
        const data = await getJsonData.getJsonData(req.query.jsonUrl);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting JSON data');
    }
});

app.all("*", function (req, res) {
    res.status(404).send('Page not found');
});

app.listen(8090, function () {
    console.log('Server running on port 8090');
});

module.exports = app;