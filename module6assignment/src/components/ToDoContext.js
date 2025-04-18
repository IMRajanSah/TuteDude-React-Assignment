import {
    createContext
} from 'react'

export const TodoContext = createContext({
    todos: [],
    addTodo: (todo) => {},
    deleteTodo: (id) => {}
})
