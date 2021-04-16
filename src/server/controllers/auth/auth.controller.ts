import {validateResult} from "../../lib/validator";
import {ServerResponse} from "http";
import User = require("../../models/User");
import * as bcrypt from 'bcryptjs';
import {randomInt} from "crypto";
import {IUser} from "../../interfaces/IUser";

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
		const candidate = await User.findOne({"email": data['email']})
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
		console.log("huy")

		const hashedPass = bcrypt.hashSync(data['password'], 10);
		console.log("naruto")
		const user = new User({email: data['email'], password: hashedPass, login: data['login']});
		await user.save();
		console.log("sasuke")
		res.statusCode = 201;
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify({message: "Пользователь создан"}));
		res.end();
		console.log("nagato huesos")
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