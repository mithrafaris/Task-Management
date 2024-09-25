import React from 'react';
import { Home, Task, ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <h2 className="text-2xl font-bold p-6">Task Manager</h2>
      <nav className="flex flex-col space-y-4 p-6">
        <Link to="/" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <Home />
          <span>All Tasks</span>
        </Link>
        <Link to="/pending" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <Task />
          <span>Pending</span>
        </Link>
        <Link to="/completed" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <Task />
          <span>Completed</span>
        </Link>
        <Link to="/important" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <Task />
          <span>Important</span>
        </Link>
        <Link to="/signout" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <ExitToApp />
          <span>Sign Out</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
