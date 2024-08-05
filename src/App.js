import React, { useState, useEffect } from 'react';
import moon from "./assets/images/icon-moon.svg";
import sun from "./assets/images/icon-sun.svg";
import bgDark from "./assets/images/bg-desktop-dark.jpg";
import bgLight from "./assets/images/bg-desktop-light.jpg";
import CreateTodo from "./components/CreateTodo";
import DisplayTodos from "./components/DisplayTodos";
import StatePanel from './components/StatePanel';

function App() {
    const [switcher, setSwitcher] = useState(false);
    const [currentSection, setCurrentSection] = useState("All");
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    function refresh() {
        setSwitcher(prev => !prev);
    }
    useEffect(() => {}, [switcher]);

    const handleThemeChange = (event) => {
        setTheme(event.target.id);
    };

    return (
        <div>
            <div 
                className="bg-overlay h-52 md:h-80"
                style={{ backgroundImage: `url(${theme === 'light' ? bgLight : bgDark})` }}
                >
            </div>
            <div className="max-w-lg mx-auto pt-10 md:pt-16 px-6">
                <header className="flex items-center justify-between mb-10 md:mb-12">
                    <h1 className="ff-bold text-4xl md:text-5xl text-white tracking-superwide">TODO</h1>
                    <div className="w-6 h-6 md:w-8 md:h-8 controls__wrapper">
                        <label htmlFor="light" className="theme-label w-full h-full">
                            <img src={sun} alt="Sun" />
                            <input 
                                type="radio" 
                                name="theme" 
                                id="light" 
                                onChange={handleThemeChange} 
                                checked={theme === 'light'} 
                            />
                        </label>
                        <label htmlFor="dark" className="theme-label w-full h-full">
                            <img src={moon} alt="Moon" />
                            <input 
                                type="radio" 
                                name="theme" 
                                id="dark" 
                                onChange={handleThemeChange} 
                                checked={theme === 'dark'} 
                            />
                        </label>
                    </div>
                </header>
                <main className="mb-10 md:mb-16">
                    <CreateTodo refresh={refresh} />
                    <DisplayTodos refresh={refresh} currentSection={currentSection} theme={theme} />
                    <StatePanel refresh={refresh} section={currentSection} setSection={setCurrentSection}/>
                </main>
                <p className="text-center bottom-color text-sm">Drag and drop to reorder list</p>
            </div>
        </div>
    );
}

export default App;
