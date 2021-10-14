import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_URL } from '../../config/constants';
import { FetchTodosError, Todo } from './types';

export const fetchTodos = createAsyncThunk<Todo[], number, { rejectValue: FetchTodosError }>(
  'todos/fetch',
  async (limit: number, thunkApi) => {
    const response = await fetch(`${BASE_URL}/todos`);

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to fetch todos.',
      });
    }

    return (await response.json()).slice(0, limit) as Promise<Todo[]>;
  }
);
