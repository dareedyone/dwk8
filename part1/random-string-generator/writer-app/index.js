const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const filePath = path.join("/", "usr", "src", "app", "files", "logs.txt");

const randomString = () => Math.random().toString(36).slice(2);
const randomStringGen = () => {
	const timestamp = new Date().toISOString();
	const str = `${timestamp}: ${randomString()}-${randomString()}-${randomString()}-${randomString()}`;

	return str;
};
const fileAlreadyExists = async () =>
	new Promise((res) => {
		fs.stat(filePath, (err, stats) => {
			// console.log("file exists", "err", err, "stats", stats);
			if (err || !stats) return res(false);
			return res(true);
		});
	});

// app.get("/", (req, res) => {
// res.send(`<h4>${randomStringGen()}</h4>`)
(function iife() {
	console.log("the promise", fileAlreadyExists);
	setTimeout(async () => {
		if (!(await fileAlreadyExists())) {
			fs.open(filePath, "w", function (err, file) {
				if (err) console.log(err);
			});
		} else {
			console.log("append runs");
			fs.appendFile(filePath, `${randomStringGen()}\n`, (err) => {
				if (err) console.log("err ins", err);
			});
		}
		iife();
	}, 5000);
})();
return;
// setInterval(async () => {
//     if (!await fileAlreadyExists) {
//         fs.appendFile('logs.txt', `${randomStringGen()}\n`, err => {
//             if (err) console.log("err ins", err);
//         })
//     }else {
//         fs.appendFile('logs.txt', `${randomStringGen()}\n`, err => {
//             if (err) console.log("err ins", err);
//         })
//     }
// }, 5000);
// });
app.listen(port, () => {
	console.log(`server listeninng on port ${port}`);
});
