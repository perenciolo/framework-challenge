import { ChunkArrayResult } from '../../libs/utils/chunk-array';

export type PostId = string;

export type Post = {
  userId: string;
  id: PostId;
  title: string;
  body: string;
};

export type FetchPostsError = {
  message: string;
};

export type PostsState = {
  status: 'loading' | 'idle';
  error: string | null;
  list: ChunkArrayResult<Post[]>;
};
