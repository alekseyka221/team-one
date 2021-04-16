import {validateResult} from "../../lib/validator";
import {ServerResponse} from "http";
import User = require("../../models/User");
import * as bcrypt from 'bcryptjs';
import {randomInt} from "crypto";

export class AuthController
{
	public async register(data: object, res: ServerResponse, _ops: boolean[] = [])
	{
		let errors = validateResult()
		if (errors.length > 0)
		{
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			res.write(JSON.stringify({
				errors: errors,
				message: "Некорректные данные при регистрации"
			}));
			res.end();
			return;
		}
		const candidate = await User.findOne(data['email'])
		if (candidate)
		{
			res.statusCode = 400;
			res.setHeader('Content-Type', 'application/json');
			res.write(JSON.stringify({
				message: "Такой пользователь уже существует"
			}));
			res.end();
			return;
		}

		const salt = randomInt(100000, 999999);

		const hashedPass = await bcrypt.hash(data['password'], salt);

		const user = new User({email: data['email'], password: hashedPass, login: data['login'], salt});
		await user.save();
		res.statusCode = 201;
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify({message: "Пользователь создан"}));
		res.end();

	}

	public login(data: object, _ops: boolean[] = [])
	{
		console.log(data)
	}

	public logout(data: object, _ops: boolean[] = [])
	{
		console.log(data)
	}

}