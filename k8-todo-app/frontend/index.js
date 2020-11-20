const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;
const axios = require("axios");
const path = require("path");
const url = "https://picsum.photos/1200";
const bodyParser = require("body-parser");
const backendUrl = process.env.GRAPHQL_URL || "http://k8todobackend-svc";

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

const frontendHtml = (srcPath, todos) => {
	return `<div>
		<div style="width: 45%; text-align: center; margin: auto">
		<img style="width: 400px; height: 450px"  src="${srcPath}" >
		<form action="/todos" method="POST">
		  <input type="text" name="name" maxlength="140">
		  <input type="submit" value="Create TODO">
		</form>
		<ul style="margin: auto; width: 20%">
		${todos.map((t) => "<li>" + t.name + "</li>").join("")}
		  </ul>
		</div>
		</div>`;
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static("files"));

app.get("/", async (req, res) => {
	const imageName = `${new Date().toISOString()}__.jpg`;
	const imagePath = `./files/${imageName}`;
	const { data } = await axios.get("http://localhost:3000/todos");

	fs.readdir("./files", async (err, files) => {
		console.log("err", err, "files", files);
		// if (err) return ;
		let picName;
		if (files.length <= 0) {
			await downloadImage(url, imagePath);
			// console.log("second", data.allTodos);
			res.send(frontendHtml(imageName, data.data.allTodos));
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

				res.send(frontendHtml(imageName, data.data.allTodos));
			} else {
				res.send(frontendHtml(files[0], data.data.allTodos));
			}
		}
	});
});
app.get("/todos", async (req, res) => {
	const { data } = await axios.post(backendUrl, {
		query: "query { allTodos{ name }}",
	});
	res.json(data);
});
app.post("/todos", async (req, res) => {
	try {
		const { body } = req;
		const { data } = await axios.post(backendUrl, {
			query: `mutation { addTodo(name: "${body.name}"){ name }}`,
		});
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
});
app.listen(port, () => {
	console.log(`server listeninng on port ${port}`);
});
