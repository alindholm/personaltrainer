import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
    <div className="App">
      <h1 align="center">Welcome to Personaltrainer app</h1>
      <nav className="tab-nav">
        <Link to={"/"} className="tab-link">Home</Link>
        <Link to={"/customers"} className="tab-link">Customers</Link>
        <Link to={"/trainings"} className="tab-link">Trainings</Link>
        <Link to={"/calendar"} className="tab-link">Calendar</Link>

      </nav>
      <Outlet />
    </div>
    </>
  )
}

export default App
