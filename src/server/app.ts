import * as http from 'http';
import * as mongoose from "mongoose"
import * as config from "config";
import {IncomingMessage, ServerResponse} from "http";
import {BaseRouter} from "./core/base.router";

const router = new BaseRouter();
const app = http.createServer((req: IncomingMessage, res: ServerResponse) => router.start(req, res));

const PORT = config.get('port') || 5000;

async function startApp()
{
	try
	{
		await mongoose.connect(config.get('mongoUri'),
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			}).then(()=>
		{
			console.log('mongo has been connected');
		});
		app.listen(PORT, () => {
			console.log("App has been started http://localhost:3000 ...");
				});
	} catch (e)
	{
		console.log('Server Error', e.message)
		process.exit(1);
	}
}
startApp();