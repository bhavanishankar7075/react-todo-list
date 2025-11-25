import React from 'react'
import ToDoItem from './ToDoItem'

export default function ToDoList({ todos = [], onToggle, onDelete, onEdit }){
  if(!todos || todos.length === 0){
    return <div className="empty" role="status">No tasks yet — add your first task!</div>
  }

  return (
    
    <div className="todo-list" aria-live="polite">
      {todos.map(todo => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
          onEdit={(newText) => onEdit(todo.id, newText)}
        />
      ))}
    </div>
  )
}
