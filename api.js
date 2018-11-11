const express = require("express");
const bodyParser = require("body-parser");
const expressjwt = require("express-jwt");
const app = express();

require('dotenv').load();
const PORT = process.env.API_PORT || 8888;

const jwtCheck = expressjwt({
    secret: "accesskey"
});

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get("/asset", (req, res) => {
    res.status(200).send("Everybody can see this");
});

app.get("/asset/secret", jwtCheck, (req, res) => {
    res.status(200).send("Only logged in people can see me");
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});