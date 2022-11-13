import React, { useEffect, useState } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { Form } from './components/InputForm';
import { Todo } from './components/Todo';
import { TodosField } from './components/TodosField';

export interface ITodo {
  id: string
  text: string
  isDone: Boolean
}

function App() {
  
  const [indexes, setIndexes] = useState([0])
  const id = indexes[0].toString()
  const [todosList, setTodosList] = useState<ITodo[]>([]);
  
  
  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    
    if (todosString !== null) {
      const todos = JSON.parse(todosString) as ITodo[]
      setTodosList(todos) 
      
    }

    const indexesString = localStorage.getItem('indexes');
    if (indexesString !== null) {
      const indexes = JSON.parse(indexesString) as number[]
      setIndexes(indexes)
    }
    
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todosList))
    localStorage.setItem('indexes', JSON.stringify(indexes))
  }, [todosList])
  
  
  const addTodo = (todo:ITodo) => {
    setTodosList((prev) => [...prev, todo])
    setIndexes(prev => {
      let newIds = [...prev]
      
      if (newIds.length > 1) {
        newIds.shift()
      }
      else {
        newIds = [newIds[0] + 1]
      }

      return newIds
    })
  }

  const deleteTodo = (id:ITodo["id"]):void => {
    console.log(id);
    
    setTodosList(prev => prev.filter(e => e.id !== id))
    setIndexes(prev => {
      let newIds = [...prev]
      
      newIds.unshift(Number(id))

      return newIds
    })
  }

  const editTodo = (id:ITodo["id"], text:ITodo['text']):void => {
    setTodosList(prev => prev.map(e => e.id === id?{...e, text: text}:e)) 
  }

  const compliteTodo = (id:ITodo["id"]):void => {
    setTodosList(prev => prev.map((e) => e.id === id?{...e, isDone: !e.isDone}:e))
  }

  return (
    <>
      <CreateTodo>
        <Form createTodo={addTodo} id={id} />
      </CreateTodo>
      
      <TodosField >
        
        {todosList.map( todo => 
          <Todo 
          todoText={todo.text} 
          isDone={todo.isDone} 
          id={todo.id} 
          key={todo.id} 
          compliteTodo={compliteTodo} 
          deleteTodo={deleteTodo} 
          editTodo={editTodo}
          />
        )}

      </TodosField >
    </>
  );
}

export default App;
