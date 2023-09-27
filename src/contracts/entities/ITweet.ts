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
  isRetweet: boolean;
  geolocation?: string; //todo precisa mudar pq o que vem da api é um geojson
  tweetCreatedAt?: Date;
}
