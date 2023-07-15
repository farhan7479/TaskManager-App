import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://salmon-pilot-ylsby.pwskills.app:8080/api/tasks');
      const data = response.data;
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (status) => {
    if (status === 'all') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  const handleSearch = () => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <label>Status Filter:</label>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <p>Assigned User: {task.assignedUser && task.assignedUser.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
