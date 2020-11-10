const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;
const axios = require("axios");
const path = require("path");
const url = "https://picsum.photos/1200";

const downloadImage = (url, imagePath) =>
	axios({
		url,
		responseType: "stream",
	}).then(
		(response) =>
			new Promise((resolve, reject) => {
				response.data
					.pipe(fs.createWriteStream(imagePath))
					.on("finish", () => resolve())
					.on("error", (e) => reject(e));
			})
	);
app.use(express.static("files"));
app.get("/", (req, res) => {
	const imageName = `${new Date().toISOString()}__.jpg`;
	const imagePath = `./files/${imageName}`;
	fs.readdir("./files", async (err, files) => {
		console.log("err", err, "files", files);
		// if (err) return ;
		let picName;
		if (files.length <= 0) {
			await downloadImage(url, imagePath);
			res.send(
				`<div>
					<div style="width: 45%; text-align: center; margin: auto">
					<img style="width: 400px; height: 450px"  src="${imageName}" >
					<form action="/submittodo">
  					<input type="text" id="todo_text" name="todo_text" maxlength="140">
					  <input type="submit" value="Create TODO">
					</form>
					<ul style="margin: auto; width: 20%">
					  <li>TODO 1</li>
					  <li>TODO 2</li>
					  </ul>
					</div>
					</div>`
			);
		} else {
			picName = files[0];
			const lastPicDate = picName.split("__")[0];
			const diff = new Date() - new Date(lastPicDate);
			const diffToHours = diff / (60 * 60 * 1000);

			console.log("hours diff", diffToHours);
			if (diffToHours >= 24) {
				fs.unlink(`./files/${picName}`, function (err) {
					if (err) throw err;
					console.log("File deleted!");
				});
				await downloadImage(url, imagePath);
				res.send(
					`<div>
					<div style="width: 45%; text-align: center; margin: auto">
					<img style="width: 400px; height: 450px"  src="${imageName}" >
					<form action="/submittodo">
  					<input type="text" id="todo_text" name="todo_text" maxlength="140">
					  <input type="submit" value="Create TODO">
					</form>
					<ul style="margin: auto; width: 20%">
					  <li>TODO 1</li>
					  <li>TODO 2</li>
					  </ul>
					</div>
					</div>`
				);
			} else {
				res.send(
					`<div>
					<div style="width: 45%; text-align: center; margin: auto">
					<img style="width: 400px; height: 450px"  src="${files[0]}" >
					<form action="/submittodo">
  					<input type="text" id="todo_text" name="todo_text" maxlength="140">
					  <input type="submit" value="Create TODO">
					</form>
					<ul style="margin: auto; width: 20%">
					  <li>TODO 1</li>
					  <li>TODO 2</li>
					  </ul>
					</div>
					</div>`
				);
			}
		}
	});
});
app.listen(port, () => {
	console.log(`server listeninng on port ${port}`);
});
