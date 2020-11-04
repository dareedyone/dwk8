const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
app.get("/", (req, res) => {
	fs.readFile("/usr/src/app/files/logs.txt", "utf8", (err, data) => {
		if (err) console.log(err);
		data = data.split("\n").map((d) => `<p>${d}</p>`);
		res.send(`<p>${data.join("")}<p>`);
	});
});
app.listen(port, () => {
	console.log(`server listeninng on port ${port}`);
});
