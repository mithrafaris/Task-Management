import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography, MenuItem, Select, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function EditTask({ task }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'pending',
    date: task?.date ? new Date(task.date).toISOString().substring(0, 10) : '',
  });

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      const taskId = params.taskId;
      const res = await fetch(`/API/getTask/${taskId}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Error fetching task');
        return;
      }
      setFormData({
        title: data.title,
        description: data.description,
        status: data.status,
        date: new Date(data.date).toISOString().substring(0, 10), 
      });
    };
    fetchTask();
  }, [params.taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/API/update/${params.taskId}`, {
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
        toast.success('Task updated successfully!', { position: 'top-right', autoClose: 3000 });
        navigate('/Task');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update task', { position: 'top-right', autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Error updating task', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '75%', md: '50%', lg: '40%', xl: '30%' }, // Responsive width
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" className="mb-4">
          Edit Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-gray-900"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-gray-900"
                rows="3"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="status" className="block text-sm font-medium mb-2">
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
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-gray-900"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: 'orangered', color: 'white' }}>
                Update Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <ToastContainer />
    </div>
  );
}

export default EditTask;
