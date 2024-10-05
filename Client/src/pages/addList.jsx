import React, { useState } from 'react';
import { Modal, Box, Button, Typography, MenuItem, Select } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

export default function AddTask() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    date: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      date: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/API/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        toast.success('Task added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        handleClose();  // Reset the form after task is added
        navigate('/Task');  // Navigate after the form is closed
      } else {
        toast.error('Failed to add task.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Error adding task.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className='flex gap-2'>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'orangered', color: 'white' }}
          onClick={handleOpen}
        >
          Add New Task
        </Button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          className="bg-black p-4 rounded-md shadow-md"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" className="mb-4">
            Add New Task
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="title">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-900 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-900 rounded-md"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="status">
                Status
              </label>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                displayEmpty
                required
              >
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-900 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: 'orangered', color: 'white' }}
              fullWidth
              className="mt-4"
            >
              Add Task
            </Button>
          </form>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
