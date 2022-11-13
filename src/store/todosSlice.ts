import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo(state, action) {
            console.log(state);
            console.log(action);
            
        },
        deleteTodo(state, action) {},
        editTodo(state, action) {},
        compliteTodo(state, action) {},
    }
});

export const { addTodo, deleteTodo, editTodo, compliteTodo } = todosSlice.actions;

export default todosSlice.reducer;