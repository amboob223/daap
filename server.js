const express = require("express");
const path = require("path");
const app = express();

// Corrected file path
const appPath = path.join(__dirname + "src/App.js");

app.get("/", (req, res) => {
    res.sendFile(appPath);
});

const server = app.listen(5000);

const portNumber = server.address().port;
console.log(`port is open ${portNumber}`);
