import React from 'react';
interface IModalProps {
  children: React.ReactNode
}

interface IShadow {
  boxShadow: string
}

export function CreateTodo({ children }: IModalProps) {
  return (
    <>
      <div className='container mx-auto text-4xl p-20 max-w-[1200px] pb-10'>
        Hello! Am ur perfect todos app! <div className='text-lg'>Without even margin after this text</div>
        
        {children}
        
      <hr className='w-full translate-y-10 border-2 border-dashed' />
      </div>

    </>
    
  );
}
