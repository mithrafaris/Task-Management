import React from 'react';

import { Switch } from '@mui/material'; // MUI Switch component

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex items-center">
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
