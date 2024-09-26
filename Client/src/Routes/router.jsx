import { createBrowserRouter } from "react-router-dom";
import UserLogin from '../pages/signIn'; 
import SignUp from '../pages/signUp';  
import Home from "../pages/Home";
import Task from "../pages/Task";
import PrivateRoute from '../components/PrivateRoute';
import PageNotFound from '../components/PageError';
import TaskCard from "../pages/Taskcard";



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
    path:"/",
    element:<Home/>
  },
 {
  path:"/Task",
  element: <PrivateRoute />,
  children: [
    {
      path: "",
      element: <Task />
    }
  ]
 },{
  path: "/*",
  element: <PageNotFound />,
},
{
  path:"/taskcard",
  element:<TaskCard/>
}
 

]);

export default Router;
