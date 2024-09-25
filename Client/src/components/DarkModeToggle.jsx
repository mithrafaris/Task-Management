import React from 'react';

import { Switch } from '@mui/material'; // MUI Switch component

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex items-center">
      {/* Show the appropriate icon based on darkMode state */}
      
      
      {/* Material-UI Switch for toggling dark mode */}
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        color="default"
        inputProps={{ 'aria-label': 'dark mode toggle' }}
      />
    </div>
  );
};

export default DarkModeToggle;
