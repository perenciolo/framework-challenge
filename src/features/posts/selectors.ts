import { RootState } from '../../app/store';

export const selectPosts = (state: RootState) => state.posts.list;
export const selectPostsStatus = (state: RootState) => state.posts.status;
