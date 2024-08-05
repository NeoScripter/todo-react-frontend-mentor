import React, { useState, useEffect } from 'react';
import moon from "./assets/images/icon-moon.svg";
import CreateTodo from "./components/CreateTodo";
import DisplayTodos from "./components/DisplayTodos";

function App() {
    const [switcher, setSwitcher] = useState(false);

    function refresh() {
        setSwitcher(prev => !prev);
    }
    useEffect(() => {}, [switcher]);
    return (
        <div className="App">
            <div className="bg-overlay h-52 md:h-80"></div>
            <div className="max-w-lg mx-auto pt-10 md:pt-16 px-6">
                <header className="flex items-center justify-between mb-10 md:mb-12">
                    <h1 className="ff-bold text-4xl md:text-5xl text-white tracking-superwide">TODO</h1>
                    <div className="w-6 h-6 md:w-8 md:h-8">
                        <img src={moon} alt="Moon" className="w-full h-full" />
                    </div>
                </header>
                <main className="pb-10 md:pb-16">
                    <CreateTodo refresh={refresh} />
                    <DisplayTodos refresh={refresh} />
                </main>
                <p className="text-center text-gray-400 text-sm">Drag and drop to reorder list</p>
            </div>
        </div>
    );
}

export default App;
