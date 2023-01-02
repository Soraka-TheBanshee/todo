import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ITodo } from '../App';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { useTodosDispatch } from '../hooks/hooks';
import { compliteTodoStore, deleteTodoStore, editTodoStore } from '../store/todosSlice';
interface TodoProps {
  todoText: string
  isDone: Boolean
  id:ITodo["id"]
}


export function Todo({ todoText, isDone, id}: TodoProps,) {
  const [value, setValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [renameBtn, setRenameBtn] = useState('Rename')
  const dispatch = useTodosDispatch();
  
  useEffect(() => {
    setValue(todoText)
    // eslint-disable-next-line
  },[])
   
  const editTodoBtn = () => {
    dispatch(editTodoStore({id, text:value}))
    setIsEditing(prev => !prev)
  }

  const deleteTodoBtn = () => {
    dispatch(deleteTodoStore({id}))
    // deleteTodoS(Number(id))
  }
  
  const compliteTodoCheckbox = () => {
    dispatch(compliteTodoStore({id}))

    isEditing&&dispatch(editTodoStore({id, text:value}))
    
    setIsEditing(prev => prev?!prev:prev)
  }

  useLayoutEffect(() => {
    if (isEditing) {
      const todoInput = document.querySelector(`#id-${id}`) as HTMLElement
      // eslint-disable-next-line
      todoInput.focus()
      setRenameBtn("Confirm")
    } else {
      setRenameBtn("Rename")
    }
  }, [isEditing])

  return (
    <div className="lg:flex shadow-inner py-2 relative">
      <Checkbox isDone={isDone} compliteTodo={compliteTodoCheckbox}/>
      <input 
      className={`${isDone&&'bg-gray-200'} w-full h-[56px] overflow-scroll px-4 border`}
      id={`id-${id}`} 
      type='text'
      value={value}
      onChange={event => isEditing&&setValue(event.target.value)}
      />
      
      
      <div className='-ml-2 mt-2 lg:flex-none lg:ml-0 lg:mt-0'>
        <Button btnName={renameBtn} clickHandler={!isDone?editTodoBtn:undefined} />
        <Button btnName='Delete' clickHandler={deleteTodoBtn}/>
      </div>
    </div>
  );
}
