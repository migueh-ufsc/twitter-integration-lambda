import * as dotenv from 'dotenv';
dotenv.config();

export abstract class Config {
  static readonly mongoURI = process.env.MONGODB_URI;
  static readonly rabbitURI = process.env.RABBITMQ_URI;
  static readonly serverPort = process.env.SERVER_PORT || 3000;
  static readonly logLevel = process.env.LOG_LEVEL || 'info';
  static readonly twitter = {
    key: process.env.TWITTER_APP_KEY,
    keySecret: process.env.TWITTER_APP_KEY,
    token: process.env.TWITTER_ACCESS_TOKEN,
    tokenSecret: process.env.TWITTER_ACCESS_SECRET,
    bearerToken: process.env.TWITTER_BEARER_TOKEN,
    maxResults:
      process.env.TWITTER_TIMELINE_MAX_RESULTS != null
        ? Number(process.env.TWITTER_TIMELINE_MAX_RESULTS)
        : 30,
  };
}
