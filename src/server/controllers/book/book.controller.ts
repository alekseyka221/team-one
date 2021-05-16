import {BaseController} from "../../core/base.controller";
import {validateResult} from "../../lib/validator";
import * as mongoose from 'mongoose';
import User = require("../../models/User");
import Book = require("../../models/Book");

export class BookController extends BaseController
{
	public async add(_ops: boolean[] = [])
	{
		let errors = validateResult();
		if (errors.length > 0)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные при добавлении книги"
				},
				400
			);
			return;
		}
		try
		{
			const bookId = new mongoose.Types.ObjectId();
			const book = new Book(
				{
					_id: bookId,
					title: this.data['title'],
					author: this.data['author'],
					quality: this.data['quality'],
					publishedIn: this.data['publishedIn'],
					publishedBy: this.data['publishedBy'],
					binding: this.data['binding'],
					series: this.data['series'],
					ISBN: this.data['ISBN'],
					exchangeType: this.data['exchangeType'],
					genre: this.data['genre'],
					bookOwner: this.data['userId'],
					photoLink: this.data['photoLink'],
					status: "open"
				}
			);
			await book.save();
			await User.updateOne({_id: this.data['userId']}, {$push: {books_for_Exchange: bookId}});
			this.generateResponse(
				{
					message: 'книга успешно добавлена'
				}
			);
			return;
		}
		catch (e)
		{
			this.generateResponse(
				{
					message: "что-то пошло не так, скорее всего вы не добавили обязательные поля книги"
				},
				400
			)
		}

	}

	public upload(_ops: boolean[] = [])
	{

	}
}