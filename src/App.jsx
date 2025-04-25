import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editText, setEditText] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (input.trim() === '') return
    setTodos([...todos, { text: input, completed: false }])
    setInput('')
  }

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(newTodos)
  }

  const startEditing = (index, text) => {
    setEditingIndex(index)
    setEditText(text)
  }

  const saveEdit = (index) => {
    if (editText.trim() === '') return
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, text: editText } : todo
    )
    setTodos(newTodos)
    setEditingIndex(null)
    setEditText('')
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </div>
            ) : (
              <>
                <span
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                  onClick={() => toggleTodo(index)}
                >
                  {todo.text}
                </span>
                <div className="todo-actions">
                  <button onClick={() => startEditing(index, todo.text)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
