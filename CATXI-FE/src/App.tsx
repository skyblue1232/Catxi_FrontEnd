import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import MainLayout from './layouts/MainLayout';


const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />
  }
]


const App = () => {
  return (
    <div>App</div>
  )
}

export default App