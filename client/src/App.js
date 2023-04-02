import './App.css'
import React, { } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ErrorPage from './Error/ErrorPage';
import Home from './pages/Home/Home';
import TimeTable from './pages/TimeTable/TimeTable';
import Notification from './components/CustomNotification/CustomNotification';
// import SlidingSignup from './components/Signup/SlidingSignup';

const Layout = () => {


  return (
    <>
      <Notification />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/time-table',
        element: <TimeTable />
      },
      {
        path: '/contact',
        element: <Home />
      },
    ]
  },

])




function App() {
  return (

    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
