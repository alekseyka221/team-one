import {UserController} from './user.controller';
import {Validator} from "../../lib/validator";
import {IRouter} from "../../interfaces/IRouter";
import {ServerResponse} from "http";

class BookRouter implements IRouter
{
	start(actionName:string, res:ServerResponse, data:object)
	{
		const controller = new UserController(res, data);
		switch (actionName)
		{
			case 'profile':
			{
				controller.profile([Validator.checkToken(data['token'], data['userId'])]);
				break;
			}
			case 'anotherShort':
			{
				controller.anotherShort([Validator.checkToken(data['token'], data['userId'])]);
				break;
			}
			case 'changeStatusBook':
			{
				controller.changeStatusBook([Validator.checkToken(data['token'], data['userId'])]);
				break;
			}
			default:
			{
				controller.page404();
			}
		}
	}
}
export = new BookRouter();