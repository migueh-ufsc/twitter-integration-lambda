import { GetUserParams } from 'contracts/http/Params';
import { HttpResponse } from 'contracts/server/Http';
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { Tweet } from 'entities/Tweet';
import { User } from 'entities/User';
import { TweetService } from 'services/TweetService';
import { UserService } from 'services/UserService';
import { TwitterClient } from 'twitter/TwitterClient';

type UserData = { user: User; tweets: Tweet[] };

export class GetUserUseCase implements BaseUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly tweetService: TweetService,
  ) {}

  async execute(input: GetUserParams): Promise<HttpResponse> {
    const user = await this.userService.findOne({
      $or: [{ id: input.id }, { username: input.username }],
    });

    if (user) {
      const tweets = await this.tweetService.findByAuthorID(user.id);
      user.sampleTimeline = tweets;
      return {
        status: 200,
        body: user,
      };
    }

    const twitterData = await this.getUserDataFromTwitterAPI(input);
    const userData = await this.saveUserDataToDB(
      twitterData.user,
      twitterData.tweets,
    );

    userData.user.sampleTimeline = userData.tweets;

    return {
      status: 200,
      body: userData.user,
    };
  }

  private async getUserDataFromTwitterAPI(
    params: GetUserParams,
  ): Promise<UserData> {
    let user: User;
    let tweets: Tweet[] = [];

    if (params.id) user = await TwitterClient.getUserById(params.id);

    if (params.username && !user)
      user = await TwitterClient.getUserByUsername(params.username);

    if (!user) throw new Error('User not found');
    //todo melhorar throw aqui
    else tweets = await TwitterClient.getUserTweets(user.id);

    return { user, tweets };
  }

  private async saveUserDataToDB(
    user: User,
    tweets: Tweet[],
  ): Promise<UserData> {
    const createdTweets = await this.tweetService.batchCreate(tweets);
    const createdUser = await this.userService.create(user);

    return {
      user: createdUser.toObject(),
      tweets: createdTweets.map((tweet) => tweet.toObject()),
    };
  }
}
