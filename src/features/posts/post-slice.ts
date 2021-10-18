import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chunkArray } from '../../libs/utils/chunk-array';
import { fetchPosts } from './fetch-posts';
import { Post, PostsState } from './types';

const initialState = {
  list: {},
  error: null,
  status: 'idle',
} as PostsState;

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost(
      state: PostsState,
      action: PayloadAction<{
        id: Post['id'];
      }>
    ) {
      const chunkSize = Object.values(state.list)[0].length;
      const x = chunkArray(
        Object.values(state.list)
          .flat()
          .filter((post) => Number(post.id) !== Number(action.payload.id)),
        chunkSize
      );
      state.list = x;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.list = { ...payload };
      state.status = 'idle';
    });

    builder.addCase(fetchPosts.rejected, (state, { payload }) => {
      state.error = {
        message: payload?.message,
        status: payload?.status,
      };
      state.status = 'idle';
    });
  },
});

export const { removePost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
