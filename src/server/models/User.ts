import * as mongoose from "mongoose";

interface IUser extends mongoose.Document
{
	email: string;
	password: string;
	login: string
	salt: number
}

const UserSchema = new mongoose.Schema(
	{
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		login: {type: String, required: true, unique: true},
		salt: {type: Number, required: true},
		books_for_Exchange: [{type: mongoose.Types.ObjectId, ref: 'Books'}]
	});

export = mongoose.model<IUser>('User', UserSchema);




