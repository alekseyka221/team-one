import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as config from "config";
import {IUser} from "../../interfaces/IUser";
import {BaseController} from "../../core/base.controller";
import {validateResult} from "../../lib/validator";
import User = require("../../models/User");


export class AuthController extends BaseController
{
	public async register(_ops: boolean[] = [])
	{
		let errors = validateResult()
		if (errors.length > 0)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные при регистрации"
				},
				400
			);
			return;
		}
		const candidate = await User.findOne({"email": this.data['email']})
		if (candidate)
		{
			this.generateResponse(
				{
					message: "Такой пользователь уже существует"
				},
				400
			)
			return;
		}

		const hashedPass = bcrypt.hashSync(this.data['password'], 10);
		const user = new User({email: this.data['email'], password: hashedPass, login: this.data['login']});
		await user.save();
		this.generateResponse(
			{
				message: "Пользователь создан"
			},
			201
		)
	}

	public async login(_ops: boolean[] = [])
	{
		let errors = validateResult()
		if (errors.length > 0)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные"
				},
				400
			);
			return;
		}

		const user : IUser = await User.findOne({email : this.data['email']})
		if (!user)
		{
			this.generateResponse(
				{
					message: 'Пользователь не найден'
				},
				400
			)
			return;
		}
		const isMatch = bcrypt.compareSync(this.data['password'], user.password);
		if (!isMatch)
		{
			this.generateResponse(
				{
					message : 'Неправильный пароль'
				},
				400
			);
			return ;
		}
		const token = jwt.sign(
			{ userId: user.id },
			config.get('jwtSecret'),
			{ expiresIn: '1h' }
		)
		this.generateResponse(
			{
				token,
				userId : user.id
			}
		)
		return;
	}


}