import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TaskCard({ title, description, date, completed }) {
  return (
    <div className="w-50 h-50 bg-black text-white border border-gray-700 rounded-lg shadow-md flex flex-col justify-between p-4">
      <div >
        <h2 className="font-bold text-lg mb-2"><p1>helloooo</p1></h2>
        <p className="scroll-mb-10"><p1>The actual React/HTML component to be used is determined by the variantprop. So a variant of h1renders a , and so on for h2, h3, h4, h5and h6. Then, you have </p1></p>
        <span className="block mb-2">2/10/2010</span>
      
      <div className="flex gap-5">
      <Button variant="outlined" className={`block mb-4 ${completed ? 'text-green-500' : 'text-red-500'}`}>
          {completed ? 'Completed' : 'Incompleted'}
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" startIcon={<EditIcon />}>
          Edit
        </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
