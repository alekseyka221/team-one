import {BaseController} from "../../core/base.controller";
import {validateResult} from "../../lib/validator";
import Book = require("../../models/Book");
import {IBookSchema} from "../../interfaces/IBookSchema";
export class CatalogController extends BaseController
{
	public async get(_ops: boolean[] = [])
	{
		let errors = validateResult();
		if (errors.length > 0)
		{
			this.generateResponse(
				{
					errors: errors,
					message: "Некорректные данные при переходе на площадку"
				},
				400
			);
		}
		let booksData : IBookSchema[] = [];
		if(this.data['filter'].length === 0)
		{
			booksData = await Book.find({status: 'open'});
            if (typeof booksData === null)
            {
            	booksData = [];
            }
		}
		else
		{
			for (let filter of this.data['filter'])
			{
				console.log("текущий фильтр:" ,filter);
				const data : IBookSchema[] | null = await Book.find({genre: filter, status: 'open'})
				console.log("данные фильтра", data);
				if(typeof data !== null)
				{
					booksData = booksData.concat(data);
				}
			}
		}
		this.generateResponse(
			{
				message: "вы перешли на площадку с  книгами",
				books: booksData
			}
		);
	}
}