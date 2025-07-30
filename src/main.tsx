import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './redux/reducer/index.tsx';
import '@ant-design/v5-patch-for-react-19';
import './index.css';
import App from './App.tsx';

const store = createStore(allReducers);

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);
