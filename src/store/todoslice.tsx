import { createSlice } from '@reduxjs/toolkit';

type TodoSliceInitState = { id: string, text: string, completed: boolean }[];
const initTodos = () => JSON.parse(localStorage.getItem('todos') || '[]') as TodoSliceInitState;

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: initTodos()
    },
    reducers: {
        addTodo(state, action) {
            if (action.payload.text) {
                state.todos.push(
                    {
                        id: new Date().toISOString(),
                        text: action.payload.text,
                        completed: false
                    }
                );
            };
        },

        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)

        },

        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            if (toggledTodo) toggledTodo.completed = !toggledTodo.completed;
        },

        clearCompleted(state) {
            state.todos = state.todos.filter(todo => todo.completed === false)
        }
    }
}
)

export const { addTodo, removeTodo, toggleComplete, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer; 