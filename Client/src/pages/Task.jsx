import React, { useState } from 'react';
import { Home, Task as TaskIcon, ExitToApp, Menu, Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';
import AddTaskModal from '../pages/addList'; 

function Task() {
  const { currentUser } = useSelector((state) => state.user);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // For the modal

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed md:relative w-64 h-full bg-gray-200 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className={`p-7 h-auto border-b-2 md:border-none ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div className='flex items-center justify-between'>
              <h2 className="text-2xl font-bold">Taskify</h2>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>

            <div>
            <div className='flex flex-col items-center mt-9'>
 
  <img 
    src={currentUser.avatar}  
    alt="User Avatar" 
    className="w-20 h-20 rounded-full mb-3" 
  />
   <h2 className="text-xl font-semibold">{currentUser.username}</h2> 
</div>

            </div>
            <div className='flex flex-col mt-9'>
              <Link to="/" className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
                <Home />
                <span>All Tasks</span>
              </Link>
              <Link to="/task" className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded mt-6 ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
                <TaskIcon />
                <span>Task</span>
              </Link>

              <Link to="/pending" className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded mt-6 ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
                <TaskIcon />
                <span>Pending</span>
              </Link>

              <Link to="/completed" className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded mt-6 ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
                <TaskIcon />
                <span>Completed</span>
              </Link>

              <Link to="/important" className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded mt-6 ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
                <TaskIcon />
                <span>Important</span>
              </Link>

              {/* Add large margin to push the 'Sign Out' to the bottom */}
              <div className="flex-1 mt-60"></div>

              <Link to="/signout" className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded mt-12 ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
                <ExitToApp />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-0`}>
          <div className="flex justify-between items-center">
            {/* Sidebar Toggle Button */}
            <button onClick={toggleSidebar} className={`md:hidden p-2 bg-transparent text-white rounded flex items-center`}>
              <Menu className="mr-2" />
            </button>

            {/* Add Task Button */}
            <button
              onClick={handleModalOpen}
              className={`flex items-center space-x-2 p-2 bg-transparenttext-white rounded hover:bg-transparent`}
            >
              
              <AddTaskModal open={modalOpen} handleClose={handleModalClose} />
            </button>
          </div>

          {/* Task List or Content goes here */}
          {/* You can render the tasks based on the route or task state */}

        </div>
      </div>

      
     
    </div>
  );
}

export default Task;
