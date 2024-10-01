import { createBrowserRouter } from "react-router-dom";
import UserLogin from '../pages/signIn'; 
import SignUp from '../pages/signUp';  
import Home from "../pages/Home";
import Task from "../pages/Task";
import PrivateRoute from '../components/PrivateRoute';
import PageNotFound from '../components/PageError';
import TaskList from "../pages/list-Task";


const Router = createBrowserRouter([           
  {
    path: "/sign-in",
    element: <UserLogin />
  },
  {
    path: "/sign-up",
    element: <SignUp />   
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/task",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Task />
      }
    ]
  },
  {
    path: "/listtask",
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <TaskList />
      }
    ]
  },
  {
    path: "/*",
    element: <PageNotFound />,
  }
]);

export default Router;
