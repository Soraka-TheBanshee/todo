const Pool = require('pg').Pool;

const todosPool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'todos',
    password: 'root',
    port: 5432,
})

const freedIndexes = []

async function createTodo(value) {
    let response

    try{
        if (freedIndexes.length > 0) {
            const id = freedIndexes[0]
            freedIndexes.shift()
            
            response = await todosPool
            .query(
                'INSERT INTO todos (id, value, isdone) VALUES($1, $2, $3) RETURNING *',
                [id, value, false]
            );

        }
        else {
            response = await todosPool
            .query(
                'INSERT INTO todos (value, isdone) VALUES($1, $2) RETURNING id',
                [value, false]
            );
        }
    
        return response.rows
    }
    catch (e) {
        throw new Error(e)
    }
}

async function deleteTodo(id) {
    try{
        await todosPool
        .query(
            'DELETE FROM todos WHERE id = $1',
            [id]
        );
        freedIndexes.unshift(id)
    }
    catch (e) {
        throw new Error(e)
    }
}

async function editTodo(value, id) {
    try{
        await todosPool
        .query(
            'UPDATE todos SET value = $1 WHERE id = $2',
            [value, id]
        );
    }
    catch (e) {
        throw new Error(e)
    }
}

async function compliteTodo(id) {
    try{
        const ret = await todosPool.
        query(
            'SELECT isdone FROM todos WHERE id = $1',
            [id]
        )
        
        const isdone = !ret.rows[0].isdone

        await todosPool
        .query(
            'UPDATE todos SET isdone = $1 WHERE id = $2',
            [isdone, id]
        );

        const ret1 = await todosPool.
        query(
            'SELECT isdone FROM todos WHERE id = $1',
            [id]
        )

        console.log(ret1.rows);
    }
    catch (e) {
        throw new Error(e)
    }
}

async function getTodos() {
    let response

    try{
        response = await todosPool
        .query(
            'SELECT * FROM todos ORDER BY id ASC'
        );
    }
    catch (e) {
        throw new Error(e)
    }

    return response.rows
}

module.exports = { createTodo, deleteTodo, editTodo, compliteTodo, getTodos }