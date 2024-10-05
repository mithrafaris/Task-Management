import {React,useState,useEffect} from 'react';
import { Home, Task as TaskIcon, ExitToApp, Menu } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUserStart, signOutUserSuccess, signInFailure } from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import DarkModeToggle from '../components/DarkModeToggle';

const Sidebar = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { currentUser } = useSelector((state) => state.user);
  const [tasks, setTasks] = useState([]);
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
      navigate('/signin');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error('Failed to sign out');
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/task/taskslist', {
          method: 'GET',
          headers: { 
            Authorization: `Bearer ${currentUser.token}`, 
          },
        });
        const data = await response.json();
  
    const userTasks = data.filter((task) => task.user === currentUser._id);
        
        setTasks(userTasks);
        setDisplayedTasks(userTasks.slice(0, 6));
  
        setShowMore(userTasks.length > 6);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
  
    fetchTasks();
  }, [currentUser]);
  


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`fixed md:relative h-full w-64 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className={`p-7 h-auto border-b-2 md:border-none ${darkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-300'}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Taskify</h2>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
 <div className="flex flex-col items-center mt-2">
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mb-3"
            />
            <h2 className="text-xl font-semibold">{currentUser.username}</h2>
          </div>
 <div className="flex flex-col mt-9 space-y-4">
           
            <Link to="/tasks"  className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-black'}`}>
              <TaskIcon />
              <span>Task</span>
            </Link>
            <Link to="/pending" className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-black'}`}>
              <TaskIcon />
              <span>Pending</span>
            </Link>
            <Link to="/completed" className={`flex items-center space-x-2 p-2 rounded transition-all ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-black'}`}>
              <TaskIcon />
              <span>Completed</span>
            </Link>

            <Link
              onClick={handleSignOut}
              className={`flex items-center space-x-2 p-2 rounded transition-all mt-12 cursor-pointer ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-black'}`}
            >
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
