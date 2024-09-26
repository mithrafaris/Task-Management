import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import { Home, Task as TaskIcon, ExitToApp, Menu } from '@mui/icons-material';
import AddTaskModal from '../pages/addList'; 

function Task() {
  const [modalOpen, setModalOpen] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Lifted state

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={`flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      <div className={`flex-1 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-0`}>
        <div className="flex justify-between items-center">
          {/* Sidebar Toggle Button */}
          <button onClick={toggleSidebar} className="md:hidden p-2 bg-transparent text-black rounded flex items-center">
            <Menu className="mr-2" />
          </button>

          {/* Button to Open Add Task Modal */}
          <button
            onClick={handleModalOpen}
            className="flex items-center space-x-2 p-2 bg-transparent text-white rounded hover:bg-transparent"
          >
            
          </button>
        </div>

        {/* Render AddTaskModal */}
        <AddTaskModal open={modalOpen} handleClose={handleModalClose} />

        {/* Task List or Content goes here */}
        {/* You can render the tasks based on the route or task state */}
      </div>
    </div>
  );
}

export default Task;
