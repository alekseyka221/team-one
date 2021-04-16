import {IRouter} from "../../interfaces/IRouter";
import {ServerResponse} from "http";
import {AuthController} from "./auth.controller";
import {Validator} from "../../lib/validator";

class AuthRouter implements IRouter
{

	start(actionName: string, res: ServerResponse, data: Object)
	{
		const controller = new AuthController();
		if (actionName === 'register')
		{
			controller.register(data, res,[
				Validator.isEmail(data['email']),
				Validator.isLogin(data['login']),
				Validator.isPassword(data['password'])
			]);


		}
		if (actionName === 'login')
		{
			controller.login(data,[

			]);
		}
		if (actionName === 'logout')
		{
			controller.logout(data);
		}
		res.statusCode = 200;
	}

}