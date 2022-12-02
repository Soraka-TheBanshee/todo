import { configureStore } from "@reduxjs/toolkit";
import todosSlice, { handleMessage } from "./todosSlice";

const store = configureStore({
    reducer: {todos: todosSlice},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(handleMessage)
})

export type RootState = ReturnType< typeof store.getState >
export type TodosDispatch = typeof store.dispatch

export default store
