import {IRouter} from "../../interfaces/IRouter";
import {ServerResponse} from "http";
import {AuthController} from "./auth.controller";

class AuthRouter implements IRouter{
    start(actionName: string, _res: ServerResponse, data: object)
    {
        const controller = new AuthController();
        if(actionName === 'register')
        {
            //сначала будем просто возращать токен и переводить на сайт
            //потом будем через smtp-server отправлять сообщение для подтверждения
            controller.register(data);
        }

        if(actionName === 'login')
        {
            controller.login(data);
        }
        if (actionName === 'logout')
        {
            controller.logout(data);
        }
    }
    private validateParams(data : object)
    {
        if("email" in data)
        {

        }
    }
}