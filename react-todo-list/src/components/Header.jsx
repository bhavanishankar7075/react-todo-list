import React from 'react'

export default function Header({ total=0 }){
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">TD</div>
        <div>
          <div className="title">ToDo — Module 3</div>
          <div className="subtitle">Vite • Functional components • State & props</div>
        </div>
      </div>
      <div className="meta" aria-hidden>{total} tasks</div>
    </header>
  )
}
