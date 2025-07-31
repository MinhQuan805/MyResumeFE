import Home from '../pages/client/home/Home.tsx';
import ClientLayout from '../pages/client/layout/ClientLayout.tsx';
import Product from '../pages/client/product/Product.tsx';

export const client = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/product',
        element: <Product />
      }
    ]
  }
];
