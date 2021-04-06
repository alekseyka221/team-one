import * as express from "express";
const app = express();
app.get("/", (_request, response) => {
	response.send("Hello nagato");
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running in http://localhost:${PORT}`)
})