import Home from '../pages/client/home/Home.tsx';
import ClientLayout from '../pages/client/layout/ClientLayout.tsx';

export const client = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
];
