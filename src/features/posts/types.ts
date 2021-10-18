import { ChunkArrayResult } from '../../libs/utils/chunk-array';

export type PostId = string;

export type Post = {
  userId: string;
  id: PostId;
  title: string;
  body: string;
};

export type FetchPostsError = {
  status?: number;
  message?: string;
};

export type PostsState = {
  status: 'loading' | 'idle';
  error: FetchPostsError | null;
  list: ChunkArrayResult<Post[]>;
};
