const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const randomString = () => Math.random().toString(36).slice(2);
const randomStringGen = () => {
const timestamp = new Date().toISOString();
const str = `${timestamp}: ${randomString()}-${randomString()}-${randomString()}-${randomString()}`
console.log(str);
return str;
};

setInterval(() => {
    randomStringGen()
}, 5000);


app.get("/", (req, res) => {
res.send(`<h4>${randomStringGen()}</h4>`)
})
app.listen(port, ()=> {
    console.log(`server listeninng on port ${port}`);
})