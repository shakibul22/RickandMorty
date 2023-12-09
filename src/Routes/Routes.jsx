import {  createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home/Home";
import CharacterDetails from "../Pages/CharacterDetails/CharacterDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
        {
            path:'/',
            element:<Home/>
            
        },
        {
          path:"/character/:id",
          element:<CharacterDetails/>
        }
    ]
  },
]);