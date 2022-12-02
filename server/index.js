const ws = require('ws')
const { createTodo, deleteTodo, editTodo, compliteTodo, getTodos } = require('./todos_model')

const PORT = 5000

const dataServer = new ws.Server(
    {
        port: PORT,
    },
    () => console.log(`server hasss started on port ${PORT}`)
)

dataServer.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        const decodedMessage = decodeURIComponent(message)

        const decodedObj = JSON.parse(decodedMessage)
        const command = decodedObj.command
        console.log(decodedObj);

        switch (command) {
            case 'create':
                createTodo(decodedObj.value).then(ret => {
                    console.log(ret);
                    getTodos().then(res => {
                        // console.log(res);
    
                        ws.send(JSON.stringify(res))
                    
                    })
                })
                
                break;
            case 'delete':
                deleteTodo(decodedObj.id).then(() => {
                    getTodos().then(res => {
                        // console.log(res);
    
                        ws.send(JSON.stringify(res))
                    
                    })
                });
                
                break;
            case 'edit':
                editTodo(decodedObj.value, decodedObj.id).then(() => {
                    getTodos().then(res => {
                        // console.log(res);
    
                        ws.send(JSON.stringify(res))
                    
                    })

                });

                break;
            case 'complite':
                compliteTodo(decodedObj.id).then(() => {
                    getTodos().then(res => {
                        // console.log(res);
    
                        ws.send(JSON.stringify(res))
                    
                    })

                });

                break;
            case 'get':
                getTodos().then(res => {
                    // console.log(res);

                    ws.send(JSON.stringify(res))
                
                })
                break;
            default:
                break;
        }
        
    })
})

