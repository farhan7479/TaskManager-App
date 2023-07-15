// components/TaskList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/v1/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/create">Create Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <p>Assigned User: {task.assignedUser && task.assignedUser.name}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <Link to={`/update/${task._id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
