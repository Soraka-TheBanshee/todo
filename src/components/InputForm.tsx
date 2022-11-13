import React, { useState } from 'react';
import { ITodo } from '../App';
import { Button } from './Button';

interface IFormProps{
    placeholder?: string
    id: string
    createTodo(todo:ITodo ):void
}

export function Form(
    { placeholder='Create new todo...', id, createTodo }: IFormProps
    ) {
        
        
        const [inputValuee, setInputValue] = useState('')

        const submitHandler = (event: React.FormEvent) => {
            event.preventDefault()
            if (inputValuee.trim().length > 0) {
                const newTodo:ITodo = {id: id , text:inputValuee, isDone: false}
    
                createTodo(newTodo)
                setInputValue('')
            }
            else {
                window.alert("CMON! U cant be that lazzy")
            }
            
        }
        

  return (
    <form className='flex' onSubmit={submitHandler}>
        <input
        className='border py-2 px-4 w-full'
        type="text"
        name='text'
        placeholder={placeholder}
        value={inputValuee}
        onChange={e => setInputValue(e.target.value)}
        />

        <Button btnName='Create' btnType='submit' />
    </form>
  );
}
