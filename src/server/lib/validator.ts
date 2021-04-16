export class Validator
{
	public static error: Array<string> = [];

	public static isEmail(email: string): boolean
	{
		const regex = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
		if (!regex.test(email) || typeof email === "undefined")
		{
			Validator.error.push('invalid email address');
			return false;
		}
		return true;
	}

	public static isPassword(password: string): boolean
	{
		const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/i;
		if (!regex.test(password) || typeof password === "undefined")
		{
			console.log('тригернулся пароль')
			Validator.error.push('invalid password')
			return false;
		}
		return true;
	}

	public static isName(fullName: string): boolean
	{
		const regex = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
		return regex.test(fullName);
	}

	public static isLogin(login: string): boolean
	{
		console.log(login)
		const regex = /^[a-zA-z][a-zA-Z1-9].{3,20}$/;
		if (!regex.test(login) || typeof login === "undefined")
		{
			Validator.error.push('invalid login');
			return false;
		}
		return true;
	}
}

export function validateResult(): Array<string>
{
	return Validator.error;
}