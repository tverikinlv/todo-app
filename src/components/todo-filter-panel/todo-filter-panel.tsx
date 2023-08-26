import React from 'react';
import './todo-filter-panel.css'
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setFilter } from '../../store/filter-slice';

export default function TodoFilterPanel() {
    
    const filter = useAppSelector(state => state.filter.filter)
    const dispatch = useAppDispatch();
    
    return (
        <div className="todo__filters-panel">
            <input
                type="radio"
                className='todo__filter'
                id="all"
                name='filter'
                checked={filter === 'all'}
                onChange={() => dispatch(setFilter('all'))} />
            <label htmlFor="all">All</label>
            <input
                type="radio"
                className='todo__filter'
                id="active"
                name='filter'
                checked={filter === 'active'}
                onChange={() => dispatch(setFilter('active'))} />
            <label htmlFor="active">Active</label>
            <input
                type="radio"
                className='todo__filter'
                id="completed"
                name='filter'
                checked={filter === 'completed'}
                onChange={() => dispatch(setFilter('completed'))} />
            <label htmlFor="completed">Completed</label>
        </div>
    )
}
