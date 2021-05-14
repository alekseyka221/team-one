import {ServerResponse} from "http";

export class BaseController
{
	constructor(protected res: ServerResponse, protected data: Object)
	{
		this.res = res;
		this.data = data;
	}

	/**
	 *
	 * @param responseData
	 * @param statusCode
	 * @param contentType
	 * @protected
	 */
	protected generateResponse(responseData: Object, statusCode: number = 200 ,contentType: string = 'application/json')
	{
		this.res.statusCode = statusCode;
		this.res.setHeader('Content-Type', contentType);
		if(contentType === 'application/json')
		{
			this.res.write(JSON.stringify(responseData));
		}
		else
		{
			this.res.write(responseData);
		}
	}

}
