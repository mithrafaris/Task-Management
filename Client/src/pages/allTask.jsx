import React, { useEffect, useState } from 'react';
import { Task as TaskIcon, Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';
import TaskListing from '../components/tasklisting';

function AllTask() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [usersTask, setUserTask] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState(6); 
  const { currentUser } = useSelector((state) => state.user);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

 
  const fetchTasks = async () => {
    try {
      const res = await fetch('/API/usertasks'); 
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setUserTask(data.tasks);
      setFilteredTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchCompleted = async () => {
    try {
      const res = await fetch('/API/usertasks?status=completed'); 
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setFilteredTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch('/API/usertasks?status=pending'); 
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setFilteredTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const onShowMoreClick = () => {
    setVisibleTasks((prevVisible) => prevVisible + 6);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Sidebar */}
      <div className="min-h-screen">
        <div className={`fixed md:relative h-full w-64 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className={`min-h-screen p-7 h-auto border-b-2 md:border-none ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Taskify</h2>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <div className="flex flex-col items-center mt-9">
              <img src={currentUser.avatar} alt="User Avatar" className="w-20 h-20 rounded-full mb-3" />
              <h2 className="text-xl font-semibold">{currentUser.username}</h2>
            </div>
            <div className="flex flex-col mt-9 space-y-14">
              <Link
                onClick={() => { fetchTasks(); }} 
                className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}
              >
                <TaskIcon />
                <span>ALL TASKS</span>
              </Link>
              <Link
                onClick={fetchPending}
                className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}
              >
                <TaskIcon />
                <span>PENDING</span>
              </Link>
              <Link
                onClick={fetchCompleted}
                className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}
              >
                <TaskIcon />
                <span>COMPLETED</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-0`}>
        <div className="flex justify-between items-center">
          <button onClick={toggleSidebar} aria-label="Toggle sidebar" className="md:hidden p-2 bg-transparent text-black rounded flex items-center">
            <Menu className="mr-2" />
          </button>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold border-b p-2 text-slate-700 mt-5 dark:text-blue-900">Task List:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {filteredTasks.slice(0, visibleTasks).map((task) => (
              <TaskListing key={task._id} task={task} />
            ))}
          </div>
          {filteredTasks.length > visibleTasks && (
            <button onClick={onShowMoreClick} className="text-blue-900 dark:text-blue-400 hover:underline p-7 text-center w-full">
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllTask;
