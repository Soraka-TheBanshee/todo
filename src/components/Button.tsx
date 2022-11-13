import React from 'react';
import { ITodo } from '../App';
import { addTodo } from '../store/todosSlice';
import { useTodosDispatch, useTodosSelector } from './hooks/hooks';

interface ButtonProps {
  btnName: string
  value?: string
  btnType?: "button" | "reset" | "submit" | undefined
  clickHendler?():void
  id?:ITodo["id"]
}



export function Button({ btnName='Button', btnType="button", clickHendler }: ButtonProps) {

  const todos = useTodosSelector(state => state.todos.todos)
  const dispatch = useTodosDispatch();


  const testClickHendler = () => {
    console.log(todos);
    dispatch(addTodo(btnName))

    if (clickHendler !== undefined) {
      clickHendler()
    }
    // clickHendler()
  }
  
  return (
    <button 
        className={`
        py-2 
        px-4 
        ml-2 
        shadow 
        hover:shadow-2xl 
        hover:bg-gray-500 
        active:shadow 
        active:text-red-100 
        duration-100 border 
        text-white 
        ${btnName === 'Confirm'?'bg-gray-500 text-red-50':'bg-gray-400'}` }
        type={btnType}
        onClick={testClickHendler}
        >{btnName}

        </button>
  );
}
