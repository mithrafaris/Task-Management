import React from 'react';
import DarkModeToggle from '../components/DarkModeToggle';

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md p-4 flex justify-between items-center">
      
      <DarkModeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;
