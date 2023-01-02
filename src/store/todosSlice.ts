import { createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../App";
import { compliteTodoS, createTodoS, deleteTodoS, editeTodoS, getTodosS } from "../serverAPI";

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

const socketStore = new WebSocket('ws://localhost:5000');
socketStore.onopen = () => {
    console.log("Socket connected");
    
    getTodosS(socketStore)
}

export const handleMessage = (store:any) => (next:any) => (action:any) => {
    switch (action.type) {
        case 'todos/initTodosStore':
            console.log('middlewear(todos/initTodosStore) is working');

            socketStore.onmessage = ({data}) => {
                const parsedData = JSON.parse(data)
                action.payload = parsedData

                console.log('message from server recived');
                
                return next(action)
            }

            break;

        default:
            break;
    }

    next(action)    
}



const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos:  initState
    },
    reducers: {
        initTodosStore(state, action) {            
            state.todos = action.payload
        },

        addTodoStore(state, action:IActionCreate) {         
            createTodoS(socketStore, action.payload.value)
        },

        deleteTodoStore(state, action:IActionDelete) {
            const id = Number(action.payload.id)

            deleteTodoS(socketStore, id)
        },

        editTodoStore(state, action:iActionEdit) {
            const id = Number(action.payload.id)
            const text = action.payload.text

            editeTodoS(socketStore, id, text)
            
        },

        compliteTodoStore(state, action:IActionComplite) {
            const id = Number(action.payload.id)

            compliteTodoS(socketStore, id)
        },
    }
});

export const { addTodoStore, deleteTodoStore, editTodoStore, compliteTodoStore, initTodosStore } = todosSlice.actions;

export default todosSlice.reducer;