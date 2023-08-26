import React from 'react';
import './todo-item.css';
import { useAppDispatch } from '../../hooks';
import { toggleComplete, removeTodo } from '../../store/todoslice';

export default function TodoItem({id, text, completed} : {id: string, text: string, completed: boolean}, key:string) {
    const dispatch = useAppDispatch();

    return (
        <li className='todo__item'>
            <input
                type='checkbox'
                id={id}
                className='todo__item-checkbox'
                checked={completed}
                onChange={() => dispatch(toggleComplete({id}))} />
            <label htmlFor={id}>{text}</label>
            <button className='todo__close-button' onClick={() => dispatch(removeTodo({id}))}></button>
        </li>
    )
}
