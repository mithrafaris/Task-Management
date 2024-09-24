import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle"; 
import Tasky from '../assets/tasky.png';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Paper } from '@mui/material'; 
import Draggable from 'react-draggable';


function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const handleOpenModal = () => setOpenModal(true); 
  const handleCloseModal = () => setOpenModal(false); 

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={toggleDarkMode} />
      <header className="shadow sticky z-50 top-0">
        <nav className={`border-gray-200 px-4 lg:px-6 py-2.5 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center lg:order-2">
              <Link to="/sign-in" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                Get started
              </Link>
            </div>
            <div className={`hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${darkMode ? 'text-white' : 'text-gray-800'}`} id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                {[].map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/${item.toLowerCase()}`}
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 ${
                          isActive ? "text-orange-700" : (darkMode ? "text-gray-400" : "text-gray-700")
                        } lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                      }
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="mx-auto w-full max-w-7xl">
        <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
          <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
              <h2 className="text-4xl font-bold sm:text-5xl">
                Taskify & TaskMaster
              </h2>
              <button 
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                onClick={handleOpenModal} // Open modal on click
              >
                &nbsp;  Add your Task
              </button>
            </div>
          </div>
          <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
            <img className="w-auto h-auto" src={Tasky} alt="image1" />
          </div>
        </aside>

        <div className="grid place-items-center sm:mt-20">
          <img className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image2" />
        </div>

        <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">"Your task list is a roadmap to success!"</h1>
     

      {/* Task Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperComponent={PaperComponent} // Make the dialog draggable
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add New Task
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            type="Date"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{ color: 'red' }}>Cancel</Button>
          <Link to="/Task" onClick={handleCloseModal} sx={{ color: 'green' }}>Add Task</Link>
         
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}
