import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';





function ListingItem({ listing, completed }) {
  return (
    <div className="w-50 h-50 bg-black text-white border border-gray-700 rounded-lg shadow-md flex flex-col justify-between p-4">
      <div >
        <div className='w-50 h-50 bg-black text-white border border-gray-700 rounded-lg shadow-md flex flex-col justify-between p-4'>
         <h3 className='text-xl font-semibold'>{listing.title }</h3>
          <p>{listing.description }</p>
          <p>Date: {new Date(listing.date).toLocaleDateString()}</p>
      

        <div className="flex gap-5">
          <Button variant="outlined" className={`block mb-4 ${completed ? 'text-green-500' : 'text-red-500'}`}>
            {completed ? 'Completed' : 'Incomplete'}
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
    </div>
  );
}

export default ListingItem;
