import React, { useState } from "react";
import dataHandler from "../functions/DataHandler";
import circle from "./../assets/images/circle.svg";

function CreateTodo({ refresh }) {
    const [currentInput, setCurrentInput] = useState("");

    function handleClick() {
        dataHandler.addTodo(currentInput);
        setCurrentInput("");
        refresh();
    }

    return (
        <div className="w-full bg-white py-3.5 px-5 rounded flex item-center gap-3 mb-4 md:mb-6">
            <img 
                onClick={() => handleClick()}
                src={circle} 
                alt="white circle" 
                className="w-6 h-6 cursor-pointer" 
            />
            <input 
                onChange={(e) => {setCurrentInput(e.target.value)}}
                type="text" 
                placeholder="Create a new todo…" 
                value={currentInput}
                className="outline-none text-sm md:text-lg" 
            />
        </div>
    );
}

export default CreateTodo;
