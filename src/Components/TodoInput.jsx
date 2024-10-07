
export default function TodoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue } = props

    const addTodoHandler = () => {
      if (!todoValue) return;
      handleAddTodos(todoValue)
      setTodoValue('')
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        addTodoHandler()
      }
    };

    return (
      <header>
        <input
          autoFocus
          id="main-input-id"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          placeholder="Enter todo..."
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodoHandler}>Add</button>
      </header>
    )
}