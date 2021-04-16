import * as mongoose from "mongoose";
import {IUser} from "../interfaces/IUser";

const UserSchema = new mongoose.Schema(
	{
		email: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		login: {type: String, required: true, unique: true},
		books_for_Exchange: [{type: mongoose.Types.ObjectId, ref: 'Books'}]
	});

export = mongoose.model<IUser>('User', UserSchema);




