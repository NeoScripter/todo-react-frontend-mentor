import moon from "./assets/images/icon-moon.svg";

function App() {
    return (
        <div className="App">
            <div className="bg-overlay h-52 md:h-80"></div>
            <div className="max-w-lg mx-auto pt-10 md:pt-16">
                <header className="flex items-center justify-between mb-10 md:mb-12">
                    <h1 className="ff-bold text-4xl md:text-5xl text-white tracking-superwide">TODO</h1>
                    <div className="w-6 h-6 md:w-8 md:h-8">
                        <img src={moon} alt="Moon" className="w-full h-full"/>
                    </div>
                </header>
                <main className="pb-10 md:pb-16">
                  hello world
                </main>
                <p className="text-center text-gray-400 text-sm">Drag and drop to reorder list</p>
            </div>
        </div>
    );
}

export default App;
