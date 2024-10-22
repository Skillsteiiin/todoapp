import { useState, useEffect } from "react"
import TodoInput from "./Components/TodoInput"
import TodoList from "./Components/TodoList"

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(data) {
    try {
      localStorage.setItem("todos", JSON.stringify(data));
    } catch (error) {
      console.error("Ошибка сохранения в локальное хранилище: ", error);
    }
  }
  
  function loadTodosFromLocalStorage() {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.warn('Некорректные данные в локальном хранилище. Использована пустая коллекция.');
          setTodos([]);
        }
      } else {
        console.warn('Локальное хранилище пустое. Использована пустая коллекция.');
        setTodos([]);
      }
    } catch (error) {
      console.error('Ошибка чтения из локального хранилища: ', error);
    }
  }
  
  useEffect(() => {
    loadTodosFromLocalStorage();
  }, []);

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
    document.getElementById("main-input-id").focus();
  }

  return (
    <div>
    <TodoInput
      todoValue={todoValue}
      setTodoValue={setTodoValue}
      handleAddTodos={handleAddTodos}
    />
    <TodoList
      handleEditTodo={handleEditTodo}
      handleDeleteTodo={handleDeleteTodo}
      todos={todos}
    />
  </div>
  )
}

export default App