const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const fs = require("fs");
let counter = 0;
const filePath = path.join("/", "usr", "src", "app", "files", "logs.txt");
// const filePath = "./files/logs.txt";
const fileAlreadyExists = async () =>
	new Promise((res) => {
		fs.stat(filePath, (err, stats) => {
			// console.log("file exists", "err", err, "stats", stats);
			if (err || !stats) return res(false);
			return res(true);
		});
	});

app.get("/pingpong", async (req, res) => {
	// if (!(await fileAlreadyExists())) {
	// 	fs.open(filePath, "w", function (err, file) {
	// 		if (err) console.log(err);
	// 	});
	// } else {
	// 	console.log("append runs");
	// 	fs.appendFile(filePath, `Ping / Pongs: ${counter}\n`, (err) => {
	// 		if (err) console.log("err ins", err);
	// 	});
	// }
	fs.appendFile(filePath, `Ping / Pongs: ${counter}\n`, (err) => {
		if (err) console.log("err ins", err);
	});
	res.send(`Ping / Pongs: ${counter}`);
	counter += 1;
});
app.listen(port, () => {
	console.log(`server listeninng on port ${port}`);
});
