import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { albumsReducer } from '../features/albums';
import { postsReducer } from '../features/posts';
import { todosReducer } from '../features/todos';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    albums: albumsReducer,
    posts: postsReducer,
  },
});

export type StoreType = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
