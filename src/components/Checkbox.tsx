import React from 'react';
interface CheckboxInterface {
  isDone: Boolean
  compliteTodo():void
}

export function Checkbox({ isDone, compliteTodo, }:CheckboxInterface) {

  const textColor = isDone?'text-black':'text-white';
  const border = !isDone&&'bg-gray-300'

  return (
    <div className={`${border} h-[45px] w-[45px] scale-75 absolute top-[50%] -translate-y-[50%] -left-12`} onClick={compliteTodo}>
        <div className='inline-block w-[35px] h-[35px] text-center bg-white hover:bg-gray-300 relative top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <div className={`-translate-y-1 select-none cursor-pointer font-bold ${textColor}`}>
                ✓
            </div>
        </div>
    </div>
  );
}