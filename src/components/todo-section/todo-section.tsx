import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './todo-section.css';


export default function TodoSection() {

    const [text, setText] = useState<string>('');
    const [todos, setTodos] = useState<{ id: string, text: string, completed: boolean }[]>(() => JSON.parse(localStorage.getItem('todos') || '[]'));
    const [radioId, setRadioId] = useState<string>('all');
    const [filteredTodos, setFilteredTodos] = useState<{ id: string, text: string, completed: boolean }[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            if (null !== inputRef.current)
                setText(inputRef.current.value);
            addTodo();
        }
    };

    const addTodo = () => {
        if (text.trim().length) {

            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    text,
                    completed: false
                }
            ])
        }
    }

    const removeTodo = (todoId: string) => {
        setTodos(todos.filter(todo => todo.id !== todoId))
    }

    const toggleComplete = (todoId: string) => {
        setTodos(
            todos.map(todo => {
                if (todo.id !== todoId) return todo;

                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        )
    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => todo.completed === false))
    }

    const filterTodos = () => {
        if (radioId === 'all') setFilteredTodos(todos)

        if (radioId === 'active')
            setFilteredTodos(
                todos.filter(
                    todo => todo.completed === false
                )
            )

        if (radioId === 'completed')
            setFilteredTodos(
                todos.filter(
                    todo => todo.completed === true
                )
            )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => filterTodos(), [todos, radioId])
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <section className='todo'>
            <div className='todo__input-block'>
                <button className='todo__add-button' onClick={addTodo}></button>
                <label >
                    <input className='todo__todo-input'
                        type='text'
                        placeholder='Create a new todo...'
                        ref={inputRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown} />
                </label>
            </div>
            <div>
                <div className="todo__list">
                    <ul>
                        {filteredTodos.map((todo) =>
                            <li key={todo.id} className='todo__item' draggable={true}>
                                <input
                                    type='checkbox'
                                    id={todo.id}
                                    className='todo__item-checkbox'
                                    checked={todo.completed}
                                    onChange={() => toggleComplete(todo.id)} />
                                <label htmlFor={todo.id}>{todo.text}</label>
                                <button className='todo__close-button' onClick={() => removeTodo(todo.id)}></button>
                            </li>)
                        }

                    </ul>
                    <div className='todo__total'>
                        <span>{filteredTodos.length} items left</span>
                        <button className='todo__clear-button' onClick={clearCompleted}>Clear Completed</button>
                    </div>
                </div>
                <div className="todo__filters-panel">
                    <input
                        type="radio"
                        className='todo__filter'
                        id="all"
                        name='filter'
                        checked={radioId === 'all'}
                        onChange={() => setRadioId('all')} />
                    <label htmlFor="all">All</label>
                    <input
                        type="radio"
                        className='todo__filter'
                        id="active"
                        name='filter'
                        checked={radioId === 'active'}
                        onChange={() => setRadioId('active')} />
                    <label htmlFor="active">Active</label>
                    <input
                        type="radio"
                        className='todo__filter'
                        id="completed"
                        name='filter'
                        checked={radioId === 'completed'}
                        onChange={() => setRadioId('completed')} />
                    <label htmlFor="completed">Completed</label>
                </div>
            </div>

        </section>
    )
}
