import React, { useEffect } from 'react';
import { Button } from './components/Button';
import { CreateTodo } from './components/CreateTodo';
import { CreateTodoForm } from './components/forms/CreateTodoForm';
import { Todo } from './components/Todo';
import { TodosField } from './components/TodosField';
import { useTodosDispatch, useTodosSelector } from './hooks/hooks';
import store from './store';
import { addTodoStore, initTodosStore } from './store/todosSlice';

export interface ITodo {
  id: string
  value: string
  isdone: Boolean
}


function App() {
  let todosList = useTodosSelector(state => state.todos.todos);
  const dispatch = useTodosDispatch();

  useEffect(() => {
    dispatch(initTodosStore([]))
    // eslint-disable-next-line
  }, [])

  const addTodo = (value:string) => {
    dispatch(addTodoStore({value}))
  }
  


  const checkFunc = () => {
    console.log(store.getState().todos.todos);
  }

  return (
    <>
      <CreateTodo>
        <CreateTodoForm addTodo={addTodo} />
      </CreateTodo>
      
      <TodosField >
        
        {todosList.map( todo => 
          <Todo 
          todoText={todo.value} 
          isDone={todo.isdone} 
          id={todo.id} 
          key={todo.id} 
          />
        )}

      <Button btnName='CheckStore' clickHandler={checkFunc} />
      </TodosField >
    </>
  );
}

export default App;
