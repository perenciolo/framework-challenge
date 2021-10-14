import { createSlice /*, PayloadAction*/ } from '@reduxjs/toolkit';

import { fetchPosts } from './fetch-posts';
import { /*Post,*/ PostsState } from './types';

const initialState = {
  list: {},
  error: null,
  status: 'idle',
} as PostsState;

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost(/*state: PostsState, action: PayloadAction<Post>*/) {
      // state.list = state.list.filter((post) => post.id === action.payload.id);
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
      if (payload) {
        state.error = payload.message;
      }
      state.status = 'idle';
    });
  },
});

export const { removePost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
