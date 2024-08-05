import React, { useState, useEffect } from "react";
import dataHandler from "../functions/DataHandler";

function StatePanel({ refresh, section, setSection }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const buttons = ["All", "Active", "Completed"];

    function handleClearCompleted() {
        dataHandler.deleteCompletedTodos();
        refresh();
    }

    function handleSectionChange(button) {
        setSection(button);
        refresh();
    }

    const activeTodos = dataHandler.getActiveTodos();

    return (
        <div>
        <div className="w-full py-3.5 px-5 flex item-center gap-3 justify-between text-sm box-shadow field-bg rounded-b">
            <div className="bottom-color cursor-pointer">
                {activeTodos.length} {activeTodos.length === 1 ? "item" : "items"} left
            </div>
            {!isMobile && <div className="field-bg rounded flex items-center justify-center gap-5 font-bold">
            {buttons.map((button, index) => {
                return (
                    <button 
                        key={index}
                        onClick={() => handleSectionChange(button)}
                        className={section === button ? "active-section bottom-color" : "bottom-color"}
                    >{button}
                    </button>
                )
            })}
        </div>}
            <button onClick={() => handleClearCompleted()} className="bottom-color">Clear completed</button>
        </div>
        {isMobile && <div className="w-full field-bg py-3.5 px-5 rounded flex items-center justify-center gap-5 mt-4 md:mt-6 box-shadow font-bold">
            {buttons.map((button, index) => {
                return (
                    <button 
                        key={index}
                        onClick={() => handleSectionChange(button)}
                        className={section === button ? "active-section bottom-color" : "bottom-color"}
                    >{button}
                    </button>
                )
            })}
        </div>}
        </div>
    );
}

export default StatePanel;
