class DataHandler {

    getTodos() {
        const storedTodos = localStorage.getItem('storedTodos');
        if (!storedTodos) {
            const initialTodos = [
                {
                    content: "Walk the dog",
                    finished: false,
                    index: 0
                },
                {
                    content: "Water the plant",
                    finished: true,
                    index: 1
                },
                {
                    content: "Do the groceries",
                    finished: false,
                    index: 2
                }
            ];
            localStorage.setItem('storedTodos', JSON.stringify(initialTodos));
            return initialTodos;
        }
        return JSON.parse(storedTodos);
    }

    getActiveTodos() {
        const storedTodos = this.getTodos();
        return storedTodos.filter(todo => todo.finished !== true);
    }

    getCompletedTodos() {
        const storedTodos = this.getTodos();
        return storedTodos.filter(todo => todo.finished === true);
    }

    distributeIndex(todos) {
        todos.forEach((todo, index) => {
            todo.index = index;
        })
    }

    addTodo(todoContent) {
        const storedTodos = this.getTodos();
        const newTodo = {
            content: todoContent,
            finished: false,
            index: 0
        };
        storedTodos.unshift(newTodo);
        this.distributeIndex(storedTodos);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    markComplete(index) {
        const storedTodos = this.getTodos();
        storedTodos[index].finished = !storedTodos[index].finished;
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    deleteTodo(index) {
        const storedTodos = this.getTodos();
        storedTodos.splice(index, 1);
        this.distributeIndex(storedTodos);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    deleteCompletedTodos() {
        let storedTodos = this.getTodos();
        storedTodos = storedTodos.filter(todo => todo.finished !== true);
        this.distributeIndex(storedTodos);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    rearrangeTodos(fromIndex, toIndex) {
        const storedTodos = this.getTodos();
        let [removedElement] = storedTodos.splice(fromIndex, 1);
        storedTodos.splice(toIndex, 0, removedElement);
        this.distributeIndex(storedTodos);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }
}

const dataHandler = new DataHandler();
export default dataHandler;