import {BaseController} from "../../core/base.controller";
import {validateResult} from "../../lib/validator";
import User = require("../../models/User");
import Book = require("../../models/Book");
import {IUserSchema} from "../../interfaces/IUserSchema";
import {IBookSchema} from "../../interfaces/IBookSchema";

export class UserController extends BaseController
{
	public async profile(_ops: boolean[] = [])
	{
		let errors = validateResult();
		if (errors.length > 0)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные при переходу в личный кабинет"
				},
				400
			);
			return;
		}
		const userData: IUserSchema | null = await User.findById(this.data['userId'])
			.select(['email', 'login', 'name', 'city', 'categories', 'social', 'photoLink']);
		if (typeof userData === null)
		{
			this.generateResponse(
				{
					message: "такого пользователя не существует"
				},
				404
			);
			return;
		}
		let booksData: IBookSchema[] | null = await Book.find({bookOwner: this.data['userId']});
		if (typeof booksData === null)
		{
			booksData = [];
		}
		this.generateResponse(
			{
				message: "вы перешли в личный кабинет",
				user: userData,
				books: booksData
			}
		)

	}

	public async anotherShort(_ops: boolean[] = [])
	{
		let errors = validateResult();
		if (errors.length > 0)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные при переходу в личный кабинет"
				},
				400
			);
			return;
		}
		const userData: IUserSchema | null = await User.findById(this.data['bookOwnerId'])
			.select(['name', 'city', 'social', 'email', 'photoLink'])
		if (typeof userData === null)
		{
			this.generateResponse(
				{
					message: "такого пользователя нет"
				},
				404
			);
			return;
		}
		this.generateResponse(
			{
				message: 'держи пользователя',
				bookOwner: userData
			}
		)
	}

	public async changeStatusBook(_ops: boolean[] = [])
	{
		let errors = validateResult();
		if (errors.length > 0)
		{

			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные при переходу в личный кабинет"
				},
				400
			);
			return;
		}
		try
		{
			await Book.update({_id: this.data['bookId']}, {$set: {status: 'closed'}});
			this.generateResponse(
				{
					message: "статус успешно изменен"
				}
			);
			return;
		}
		catch (e)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "при изменении статуса произошла ошибка"
				},
				500
			);
			return;
		}


	}
}