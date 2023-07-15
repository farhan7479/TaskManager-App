// components/UpdateTask.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedUser: '',
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`https://salmon-pilot-ylsby.pwskills.app:8080/api/v1/tasks/update/${id}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        navigate.push('/');
      } else {
        console.log('Failed to update task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Assigned User:</label>
          <input
            type="text"
            name="assignedUser"
            value={task.assignedUser}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTask;
