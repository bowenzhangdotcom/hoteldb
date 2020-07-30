const express = require("express");
let app = express();
let port = 3000;

app.get("/", (req, res) => {
    res.send("testing with hello world");
});

app.listen(port, () => {
    console.log("Server listening on port" + port);
});