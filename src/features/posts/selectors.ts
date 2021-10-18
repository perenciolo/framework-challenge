import { RootState } from '../../app/store';

export const selectPosts = (state: RootState) => state.posts.list;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsErrors = (state: RootState) => state.posts.error?.message;
export const selectPostsErrorsStatus = (state: RootState) => state.posts.error?.status;
