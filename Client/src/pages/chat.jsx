import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'; 
import DarkModeToggle from "../components/DarkModeToggle"; 
import { useSelector, useDispatch } from 'react-redux';


const Chat = () => {
  const [darkMode, setDarkMode] = useState(false); 
  const { currentUser } = useSelector((state) => state.user);
  const chats = [
    { id: '1', title: 'Chat 1' },
    { id: '2', title: 'Chat 2' },
    { id: '3', title: 'Chat 3' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-1/3 border-r border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-4 sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h1 className={`text-3xl text-center font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Taskify</h1>
          <div className="flex flex-col items-center mt-5">
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="w-15 h-15 rounded-full mb-3"
          />
          <h2 className="text-xl font-semibold">{currentUser.username}</h2>
        </div>
          <DarkModeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} />
        </div>
        <div className="overflow-y-auto h-full">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 hover:bg-gray-200 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : ''}`}
            >
              <span className={`${darkMode ? 'text-white' : 'text-black'}`}>{chat.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={`w-2/3 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`p-4 sticky top-0 border-b border-gray-300 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Chat 1</h1>
        </div>
        <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="mb-4">
            <div className={`p-3 rounded shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Hello!</p>
            </div>
          </div>
          <div className="mb-4">
            <div className={`p-3 rounded shadow text-right ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Hi there!</p>
            </div>
          </div>
        </div>
        <div className={`p-4 border-t border-gray-300 flex ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <input
            type="text"
            placeholder="Type a message..."
            className={`border rounded p-2 flex-1 mr-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          />
          <button>
            <PaperAirplaneIcon className="w-6 h-6 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};



export default Chat;
