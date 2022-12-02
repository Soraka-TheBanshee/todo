import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice";

const store = configureStore({
    reducer: {todos: todosSlice}
})

export type RootState = ReturnType< typeof store.getState >
export type TodosDispatch = typeof store.dispatch

export default store
