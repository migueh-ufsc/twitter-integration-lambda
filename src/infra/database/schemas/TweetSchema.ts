import { ITweet } from 'contracts/entities/ITweet';
import { model, Schema } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const TweetSchema = new Schema<ITweet>(
  {
    id: {
      type: String,
      required: true,
      index: true,
    },
    text: {
      type: String,
    },
    authorId: {
      type: String,
    },
    nRetweet: {
      type: Number,
    },
    nReply: {
      type: Number,
    },
    nLike: {
      type: Number,
    },
    nQuote: {
      type: Number,
    },
    mentions: [
      {
        username: {
          type: String,
        },
        id: {
          type: String,
        },
        _id: false,
      },
    ],
    isReply: {
      type: Boolean,
    },
    geolocation: {
      type: String,
    },
  },
  schemaOptions,
);

export const TweetModel = model<ITweet>('Tweet', TweetSchema);
