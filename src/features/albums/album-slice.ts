import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchAlbums } from './fetch-albums';
import { Album, AlbumsState } from './types';

const initialState = {
  list: [],
  error: null,
  status: 'idle',
} as AlbumsState;

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    addAlbum(state: AlbumsState, action: PayloadAction<Album>) {
      state.list.unshift(action.payload);
    },
    removeAlbum(state: AlbumsState, action: PayloadAction<Album>) {
      state.list = state.list.filter((album) => album.id === action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(fetchAlbums.fulfilled, (state, { payload }) => {
      state.list.push(...payload);
      state.status = 'idle';
    });

    builder.addCase(fetchAlbums.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.message;
      }
      state.status = 'idle';
    });
  },
});

export const { addAlbum, removeAlbum } = albumsSlice.actions;
export const albumsReducer = albumsSlice.reducer;
