import {IRouter} from "../../interfaces/IRouter";
import {ServerResponse} from "http";
import {AuthController} from "./auth.controller";
import {Validator} from "../../lib/validator";

class AuthRouter implements IRouter
{
	start(actionName: string, res: ServerResponse, data: Object)
	{
		const controller = new AuthController(res, data);
		if (actionName === 'register')
		{
			controller.register([
				Validator.isEmail(data['email']),
				Validator.isLogin(data['login']),
				Validator.isPassword(data['password'])
			]);
		}
		if (actionName === 'login')
		{
			controller.login([
				Validator.isEmail(data['email']),
				Validator.isPassword(data['password'])
			]);
		}
	}

}

export = new AuthRouter()