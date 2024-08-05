import React, { useState, useRef } from "react";
import dataHandler from "../functions/DataHandler";
import circle from "./../assets/images/circle.svg";
import completed from "./../assets/images/completed.svg";
import cross from "./../assets/images/icon-cross.svg";

function DisplayTodos({ refresh }) {
    const dragItem = useRef();
    const dragOverItem = useRef();

    let todos = dataHandler.getTodos();

    function handleDragStart (index) {
        dragItem.current = index;
    };

    function handleDragEnter(index) {
        dragOverItem.current = index;
    };

    function handleDragEnd () {
        if (dragOverItem.current !== null && dragItem.current !== null && dragItem.current !== dragOverItem.current) {
            handleRearrangeTodos(dragItem.current, dragOverItem.current);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };

    function handleStatusChange(index) {
        dataHandler.markComplete(index);
        refresh();
    }

    function handleClearCompleted() {
        dataHandler.deleteCompletedTodos();
        refresh();
    }

    function handleDeleteTodo(index) {
        dataHandler.deleteTodo(index);
        refresh();
    }

    function handleRearrangeTodos (sourceIndex, destinationIndex) {
        dataHandler.rearrangeTodos(sourceIndex, destinationIndex);
        refresh();
    };

    const unfinishedTodos = dataHandler.getUnfinishedTodos();
    return (
        <div className="box-sh mb-4 md:mb-6 rounded z-10 bg-white">
            {todos.map((todo, index) => {
                return (
                    <div
                        key={index}
                        className={`w-full py-3.5 px-5 flex items-center gap-3 border-b border-gray-300 ${
                            todo.finished ? "line-through text-gray-300" : "active-todo-tx"
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(todo.index)}
                        onDragEnter={() => handleDragEnter(todo.index)}
                        onDragEnd={handleDragEnd}
                    >
                        <img
                            src={todo.finished ? completed : circle}
                            alt="white circle"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleStatusChange(index)}
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
            <div className="w-full py-3.5 px-5 flex item-center gap-3 justify-between text-sm  text-gray-400">
                <div>
                    {unfinishedTodos.length} {unfinishedTodos.length === 1 ? "item" : "items"} left
                </div>
                <button onClick={() => handleClearCompleted()}>Clear completed</button>
            </div>
        </div>
    );
}

export default DisplayTodos;
