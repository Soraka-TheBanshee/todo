import React, { useState } from 'react';
import { Button } from '../Button';

interface IFormProps{
    placeholder?: string
    addTodo(value:string):void
}

const PLACEHOLDER = 'Create new todo...'

export function CreateTodoForm({ placeholder = PLACEHOLDER, addTodo }: IFormProps) {
    const [inputValuee, setInputValue] = useState('')

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        if (inputValuee.trim().length > 0) {
            addTodo(inputValuee)
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

        <Button btnName='Create' btnType='submit'/>
    </form>
  );
}
