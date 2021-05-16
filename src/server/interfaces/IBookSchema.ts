import * as mongoose from "mongoose";

export interface IBookSchema extends mongoose.Document
{
	title: string,
	author: string,
	quality: number,
	publishedIn: number,
	publishedBy?: string,
	binding?: string,
	series?: string,
	ISBN?: string,
	exchangeType: string,
	genre: string,
	BookOwner: mongoose.Types.ObjectId,
	photoLink: string,
	status: string
}