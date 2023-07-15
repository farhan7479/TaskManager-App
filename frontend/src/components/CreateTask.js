import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedUser: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://salmon-pilot-ylsby.pwskills.app:8080/api/v1/tasks/create', task);
      if (response.status === 201) {
        navigate.push('/');
      } else {
        console.log('Failed to create task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div>
      <h2>Create Task</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
   
  );
};

export default CreateTask;
