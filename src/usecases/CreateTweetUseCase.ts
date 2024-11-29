import { HttpError } from 'common/errors/HttpError';
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { TweetService } from 'services/TweetService';

export class CreateTweetUseCase implements BaseUseCase {
  constructor(private tweetService: TweetService) {}

  async execute(tweetData: any) {
    const tweetExists = await this.tweetService.findById(tweetData.id);
    if (tweetExists) {
      throw new HttpError({ status: 400, message: 'Tweet já existe.' });
    }

    const tweet = await this.tweetService.create(tweetData);

    return tweet;
  }
}
