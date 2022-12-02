import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../App";

// === interfaces starts ===============================================
interface IActionCreate {
    payload: {value: string}
    type: string
}

interface iActionEdit {
    payload: {
        id: string
        text: string
    }
    type: string
}

interface IActionDelete {
    payload: {id: string}
    type: string
}

interface IActionComplite {
    payload: {id: string}
    type: string
}

// === interfaces ends ===============================================

const initState:ITodo[] = []
const idsStack = [0]

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos:  initState
    },
    reducers: {
        addTodoStore(state, action:IActionCreate) {         
            state.todos.push({
                id: idsStack[0].toString(),
                text: action.payload.value,
                isDone: false
            })

            if (idsStack.length === 1) {
                idsStack[0] += 1
                console.log('Lengh = 1');
                
            } 
            else if (idsStack.length > 1) {
                idsStack.shift()
                console.log('Lengh > 1');
                
            } 
            else {
                throw new Error("Something is wrong with ids generator");
            }
        },
        deleteTodoStore(state, action:IActionDelete) {
            const id = action.payload.id

            state.todos = state.todos.filter(e => e.id !== id)
            
            if (!isNaN(Number(id))) {
                idsStack.unshift(Number(id));
            }
            else {
                throw new Error("Number( id ) has returned NaN");
            }
        },
        editTodoStore(state, action:iActionEdit) {
            const id = action.payload.id
            const text = action.payload.text

            state.todos = state.todos.map(e => e.id === id?{...e, text}:e)
            
        },
        compliteTodoStore(state, action:IActionComplite) {
            const id = action.payload.id

            state.todos = state.todos.map(e => e.id === id?{...e, isDone: !e.isDone}:e)
        },
    }
});

export const { addTodoStore, deleteTodoStore, editTodoStore, compliteTodoStore } = todosSlice.actions;

export default todosSlice.reducer;