import React, { useRef } from "react";
import dataHandler from "../functions/DataHandler";
import whiteCircle from "./../assets/images/circle-white.svg";
import blackCircle from "./../assets/images/circle-black.svg";
import completed from "./../assets/images/completed.svg";
import cross from "./../assets/images/icon-cross.svg";

function DisplayTodos({ refresh, currentSection, theme }) {
    const dragItem = useRef();
    const dragOverItem = useRef();


    let todos;
    switch (currentSection) {
        case "All":
            todos = dataHandler.getTodos();
            break;
        case "Active":
            todos = dataHandler.getActiveTodos();
            break;
        default:
            todos = dataHandler.getCompletedTodos();
    }

    function handleDragStart(index) {
        dragItem.current = index;
    }

    function handleDragEnter(index) {
        dragOverItem.current = index;
    }

    function handleDragEnd() {
        if (dragOverItem.current !== null && dragItem.current !== null && dragItem.current !== dragOverItem.current) {
            handleRearrangeTodos(dragItem.current, dragOverItem.current);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    }

    function handleStatusChange(index) {
        dataHandler.markComplete(index);
        refresh();
    }

    function handleDeleteTodo(index) {
        dataHandler.deleteTodo(index);
        refresh();
    }

    function handleRearrangeTodos(sourceIndex, destinationIndex) {
        dataHandler.rearrangeTodos(sourceIndex, destinationIndex);
        refresh();
    }

    return (
        <div className="box-shadow rounded-t z-10 field-bg">
            {todos.map((todo, index) => {
                return (
                    <div
                        key={index}
                        className={`w-full py-3.5 px-5 flex items-center gap-3 border-b border-color ${
                            todo.finished ? "line-through finished-todo-text" : "active-todo-text"
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(todo.index)}
                        onDragEnter={() => handleDragEnter(todo.index)}
                        onDragEnd={handleDragEnd}
                    >
                        <img
                            src={todo.finished ? completed : (theme === 'light' ? whiteCircle : blackCircle)}
                            alt="white circle"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleStatusChange(todo.index)}
                        />
                        <p className="text-sm md:text-lg">{todo.content}</p>
                        <img
                            src={cross}
                            alt="cross"
                            className="w-3 h-3 md:w-4 md:h-4 ml-auto cursor-pointer"
                            onClick={() => handleDeleteTodo(index)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default DisplayTodos;
