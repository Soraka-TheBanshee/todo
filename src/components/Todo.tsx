import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ITodo } from '../App';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
// import { useWindowListner } from './useWindowListener';

interface TodoProps {
  todoText?: string
  isDone: Boolean
  id:ITodo["id"]
  compliteTodo(id:ITodo['id']):void
  deleteTodo(id:ITodo['id']):void
  editTodo(id:ITodo['id'], text:ITodo['text']):void
}


export function Todo({ todoText='Hello! Am todo! REAL ONE!', isDone, id, compliteTodo, deleteTodo, editTodo}: TodoProps,) {
  const [value, setValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [renameBtn, setRenameBtn] = useState('Rename')
  

  useEffect(() => setValue(todoText),[])
   
  const editTodoBtn = (value:ITodo['text']) => {
    setIsEditing(prev => {
      if (prev) {
        editTodo(id, value)
        
      }
      return !prev
    })
  }
  
  const compliteTodoCheckbox = (id:ITodo["id"]) => {
    compliteTodo(id)
    setIsEditing(prev => {
      console.log(prev);
      
      if (prev) {
        editTodo(id, value)
        
        return !prev
      }
      else {
        return prev
      }
    })
  }

  useLayoutEffect(() => {
    if (isEditing) {
      const input = document.querySelector(`#id-${id}`) as HTMLElement
      input.focus()
      setRenameBtn("Confirm")
    } else {
      setRenameBtn("Rename")
    }
  }, [isEditing])

  return (
    <div className="lg:flex mb-2 shadow-inner py-2 relative">
      <Checkbox isDone={isDone} id={id} compliteTodo={compliteTodoCheckbox}/>
      <input 
      className={`${isDone&&'bg-gray-200'} w-full h-[56px] overflow-scroll px-4 border`}
      id={`id-${id}`} 
      type='text'
      value={value}
      onChange={event => isEditing&&setValue(event.target.value)}
      />
      
      
      <div className='-ml-2 mt-2 lg:flex-none lg:ml-0 lg:mt-0'>
        <Button btnName={renameBtn} clickHendler={!isDone?editTodoBtn:undefined} id={id} value={value} />
        <Button btnName='Delete' clickHendler={deleteTodo} id={id} />
      </div>
    </div>
  );
}
