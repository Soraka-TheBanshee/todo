import React from 'react';
import { ITodo } from '../App';

interface ButtonProps {
  btnName: string
  value?: string
  btnType?: "button" | "reset" | "submit" | undefined
  clickHendler?(id:ITodo["id"]):void
  id?:ITodo["id"]
}



export function Button({ btnName='Button', btnType="button", id, value, clickHendler }: ButtonProps) {
  
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
        onClick={()=>{
          if (clickHendler !== undefined && id !== undefined) {
            if (btnName === 'Delete') {
              clickHendler(id)
            }
            else if (value !== undefined) {
              clickHendler(value)
            }
          }
        }}
        >{btnName}

        </button>
  );
}
