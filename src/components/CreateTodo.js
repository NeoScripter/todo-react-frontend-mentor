import React, { useState } from "react";
import dataHandler from "../functions/DataHandler";
import plus from "./../assets/images/plus.svg";

function CreateTodo({ refresh }) {
    const [currentInput, setCurrentInput] = useState("");

    function handleClick() {
        dataHandler.addTodo(currentInput);
        setCurrentInput("");
        refresh();
    }

    return (
        <div className="w-full field-bg py-3.5 px-5 rounded flex items-center gap-3 mb-4 md:mb-6">
            <img 
                onClick={() => handleClick()}
                src={plus} 
                alt="white circle" 
                className="w-6 h-6 cursor-pointer animatable" 
            />
            <input 
                onChange={(e) => {setCurrentInput(e.target.value)}}
                type="text" 
                placeholder="Create a new todo…" 
                value={currentInput}
                className="outline-none text-sm md:text-lg field-bg new-todo-text" 
            />
        </div>
    );
}

export default CreateTodo;
