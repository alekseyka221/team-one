import * as http from 'http';
import {IncomingMessage, ServerResponse} from "http";
import {BaseRouter} from "./core/base.router";

const router = new BaseRouter();
const app = http.createServer((req:IncomingMessage, res:ServerResponse) => router.start(req, res));

app.listen(3000);