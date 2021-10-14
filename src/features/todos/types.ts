export type TodoId = string;

export type Todo = {
  id: TodoId;
  title: string;
  completed: boolean;
};

export type FetchTodosError = {
  message: string;
};

export type TodosState = {
  status: 'loading' | 'idle';
  error: string | null;
  list: Todo[];
};
