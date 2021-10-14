import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { useTypedSelector } from '../../app/store';
import { Checkbox } from '../../libs/components/checkbox';
import { addTodo, fetchTodos, selectStatus, selectTodos, toggleTodo } from '.';

import classes from './load-todos.module.scss';

function LoadTodos() {
  const dispatch = useDispatch();
  const status = useTypedSelector(selectStatus);
  const todos = useTypedSelector(selectTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos(10));
  }, []);

  function handleClick(id: string) {
    dispatch(toggleTodo(id));
  }

  function handleChangeNewTodoInput(e: ChangeEvent<HTMLInputElement>) {
    setNewTodoTitle(e.target.value);
  }

  function handleAddTodo() {
    if (!newTodoTitle) {
      return alert('Please fulfill the todo name field');
    }
    const todo = {
      id: new Date().valueOf().toString(),
      title: newTodoTitle,
      completed: false,
    };
    dispatch(addTodo(todo));
    setNewTodoTitle('');
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className={classes.todosTitle}>Todos List</h2>
      <div className={classes.addTodoBox}>
        <div className={classes.addTodoFormControl}>
          <label htmlFor="add-todo" className={classes.addTodoLabel}>
            Add new todo
          </label>
          <input
            type="text"
            name="add-todo"
            id="add-todo"
            className={classes.addTodoInput}
            value={newTodoTitle}
            onChange={handleChangeNewTodoInput}
          />
        </div>
        <button onClick={handleAddTodo} type="button" className={classes.addTodoFormButton}>
          Add Todo
        </button>
      </div>
      {todos.map((todo) => (
        <div className={classes.todoBox} key={todo.id + todo.title}>
          <button className={classes.todoCheckbox} onClick={() => handleClick(todo.id)}>
            <Checkbox
              className={classNames(classes.todoCheckboxItem, {
                [classes.todoCheckboxCompleted]: todo.completed,
              })}
              checked={todo.completed}
            />
          </button>
          <button
            className={classNames(classes.todoTitle, {
              [classes.todoCompleted]: todo.completed,
            })}
            onClick={() => handleClick(todo.id)}
          >
            {todo.title}
          </button>
        </div>
      ))}
    </>
  );
}

export default LoadTodos;
