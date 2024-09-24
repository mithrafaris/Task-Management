import React from 'react';
import { RouterProvider } from "react-router-dom";
import Router from './Routes/router';

function App() {
  return (
    <RouterProvider router={Router} />
  );
}

export default App;
