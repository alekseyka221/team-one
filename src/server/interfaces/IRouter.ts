import {ServerResponse} from "http";

export interface IRouter {
    start(actionName: string, _res:ServerResponse, data : object);
}