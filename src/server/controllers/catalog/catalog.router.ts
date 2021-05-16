import {CatalogController} from './catalog.controller';
import {Validator} from "../../lib/validator";
import {IRouter} from "../../interfaces/IRouter";
import {ServerResponse} from "http";

class CatalogRouter implements IRouter
{
	start(actionName:string, res:ServerResponse, data:object)
	{
		const controller = new CatalogController(res, data);
		switch (actionName)
		{
			case 'get':
			{
				controller.get([Validator.checkToken(data['token'], data['userId'])]);
				break;
			}
			default:
			{
				controller.page404();
			}
		}
	}
}
export = new CatalogRouter();