import { model, Schema, Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '@playdarts/core';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

export const User: Model<IUser> = model<IUser>('User', UserSchema);

export const getUserById = (id: ObjectId, callback) => {
  User.findById(id, callback);
}

export const getUserByUsername = (username: string, callback) => {
  const query = { username };
  User.findOne(query, callback);
}

export const addUser = (user, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(callback);
    })
  });
}

export const comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
