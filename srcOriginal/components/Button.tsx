import React from 'react';
interface ButtonProps {
  btnName: string
  btnType?: "button" | "reset" | "submit" | undefined
  clickHandler?():void
}



export function Button({ btnName='Button', btnType="button", clickHandler }: ButtonProps) {
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
        onClick={clickHandler}
        >{btnName}

        </button>
  );
}
