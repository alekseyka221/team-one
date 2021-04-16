import {ServerResponse} from "http";

export interface IRouter
{
	start(actionName : string, res : ServerResponse, data: object);
}