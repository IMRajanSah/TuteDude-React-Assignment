import { useState } from 'react';
import './App.css';
import ListComponent from './components/ListComponent';
import { TodoContext } from './components/ToDoContext';
function App() {
  const [toDo,setToDo] = useState([])
  const addTodo=(item)=>{
    setToDo((prev) => [...prev, item]);    
  }
  const deleteTodo=(item)=>{
    setToDo((prev) => prev.filter(todo => todo !== item));
  }
  return (
    <TodoContext.Provider value={{toDo,addTodo,deleteTodo}}>
        <ListComponent/>
    </TodoContext.Provider>
  );
}

export default App;
