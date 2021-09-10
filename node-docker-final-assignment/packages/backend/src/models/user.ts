import { Schema, model, Document} from 'mongoose';
import IUserSchema from '../interfaces/IUserSchema';

const userSchema = new Schema<IUserSchema & Document<IUserSchema>>({
  name: { type: String },
  age: { type: Number },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  img: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

const User = model<IUserSchema & Document<IUserSchema>>('User', userSchema);

export default User;
