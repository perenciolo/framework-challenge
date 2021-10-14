import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchTodos } from './fetch-todos';
import { Todo, TodosState } from './types';
import { TodoId } from '.';

const initialState = {
  list: [],
  error: null,
  status: 'idle',
} as TodosState;

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state: TodosState, action: PayloadAction<Todo>) {
      state.list.unshift(action.payload);
    },
    toggleTodo(state, action: PayloadAction<TodoId>) {
      const index = state.list.findIndex(({ id }) => id === action.payload);
      if (index > -1) {
        state.list[index].completed = !state.list[index].completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });

    builder.addCase(fetchTodos.fulfilled, (state, { payload }) => {
      state.list.push(...payload);
      state.status = 'idle';
    });

    builder.addCase(fetchTodos.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.message;
      }
      state.status = 'idle';
    });
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
