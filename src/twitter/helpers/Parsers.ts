import { TweetV2, UserV2Result } from 'twitter-api-v2';
import { User } from 'entities/User';
import { Tweet } from 'entities/Tweet';

export const twitterUserToUser = (twitterUser: UserV2Result): User => {
  const {
    id,
    username,
    name,
    description,
    location,
    verified,
    created_at,
    public_metrics,
  } = twitterUser.data;

  return new User({
    id,
    username,
    name,
    description,
    location,
    verified: verified !== undefined ? verified : false,
    accountCreatedAt: created_at as unknown as Date,
    nFollowers: public_metrics?.followers_count || 0,
    nFollowing: public_metrics?.following_count || 0,
    nTweets: public_metrics?.tweet_count || 0,
  });
};

export const twitterTweetToTweet = (twitterTweet: TweetV2): Tweet => {
  const {
    id,
    text,
    author_id,
    referenced_tweets,
    entities,
    public_metrics,
    in_reply_to_user_id,
  } = twitterTweet;

  const { retweet_count, like_count, reply_count, quote_count } =
    public_metrics;

  const mentions = entities?.mentions?.map((mention) => ({
    id: mention.id,
    username: mention.username,
  }));

  const isReply = in_reply_to_user_id
    ? in_reply_to_user_id !== author_id
    : false;

  const isRetweet = !referenced_tweets
    ? false
    : referenced_tweets.reduce(
        (acc, tweet) => (tweet.type === 'retweeted' ? acc + 1 : 0),
        0,
      ) > 0;

  return new Tweet({
    id,
    isReply,
    isRetweet,
    mentions,
    text,
    authorId: author_id,
    nRetweet: retweet_count,
    nLike: like_count,
    nReply: reply_count,
    nQuote: quote_count,
  });
};
