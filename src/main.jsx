import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import App from './App.jsx';
import './index.css';
import SodaPage from './pages/SodaPage/SodaPage.jsx';
import Admin from './pages/Admin/Admin.jsx';

const router = createBrowserRouter([
  {
    path: '/colaco',
    element: <App />,
    children: [
      {
        path: '',
        element: <SodaPage />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
