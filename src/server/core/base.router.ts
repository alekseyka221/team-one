import {IncomingMessage, ServerResponse} from "http";
import {URLSearchParams} from "url";
import {IRouter} from "../interfaces/IRouter";

export class BaseRouter
{
	private args: object; // параметры тела запроса
	private controllerName: string; // название контроллера
	private actionName: string // название метода контроллера
	private strArgs: string; // аргументы в виде строки(для GET-запроса)

	constructor()
	{
		this.controllerName = 'main';
		this.actionName = 'index';
		this.args = {};
		this.strArgs = '';
	}

	/**
	 * точка входа в маршрутизатор. Здесь просто идет "переадресация" на метод роутера
	 * в зависимости от метода запроса
	 * @param {IncomingMessage} request
	 * @param {ServerResponse} _response
	 */
	public start(request, _response)
	{
		if (request.method === 'GET')
		{
			this.startGetMethod(request, _response);
		}
		if (request.method === 'POST')
		{
			this.startPostMethod(request, _response);
		}
	}

	/**
	 * если метод запроса GET, то парсим url и оттуда получаем все нужные данные:
	 * controllerName, actionName и args и затем делегируем полномочия роутеру модуля с именем controllerName
	 * @param {IncomingMessage} req
	 * @param {ServerResponse} _res поскольку данная переменная не используется в методе, то ставим нижнее подчеркивание
	 * @private
	 */

	private startGetMethod(req, _res)
	{
		if (req.url === undefined)
		{
			// TODO сюда прописать формирование ответа в виде ошибки
			return;
		}
		let rowUrl: string = req.url;
		console.log(rowUrl);
		/*
		смотрим, есть ли в url параметры запроса,
		если да, то режем url по знаку '?'
		 */
		if (req.url.indexOf('?') !== -1)
		{
			const arrPathAndData: Array<string> = req.url.split('?');
			this.strArgs = arrPathAndData[1];
			rowUrl = arrPathAndData[0];
		}
		/*
		начинаем парсить тело запроса
		 */
		this.getBodyGetMethod();
		/*
		режем url и получаем название контроллера и экшена
		 */
		this.getControllerAndAction(rowUrl.split('/'));
		this.delegateAuthority(_res);
		console.log(this.args);
		console.log(this.controllerName);
		console.log(this.actionName);
	}

	/**
	 * Если метод запроса POST, то вешаем два слушателя, один из которых собирает тело запроса,
	 * а второй начинает парсить тело запроса и пришедший маршрут и делегирует полномочия
	 * роутеру модуля с именем controllerName
	 *
	 * @param {IncomingMessage} req
	 * @param {ServerResponse} _res
	 * @private
	 */
	private startPostMethod(req: IncomingMessage, _res: ServerResponse): void
	{
		let data: string = '';
		req.on('data', chunk => {
			data += chunk.toString();
			console.log('chunk =', chunk)
		})
		req.on('end', () => {
			console.log('data in end POST event = ', data);
			if (req.url === undefined)
			{
				return;
			}
			// this.args = this.parseBodyRequest(data);
			this.args = JSON.parse(data);
			this.getControllerAndAction(req.url.split('/'))
			this.delegateAuthority(_res);
			console.log(this.controllerName);
			console.log(this.actionName);
			console.log('args in end POST event = ', this.args);
		})
	}

	/**
	 * В зависимости от входных данных изменяем
	 * названия контроллера и экшена с дефолтных на полученные
	 * @param {Array<string>} routes
	 * @private
	 * @return void
	 */
	private getControllerAndAction(routes: Array<string>): void
	{
		if (routes[1] !== '')
		{
			this.controllerName = routes[1];
		}
		if (routes[2] !== '')
		{
			this.actionName = routes[2];
		}
	}

	/**
	 * передаем полученную строку из url с параметрами запроса в парсер
	 * @private
	 */
	private getBodyGetMethod(): void
	{

		if (this.strArgs === '')
		{
			return;
		}
		this.args = this.parseBodyRequest(this.strArgs);
	}


	/**
	 * здесь применяется класс URLSearchParams,
	 * c помощью которого можно довольно незамысловато получить
	 * пары ключ-значение из тела запроса,
	 * тут я формирую такой объект, чтобы для двух значений с одинаковым ключом создавался массив
	 * Пример:
	 * {
	 *     email: "alex@mail.ru",
	 *     books: ['Война и мир', 'Идиот']
	 * }
	 * @param data
	 * @private
	 */
	private parseBodyRequest(data): object
	{
		let arr = {};
		const params = new URLSearchParams(data)
		params.forEach((value, name) => {
			if (arr.hasOwnProperty(name))
			{
				if (!Array.isArray(arr[name]))
				{
					const tmp = arr[name];
					delete arr[name];
					arr[name] = [tmp];
				}
				arr[name] = arr[name].concat([value]);
			} else arr[name] = value;
		})
		return arr;
	}


	/**
	 * Динамически подключаем роутер модуля и ему передаем:
	 * actionName, args, которые хранятся в полях класса базового роутера и
	 * ответ от сервера
	 * @param {ServerResponse}_res
	 * @private
	 */
	private async delegateAuthority(_res: ServerResponse)
	{
		const newRouter : IRouter = await import(`../controllers/`+this.controllerName+`/`+this.controllerName+`.router`);
		newRouter.start(this.actionName, _res,this.args);
	}


}