import { ITweet } from 'contracts/entities/ITweet';
import { Tweet } from 'entities/Tweet';
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
      index: true,
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
    isRetweet: {
      type: Boolean,
    },
    geolocation: {
      type: String,
    },
    tweetCreatedAt: {
      type: Date,
    },
  },
  {
    ...schemaOptions,
    toObject: {
      transform: (doc, ret: Tweet) => new Tweet({ ...ret }),
    },
  },
);

export const TweetModel = model<ITweet>('Tweet', TweetSchema);
