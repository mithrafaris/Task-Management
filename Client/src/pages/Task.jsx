import React, { useEffect, useState } from 'react';
import { Home, Task as TaskIcon, ExitToApp, Menu } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import DarkModeToggle from '../components/DarkModeToggle';
import AddTaskModal from '../pages/addList';
import ListingItem from '../pages/list-Task';

function Task() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersTask, setUserTask] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState(6);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/API/signOut', { method: 'GET' });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Failed to sign out');
      }
      dispatch(signOutUserSuccess(data));
      toast.success('Signed out successfully');
      navigate('/signin');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error('Failed to sign out');
    }
  };
  const handleUserTask = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/API/tasks/${currentUser._id}`);
      const data = await res.json();
      setUserTask(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const onShowMoreClick = () => {
    setVisibleTasks((prevVisible) => prevVisible + 6);
  }

  useEffect(() => {
    handleUserTask();
  }, []);

  

  const sortedTasks = usersTask.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
                onClick={handleUserTask}
                className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}
              >
                <TaskIcon />
                <span>TASKS</span>
              </Link>
              <Link
              to="/allTask"
              className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}
            >
              <TaskIcon />
              <span>ALL TASKS</span>
            </Link>
            
              <Link onClick={handleSignOut} className={`flex items-center space-x-2 p-2 rounded transition-all mt-12 cursor-pointer ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'}`}>
                <ExitToApp />
                <span>Sign Out</span>
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

        <AddTaskModal open={modalOpen} handleClose={handleModalClose} />

        <div className="flex-1">
          <h1 className="text-3xl font-semibold border-b p-2 text-slate-700 mt-5 dark:text-blue-900">Task List:</h1>
          <div className="p-4 flex flex-wrap gap-3">
            {loading ? (
              <p className="text-xl text-slate-700 text-center w-full dark:text-white">Loading...</p>
            ) : sortedTasks.length === 0 ? (
              <p className="text-xl text-slate-700 dark:text-red-950">No tasks found!</p>
            ) : (
              sortedTasks.slice(0, visibleTasks).map((task) => (
                <ListingItem key={task._id} task={task} />
              ))
            )}

            {sortedTasks.length > visibleTasks && (
              <button onClick={onShowMoreClick} className="text-blue-900 dark:text-blue-400 hover:underline p-7 text-center w-full">
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
