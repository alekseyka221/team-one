import * as express from "express";
const app = express();
app.get("/", (_request, response) => {
	response.send("nagato dasadsd");
})
const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server is running in http://localhost:${PORT}`)
})