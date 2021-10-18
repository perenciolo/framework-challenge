import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../config/constants';
import { chunkArray, ChunkArrayResult } from '../../libs/utils/chunk-array';
import { FetchPostsError, Post } from './types';

export const fetchPosts = createAsyncThunk<
  ChunkArrayResult<Post[]>,
  number | undefined,
  { rejectValue: FetchPostsError }
>('posts/fetch', async (chunkSize = 5, thunkApi) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    return chunkArray<Post>(result, chunkSize);
  } catch (error) {
    return thunkApi.rejectWithValue({
      status: (error as Response)?.status || 500,
      message: (await (error as Response).json())?.message || 'Failed to fetch Posts.',
    });
  }
});
