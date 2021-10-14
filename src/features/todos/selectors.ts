import { RootState } from '../../app/store';

export const selectTodos = (state: RootState) => state.todos.list;
export const selectStatus = (state: RootState) => state.todos.status;
