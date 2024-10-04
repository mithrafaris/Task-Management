import React, { useState, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import DarkModeToggle from '../components/DarkModeToggle';
import { useSelector, useDispatch } from 'react-redux';
import { 
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,
  getMessageStart,
  getMessageSuccess,
  getMessageFailure
} from '../redux/user/userSlice'; 
import { toast } from 'react-toastify';
import socket from '../socket.js'; 

const Chat = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [chatMessage, setChatMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const handleToggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setReceivedMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      dispatch(getMessageStart());
      try {
        const res = await fetch(`/API/get/${currentUser._id}`, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch messages');
        
        const data = await res.json();
        setReceivedMessages(data.messages);
        dispatch(getMessageSuccess(data.messages));
      } catch (error) {
        dispatch(getMessageFailure(error.message));
        toast.error('Failed to fetch messages!');
      }
    };

    if (currentUser) {
      fetchMessages();
    }
  }, [currentUser, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return; 

    setChatLoading(true);
    dispatch(sendMessageStart());

    try {
      const res = await fetch(`/API/send/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ message: chatMessage })
      });

      if (!res.ok) throw new Error('Failed to send message');

      const data = await res.json();
      socket.emit('chat message', data.message); 
      setChatMessage(''); 
      setReceivedMessages((prev) => [...prev, data.message]); 
      dispatch(sendMessageSuccess(data.message)); 
      toast.success('Message sent successfully!');
    } catch (error) {
      dispatch(sendMessageFailure(error.message));
      toast.error('Failed to send message!');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className={`w-full md:w-1/3 border-r border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`p-4 sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <DarkModeToggle darkMode={darkMode} setDarkMode={handleToggleDarkMode} />
          <h1 className={`text-3xl text-center font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Taskify</h1>
        </div>
        <div className="overflow-y-auto h-full">
          {receivedMessages.length > 0 ? (
            receivedMessages.map((msg, index) => (
              <div key={index} className="p-4 border-b border-gray-300">
                <p className="text-sm font-medium">
                  {msg.senderID === currentUser._id ? `To: ${msg.receiverID}` : `From: ${msg.senderID}`}
                </p>
                <p>{msg.message}</p>
              </div>
            ))
          ) : (
            <p className="text-center p-4">No conversations available.</p>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`w-full md:w-2/3 flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`p-4 sticky top-0 border-b border-gray-300 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative flex items-center">
            <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" alt="User" />
            <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
            <h1 className={`${darkMode ? 'text-white' : 'text-black'} ml-3`}>Online</h1>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          {receivedMessages.length > 0 ? (
            receivedMessages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.senderID === currentUser._id ? 'flex justify-end' : 'flex justify-start'}`}>
                <div className={`flex items-start gap-2.5 ${msg.senderID === currentUser._id ? 'justify-end' : 'justify-start'}`}>
                  <img className="w-8 h-8 rounded-full" src="https://cdn-icons-png.flaticon.com/128/9131/9131529.png" alt="User" />
                  <div className={`flex flex-col w-full max-w-[320px] p-4 ${msg.senderID === currentUser._id ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'} rounded-xl`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No messages available.</p>
          )}
        </div>

        {/* Chat Input */}
        <div className={`p-4 border-t border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type a message"
              className={`flex-grow p-2 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}
              required
            />
            <button type="submit" className={`ml-2 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-300 ${chatLoading && 'opacity-50 cursor-not-allowed'}`} disabled={chatLoading}>
              <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
