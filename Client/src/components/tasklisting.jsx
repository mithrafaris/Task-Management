import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function TaskListing({ task }) {
  return (
    <Card
      sx={{
        width: 300,
        height: 200, // Fixed height to maintain card size
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid #555',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Align content nicely
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Title: {task.title}
        </Typography>
        <Typography variant="subtitle1" component="div">
          Description: {task.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="subtitle1" component="div">
          Date: {new Date(task.date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TaskListing;
