import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function ListingItem({ task, setUserTask, currentUser }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(task);

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`/API/delete/${taskId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setUserTask((prev) => prev.filter((t) => t._id !== taskId));
        toast.success('Deleted successfully');
      } else {
        toast.error('Failed to delete task');
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleSubmit = async (taskId, status) => {
    setLoading(true);
    try {
      const response = await fetch(`/API/updateTask/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Task updated successfully!', { position: 'top-right', autoClose: 3000 });
        navigate('/Task');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update task', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Error updating task', { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-50 h-50 bg-black text-white border border-gray-700 rounded-lg shadow-md flex flex-col justify-between p-4">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Date: {new Date(task.date).toLocaleDateString()}</p>

      <div className="flex gap-5 mt-4">
        <Button
          variant="outlined"
          className={task.status === 'completed' ? 'text-green-500' : 'text-red-500'}
          onClick={() => handleSubmit(task._id, task.status === 'completed' ? 'pending' : 'completed')}
          disabled={loading}
        >
          {task.status === 'completed' ? 'Completed' : 'Pending'}
        </Button>

        <Button
          onClick={() => handleDelete(task._id)}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={loading}
        >
          Delete
        </Button>

        <Link to={`/editTask/${task._id}`}>
          <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
            Edit
          </Button>
        </Link>
      </div>

      <Toaster />
    </div>
  );
}

export default ListingItem;
