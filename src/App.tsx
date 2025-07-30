import { useRoutes } from 'react-router-dom';
import { admin } from './routes/admin.route.tsx';
import { client } from './routes/client.route.tsx';

const AppRoutes = () => {
  const routing = useRoutes([...client, ...admin]);
  return routing;
};

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
