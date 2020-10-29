const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let counter = 0;
app.get("/pingpong", (req, res) => {
res.send(`<h4>pong ${counter}</h4>`);
counter += 1;
})
app.listen(port, ()=> {
    console.log(`server listeninng on port ${port}`);
})