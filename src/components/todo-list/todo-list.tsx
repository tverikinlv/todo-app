import React from 'react';
import './todo-list.css';
import TodoItem from '../todo-item/todo-item';
import TodoFilterPanel from '../todo-filter-panel/todo-filter-panel';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { clearCompleted } from '../../store/todoslice';

export default function TodoList({ matches }: { matches: boolean }) {
    const todos = useAppSelector(state => state.todos.todos);
    const filter = useAppSelector(state => state.filter.filter)
    const dispatch = useAppDispatch();

    const filterTodos = () => {
        if (filter === 'all') return todos
        if (filter === 'active') return todos.filter(todo => todo.completed === false);
        if (filter === 'completed') return todos.filter(todo => todo.completed === true)
    }

    const filteredTodos = filterTodos();

    return (
        <div className="todo__list">
            <ul>
                {filteredTodos && filteredTodos.map((todo) => <TodoItem {...todo} key={todo.id} />)}
            </ul>
            <div className='todo__total'>
                <span>{filteredTodos && filteredTodos.length} items left</span>
                {!matches && <TodoFilterPanel />}
                <button className='todo__clear-button' onClick={() => dispatch(clearCompleted())}>Clear Completed</button>
            </div>
        </div>
    )
}
