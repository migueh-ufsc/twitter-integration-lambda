export interface ITweet {
  id: string;
  text: string;
  authorId: string;
  nRetweet: number;
  nReply: number;
  nLike: number;
  nQuote: number;
  mentions?: { username: string; id: string }[];
  isReply: boolean;
  geolocation?: string;
}
