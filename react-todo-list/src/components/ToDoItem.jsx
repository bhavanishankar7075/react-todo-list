import React, { useState, useRef, useEffect } from 'react'

export default function ToDoItem({ todo, onToggle, onDelete, onEdit }){
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(()=> {
    if(editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  const save = () => {
    const trimmed = value.trim()
    if(!trimmed) { setValue(todo.text); setEditing(false); return }
    onEdit(trimmed)
    setEditing(false)
  }

  return (
    <div className="todo-item" role="listitem">
      <div className="todo-left">
        <div
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={onToggle}
          role="button"
          aria-pressed={todo.completed}
          aria-label={todo.completed ? "Mark as not completed":"Mark as completed"}
          tabIndex={0}
          onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') onToggle() }}
        />
        {editing ? (
          <input
            ref={inputRef}
            className="edit-input"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            onKeyDown={(e)=>{ if(e.key === 'Enter') save(); if(e.key === 'Escape'){ setValue(todo.text); setEditing(false) } }}
            onBlur={save}
            aria-label="Edit task"
          />
        ) : (
          <div style={{display:'flex',flexDirection:'column',minWidth:0}}>
            <div className={`text ${todo.completed ? 'completed': ''}`}>{todo.text}</div>
            <div className="meta">{new Date(todo.createdAt).toLocaleString()}</div>
          </div>
        )}
      </div>

      <div className="actions" aria-hidden>
        <button className="icon-btn" title="Edit" onClick={()=>{ setEditing(true); setValue(todo.text) }}>
          ✏️
        </button>
        <button className="icon-btn" title="Delete" onClick={()=>{
          if(confirm('Delete this task permanently?')) onDelete()
        }}>
          🗑️
        </button>
      </div>
    </div>
  )
}
