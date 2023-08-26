import React from 'react';
import './todo-section.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import TodoInput from '../todo-input/todo-input';
import TodoList from '../todo-list/todo-list';
import TodoFilterPanel from '../todo-filter-panel/todo-filter-panel';


export default function TodoSection() {

    const todos = useAppSelector(state => state.todos.todos);
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 480px)").matches
    );

    useEffect(() => {
        window
            .matchMedia("(max-width: 480px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <section className='todo'>
            <TodoInput />
            <TodoList matches={matches} />
            {matches && <TodoFilterPanel />}
        </section>
    )
}
