import {IncomingMessage, ServerResponse} from "http";
import {URLSearchParams} from "url";

export class BaseRouter
{
	private args: any;
	private controllerName: string;
	private actionName: string
	private strArgs: string;

	constructor()
	{
		this.controllerName = 'main';
		this.actionName = 'index';
		this.args = [];
		this.strArgs = '';
	}


	public async start(request: IncomingMessage, response: ServerResponse)
	{

		console.log(request.method);
		if (request.url === undefined)
		{
			return;
		}

		let rowUrl: string | Array<string> = request.url;
		if (request.url.indexOf('?') !== -1)
		{
			rowUrl = request.url.split('?');
			this.strArgs = rowUrl[1];
			rowUrl = rowUrl[0];
		}
		if (request.method === 'GET')
		{
			console.log('check GET method')
			this.getBodyGetMethod();
		} else if (request.method === 'POST')
		{
			console.log('check POST method')
			this.getBodyPostMethod(request, this.strArgs);
		}
		let routes = rowUrl.split('/');
		this.getController(routes);

		console.log('controller',this.controllerName);
		console.log('action',this.actionName);
		console.log('args Get method',this.args);
		console.log('args POST', this.strArgs);
		response.statusCode = 200;

		response.write(`controller : ${this.controllerName}\n`);
		response.write(`action : ${this.actionName}\n`);
		response.write(`argsGET : ${this.args}\n`);
		response.write(`argsPOST : ${this.strArgs}\n`);
		response.end();
	}

	private getController(routes)
	{
		if (routes[1] === '' || routes[2] === '')
		{
			return;
		}
		this.controllerName = routes[1];
		this.actionName = routes[2];
	}

	private getBodyGetMethod()
	{
		let arr = {};
		if (this.strArgs === '')
		{
			return;
		}
		let params = new URLSearchParams(this.strArgs)
		params.forEach((value, name) =>
		{
			console.log(name, value);
			if(arr.hasOwnProperty(name))
			{
				if(!Array.isArray(arr[name]))
				{
					let tmp = arr[name];
					delete arr[name];
					arr[name] = [tmp];
				}
				arr[name] = arr[name].concat([value]);
			}
			else arr[name] = value;
			console.log(arr[name]);
		})
		this.args = arr;
		this.strArgs = '';
		console.log('this.args =', this.args);
	}

	private getBodyPostMethod(req: IncomingMessage, args): void
	{
		if(args)
		{
			this.getBodyGetMethod()
			return
		}
		let data: string = '';
		req.on('data', chunk => {
			data += chunk.toString();
			console.log(chunk)
		})
		req.on('end', () => {
			let arr = [];
			let params = new URLSearchParams(data)
			params.forEach((value, name) =>
			{
				console.log(name, value);
				if(arr.hasOwnProperty(name))
				{
					if(!Array.isArray(arr[name]))
					{
						let tmp = arr[name];
						delete arr[name];
						arr[name] = [tmp];
					}
					arr[name] = arr[name].concat([value]);
				}
				else arr[name] = value;
				console.log(arr[name]);
			})
			this.args = arr;
		})

	}
	// private delegateAuthority(controllerName: string)
	// {
	// 	const newRouter = import(`../controllers/${controllerName}/${controllerName}.router`);
	// 	newRouter
	// }


}