import React from 'react';
import { Favorite, Edit, Delete, CheckCircle, Cancel } from '@mui/icons-material'; // Importing MUI icons

const TaskList = ({ tasks, onUpdate, onDelete, onFavorite }) => {
  return (
    <div className=" shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-3">Your Tasks</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tasks.map((task, index) => (
          <li key={index} className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-md flex flex-col">
            {/* Task Info */}
            <div className="flex-grow">
              <input
                type="text"
                value={task.title}
                className="border p-1 rounded-md mb-1 w-full"
                onChange={(e) => onUpdate({ ...task, title: e.target.value })}
              />
              <textarea
                value={task.description}
                className="border p-1 rounded-md mb-1 w-full"
                onChange={(e) => onUpdate({ ...task, description: e.target.value })}
                rows="2" // Limit the height of the textarea
              />
              <p className="text-xs text-gray-500">{task.date}</p> {/* Displaying the task date */}
            </div>

            {/* Toggle Completed/Incompleted Button */}
            <button 
              onClick={() => onUpdate({ ...task, completed: !task.completed })} 
              className={`flex items-center justify-center text-white font-bold px-3 py-1 rounded-md ${task.completed ? 'bg-green-500' : 'bg-red-500'}`}
              aria-label={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
            >
              {task.completed ? <CheckCircle /> : <Cancel />}
              <span className="ml-1 text-xs">{task.completed ? 'Completed' : 'Incomplete'}</span>
            </button>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-2">
              <button 
                onClick={() => onFavorite(task)} 
                className="text-red-500 hover:text-red-600 text-xs"
                aria-label="Favorite"
              >
                <Favorite fontSize="small" />
              </button>

              <button 
                onClick={() => onUpdate(task)} 
                className="text-blue-500 hover:text-blue-600 text-xs"
                aria-label="Update"
              >
                <Edit fontSize="small" />
              </button>

              <button 
                onClick={() => onDelete(task)} 
                className="text-gray-500 hover:text-gray-600 text-xs"
                aria-label="Delete"
              >
                <Delete fontSize="small" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
