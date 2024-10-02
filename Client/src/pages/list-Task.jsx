import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function ListingItem({ task }) {
  const { taskId } = useParams(); 
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [userTasks, setUserTasks] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'pending',
    date: task?.date ? new Date(task.date).toISOString().substring(0, 10) : '',
  });
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        date: task.date ? new Date(task.date).toISOString().substring(0, 10) : '',
      });
    }
  }, [task]);
  const handleDelete = async (taskId) => {
    setLoading(true);
    try {
      const res = await fetch(`/API/delete/${taskId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setUserTasks((prev) => prev.filter((task) => task._id !== taskId));
        toast.success('Task deleted successfully');
        navigate('/Task'); 
      } else {
        toast.error(data.message || 'Failed to delete task');
      }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while deleting the task');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (taskId, updatedTask) => {
    setLoading(true);
    try {
      const response = await fetch(`/API/update/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Task updated successfully');
        setIsEditing(false);
        setUserTasks((prev) =>
          prev.map((task) => (task._id === taskId ? { ...task, ...updatedTask } : task))
        );
      } else {
        toast.error(data.message || 'Failed to update task');
      }
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while updating the task');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(task._id, formData);
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-80 bg-black text-white border border-gray-700 rounded-lg shadow-md p-4">
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-gray-200">Task Title</label>
              <input
                className="w-full p-2 bg-gray-800 text-white rounded"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-200">Description</label>
              <textarea
                className="w-full p-2 bg-gray-800 text-white rounded"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200">Status</label>
                <select
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-200">Date</label>
                <input
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  type="date"
                  name="date"
                  value={new Date(formData.date).toLocaleDateString()}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              disabled={loading}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="text-xl font-semibold truncate">{task.title}</h3>
          <p className="text-sm text-gray-300 overflow-hidden line-clamp-3">{task.description}</p>
          <p className="text-gray-400">Date: {new Date(task.date).toLocaleDateString()}</p>
          <div className="flex gap-5 mt-4">
            <button
              className={`py-2 px-4 rounded ${task.status === 'completed' ? 'bg-green-600' : 'bg-orange-950'} text-white`}
              onClick={() =>
                handleSubmit(task._id, {
                  ...task,
                  status: task.status === 'completed' ? 'pending' : 'completed',
                })
              }
              disabled={loading}
            >
              {task.status === 'completed' ? 'Completed' : 'Pending'}
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="py-2 px-4 bg-red-700 text-white rounded"
              disabled={loading}
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 px-4 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default ListingItem;
