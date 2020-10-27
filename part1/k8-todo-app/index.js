const express = require("express");
const app = express();


const port = process.env.PORT ||     3001;
app.get("/", (req, res) => {
res.send("<h1>here we go !</h1>")
})
app.listen(port, ()=> {
    console.log(`server listeninng on port ${port}`);
})