import { FullScreenChart, FullScreenChartError, Home } from '@pages/index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chart',
    element: <FullScreenChart />,
    errorElement: <FullScreenChartError />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
