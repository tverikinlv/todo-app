import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filter: 'all'
    },
    reducers: {
        setFilter(state, action) {
            if (action.payload === 'all') state.filter = 'all';

            if (action.payload === 'active') state.filter = 'active';

            if (action.payload === 'completed') state.filter = 'completed';
        }
    }
}
)

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer; 