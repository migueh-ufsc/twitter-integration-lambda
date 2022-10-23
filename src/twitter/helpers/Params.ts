import { Config } from 'infra/config';
import { TweetV2UserTimelineParams, UsersV2Params } from 'twitter-api-v2';

export const userParams: Partial<UsersV2Params> = {
  'user.fields': [
    'created_at',
    'description',
    'entities',
    'id',
    'location',
    'name',
    'public_metrics',
    'username',
    'verified',
  ],
};

export const timelineParams: Partial<TweetV2UserTimelineParams> = {
  max_results: Config.twitter.maxResults,
  'tweet.fields': [
    'author_id',
    'id',
    'in_reply_to_user_id',
    'entities',
    'public_metrics',
    'text',
    'referenced_tweets',
  ],
};
