import React, { useState } from 'react';

interface TodosFieldProps {
  children?: React.ReactNode
}

export function TodosField( { children }:TodosFieldProps) {
  
  
  return (
    <div className='
    container 
    mb-20 
    mt-10 
    mx-auto 
    text-4xl 
    max-w-[1200px] 
    px-20
    media ' >

      {children}
    </div>
    );
}
