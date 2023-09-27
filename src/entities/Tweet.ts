import { ITweet } from 'contracts/entities/ITweet';

export class Tweet implements ITweet {
  readonly id: string;
  readonly text: string;
  readonly authorId: string;
  readonly nRetweet: number;
  readonly nReply: number;
  readonly nLike: number;
  readonly nQuote: number;
  readonly mentions?: { username: string; id: string }[];
  readonly isReply: boolean;
  readonly isRetweet: boolean;
  readonly geolocation?: string;
  readonly tweetCreatedAt: Date;

  constructor(props: ITweet) {
    this.id = props.id;
    this.text = props.text;
    this.authorId = props.authorId;
    this.nRetweet = props.nRetweet;
    this.nReply = props.nReply;
    this.nLike = props.nLike;
    this.nQuote = props.nQuote;
    this.mentions = props.mentions;
    this.isReply = props.isReply;
    this.isRetweet = props.isRetweet;
    this.geolocation = props.geolocation;
    this.tweetCreatedAt = props.tweetCreatedAt;
  }
}
