import { ITweet } from 'contracts/entities/ITweet';
import { IUser } from 'contracts/entities/IUser';

export class User implements IUser {
  readonly id: string;
  readonly username: string;
  readonly name: string;
  readonly description: string;
  readonly location: string;
  readonly verified: boolean;
  readonly accountCreatedAt: Date;
  readonly nFollowers: number;
  readonly nFollowing: number;
  readonly nTweets: number;
  accountDeletedAt: Date;
  follows: IUser[];
  isFollowedBy: IUser[];
  sampleTimeline: ITweet[];

  constructor(props: IUser) {
    this.id = props.id;
    this.username = props.username;
    this.name = props.name;
    this.description = props.description;
    this.location = props.location;
    this.verified = props.verified;
    this.accountCreatedAt = props.accountCreatedAt;
    this.nFollowers = props.nFollowers;
    this.nFollowing = props.nFollowing;
    this.nTweets = props.nTweets;
  }
}
