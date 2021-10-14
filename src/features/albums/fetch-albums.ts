import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../config/constants';
import { Album, FetchAlbumsError } from './types';

export const fetchAlbums = createAsyncThunk<Album[], number, { rejectValue: FetchAlbumsError }>(
  'albums/fetch',
  async (limit: number, thunkApi) => {
    const response = await fetch(`${BASE_URL}/albums`);

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to fetch albums.',
      });
    }

    return (await response.json()).slice(0, limit) as Promise<Album[]>;
  }
);
