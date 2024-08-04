import React from 'react';
import dataHandler from "../functions/DataHandler";
import circle from "./../assets/images/circle.svg";
import check from "./../assets/images/icon-check.svg";

function DisplayTodos() {
    let todos = dataHandler.getTodos();
    return (
        <div className="box-sh mb-4 md:mb-6 rounded">
            {todos.map((todo, index) => {
                return (
                    <div key={index} className='w-full bg-white py-3.5 px-5 flex item-center gap-3'>
                        <img 
                            src={circle} 
                            alt="white circle" 
                            className="w-6 h-6 cursor-pointer" 
                        />
                        <p className='text-sm md:text-lg'>{todo.content}</p>
                    </div>
                );
            })}
        </div>
      );
}

export default DisplayTodos