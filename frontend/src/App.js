// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import UpdateTask from './components/UpdateTask';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Task Management System</h1>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

