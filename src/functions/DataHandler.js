class DataHandler {

    getTodos() {
        const storedTodos = localStorage.getItem('storedTodos');
        if (!storedTodos) {
            const initialTodos = [];
            localStorage.setItem('storedTodos', JSON.stringify(initialTodos));
            return initialTodos;
        }
        return JSON.parse(storedTodos);
    }

    getUnfinishedTodos() {
        const storedTodos = this.getTodos();
        return storedTodos.filter(todo => todo.finished !== true);
    }

    getCompletedTodos() {
        const storedTodos = this.getTodos();
        return storedTodos.filter(todo => todo.finished === true);
    }

    addTodo(todoContent) {
        const newTodo = {
            content: todoContent,
            finished: false
        };
        const storedTodos = this.getTodos();
        storedTodos.unshift(newTodo);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    deleteTodo(index) {
        const storedTodos = this.getTodos();
        storedTodos.splice(index, 1);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    deleteCompletedTodos() {
        let storedTodos = this.getTodos();
        storedTodos = storedTodos.filter(todo => todo.finished !== true);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }

    rearrangeTodos(fromIndex, toIndex) {
        const storedTodos = this.getTodos();
        let [removedElement] = storedTodos.splice(fromIndex, 1);
        storedTodos.splice(toIndex, 0, removedElement);
        localStorage.setItem('storedTodos', JSON.stringify(storedTodos));
    }
}

const dataHandler = new DataHandler();
export default dataHandler;