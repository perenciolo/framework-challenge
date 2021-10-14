import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../config/constants';
import { chunkArray, ChunkArrayResult } from '../../libs/utils/chunk-array';
import { FetchPostsError, Post } from './types';

export const fetchPosts = createAsyncThunk<
  ChunkArrayResult<Post[]>,
  number | undefined,
  { rejectValue: FetchPostsError }
>('posts/fetch', async (chunkSize = 5, thunkApi) => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: 'Failed to fetch Posts.',
    });
  }

  return chunkArray<Post>(await response.json(), chunkSize);
});
