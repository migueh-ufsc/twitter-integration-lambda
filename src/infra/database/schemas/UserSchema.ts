import { IUser } from 'contracts/entities/IUser';
import { User } from 'entities/User';
import { model, Schema, Types } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      index: true,
    },
    username: {
      type: String,
      index: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    accountCreatedAt: {
      type: Date,
    },
    accountDeletedAt: {
      type: Date,
    },
    nFollowers: {
      type: Number,
      default: 0,
    },
    nFollowing: {
      type: Number,
      default: 0,
    },
    nTweets: {
      type: Number,
      default: 0,
    },
    sampleTimeline: [{ type: Types.ObjectId, ref: 'Tweet' }],
  },
  {
    ...schemaOptions,
    toObject: {
      transform: (doc, ret: User) => new User({ ...ret }),
    },
  },
);

export const UserModel = model<IUser>('User', UserSchema);
