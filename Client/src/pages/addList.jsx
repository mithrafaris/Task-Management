import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    date: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Task added successfully');
        console.log(result);
        handleClose(); // Close the modal on successful submission
      } else {
        console.log('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
    <Button
    variant="contained"
    sx={{ backgroundColor: 'orangered', color: 'white' }}
    onClick={handleOpen}
  >
    Add New Task
  </Button>
  
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
              <label className="block text-sm font-semibold mb-1" htmlFor="title">Task Title</label>
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
              <label className="block text-sm font-semibold mb-1" htmlFor="description">Description</label>
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
              <label className="block text-sm font-semibold mb-1" htmlFor="status">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-900 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="userRef">Date</label>
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
    </div>
  );
}
