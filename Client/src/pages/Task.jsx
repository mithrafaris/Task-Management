import { useState, useEffect } from 'react';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Task() {
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Use effect to apply dark mode class to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row`}>
      {/* Sidebar */}
      <div className={`p-7 border-b-2 md:border-r-2 md:min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <form className="flex flex-col gap-8">
          {/* Dark Mode Toggle */}
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-black p-1">
            <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className='hidden'
            
          />
              <img
                src={profileImage || "default-profile-image-url"} // Replace with your default profile image URL
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                
              />
            </div>
            <span className="font-semibold text-lg">Your Username</span> {/* Replace with the actual username */}
           
          </div>

          {/* Task Buttons */}
          <button className={`p-3 rounded-lg uppercase hover:opacity-95 ${darkMode ? 'bg-orange-700 text-white' : 'bg-orange-900 text-white'}`}>
            ALL TASK
          </button>
          <button className={`p-3 rounded-lg uppercase hover:opacity-95 ${darkMode ? 'bg-orange-600 text-white' : 'bg-orange-800 text-white'}`}>
            COMPLETED
          </button>
          <button className={`p-3 rounded-lg uppercase hover:opacity-95 ${darkMode ? 'bg-orange-700 text-white' : 'bg-orange-900 text-white'}`}>
            PENDING
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className={`flex-1 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-3xl font-semibold border-b p-3 mt-5">
          Task:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {/* Add task list components here */}
        </div>
      </div>
    </div>
  );
}
