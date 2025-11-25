import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

const LOCAL_KEY = 'rtv_todos_v1'

export default function App(){
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState('all') // all | active | completed
  const inputRef = useRef()

  useEffect(()=> {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const trimmed = text?.trim()
    if(!trimmed) return
    const newTodo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleComplete = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id, newText) => {
    const trimmed = newText?.trim()
    if(!trimmed) return
    setTodos(prev => prev.map(t => t.id === id ? {...t, text: trimmed} : t))
  }

  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed))

  const filtered = todos.filter(t => {
    if(filter === 'all') return true
    return filter === 'active' ? !t.completed : t.completed
  })

  return (
    <div className="app-card" role="application" aria-label="ToDo App">
      <Header total={todos.length} />
      <div className="new-todo" >
        <input
          ref={inputRef}
          className="input"
          placeholder="Add a new task — e.g. Finish module 3 assignment"
          onKeyDown={(e)=>{
            if(e.key === 'Enter') { addTodo(e.target.value); e.target.value='' }
          }}
          aria-label="New task"
        />
        <button className="btn" onClick={()=>{
          const val = inputRef.current.value
          addTodo(val)
          inputRef.current.value = ''
        }}>Add</button>
        <button className="btn secondary" onClick={()=>{ setTodos([]) }}>Clear All</button>
      </div>

      <ToDoList
        todos={filtered}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />

      <div className="footer" >
        <div>
          <button className={`filter-btn ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>All</button>
          <button className={`filter-btn ${filter==='active'?'active':''}`} onClick={()=>setFilter('active')}>Active</button>
          <button className={`filter-btn ${filter==='completed'?'active':''}`} onClick={()=>setFilter('completed')}>Completed</button>
        </div>
        <div>
          <span>{todos.filter(t=>!t.completed).length} items left</span>
          <button style={{marginLeft:12}} className="filter-btn" onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
    
  )
}
