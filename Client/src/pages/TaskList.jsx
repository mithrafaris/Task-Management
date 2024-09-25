import React, { useState } from 'react';
import { Card, CardContent, Button, IconButton, Typography } from '@mui/material';
import { CheckCircle, Cancel, Delete, Edit } from '@mui/icons-material';
import { fetch } from 'react-router-dom'; // Assuming you are using fetch for API calls

function TaskCard({ task, onUpdate, onDelete }) {
  const [taskStatus, setTaskStatus] = useState(task.status); 
  const toggleTaskStatus = async () => {
    const newStatus = taskStatus === 'completed' ? 'pending' : 'completed';

    try {
      // Send a request to update the task status in the database
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // Update the local state to reflect the new task status
      setTaskStatus(newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <Card className="w-full p-4 bg-gray-100 dark:bg-gray-800 mb-4">
      <CardContent>
        {/* Task Title */}
        <Typography variant="h6" component="h2">
          {task.title}
        </Typography>

        {/* Task Description */}
        <Typography variant="body2" color="textSecondary" className="my-2">
          {task.description}
        </Typography>

        {/* Task Status Button */}
        <Button
          variant="contained"
          color={taskStatus === 'completed' ? 'success' : 'warning'}
          startIcon={taskStatus === 'completed' ? <CheckCircle /> : <Cancel />}
          onClick={toggleTaskStatus}
        >
          {taskStatus === 'completed' ? 'Completed' : 'Pending'}
        </Button>
      </CardContent>

      {/* Task Actions (Delete, Update) */}
      <div className="flex justify-end space-x-2 mt-4">
        {/* Update Task */}
        <IconButton
          aria-label="Update Task"
          color="primary"
          onClick={() => onUpdate(task.id)}
        >
          <Edit />
        </IconButton>

        {/* Delete Task */}
        <IconButton
          aria-label="Delete Task"
          color="error"
          onClick={() => onDelete(task.id)}
        >
          <Delete />
        </IconButton>
      </div>
    </Card>
  );
}

export default TaskCard;
