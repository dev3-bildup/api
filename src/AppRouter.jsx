import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Singleproduct from "./Singleproduct";
import Home from "./Home";

const router = createBrowserRouter([
    {
        path: "/", element: <Home/>
   },
{
     path:"/singleproduct/:id", element: <Singleproduct/> 
}
])

export const RouterProviderApp = ()=>{

    return <RouterProvider router={router} />
}