
interface IMsg {
    command: 'create' | 'edit' | 'delete' | 'complite' | 'get'
    value?: string
    id?: number
}



export const sendTesto = (socket:WebSocket, text:string):void => {
    socket.send(text)
    socket.onmessage = ({data}) => {
        data = JSON.parse(data)
        
        console.log(data, typeof data);
        
    }
}

export const createTodoS = (socket:WebSocket, text:string):void => {
    const msg:IMsg = {
        command: 'create',
        value: text,
    }  

    socket.send(JSON.stringify(msg))
}

export const deleteTodoS = (socket:WebSocket, id:number):void => {
    const msg:IMsg = {
        command: 'delete',
        id: id
    }  

    socket.send(JSON.stringify(msg))
}

export const editeTodoS = (socket:WebSocket, id:number, text:string):void => {
    const msg:IMsg = {
        command: 'edit',
        value: text,
        id: id
    }  

    socket.send(JSON.stringify(msg))
}

export const compliteTodoS = (socket:WebSocket, id:number):void => {
    const msg:IMsg = {
        command: 'complite',
        id: id
    }  

    socket.send(JSON.stringify(msg))
}

export const getTodosS = (socket:WebSocket, ):void => {
    const msg:IMsg = {
        command: 'get',
    }  

    socket.send(JSON.stringify(msg))

    
}