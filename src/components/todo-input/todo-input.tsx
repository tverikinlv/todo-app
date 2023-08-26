import React from 'react';
import './todo-input.css'
import { useAppDispatch} from '../../hooks';
import { addTodo } from '../../store/todoslice';
import { useState, useRef} from 'react';

export default function TodoInput() {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    dispatch(addTodo({ text }));
    setText('');
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      if (null !== inputRef.current)
        setText(inputRef.current.value);
      addTask();
    }
  };

  return (
    <div className='todo__input-block'>
      <button className='todo__add-button' onClick={addTask}></button>
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
  )
}
