import React from 'react';
import { Home, Task as TaskIcon, ExitToApp, Menu } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import DarkModeToggle from '../components/DarkModeToggle';

const Sidebar = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for programmatic navigation
  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/user/signOut', { method: 'GET' });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Failed to sign out');
      }
      dispatch(signOutUserSuccess(data));
      toast.success('Signed out successfully');

      // Redirect to login after sign out
      navigate('/signin');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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

            <Link onClick={handleSignOut} className={`flex items-center space-x-2 hover:bg-gray-700 p-2 rounded mt-12 ${darkMode ? 'text-white hover:bg-gray-600' : 'text-black'}`}>
              <ExitToApp />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
