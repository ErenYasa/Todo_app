import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/index.ts';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

const isMobile = store.getState().App.mobileView;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position={isMobile ? 'top-center' : 'top-right'}
      autoClose={1500}
      draggablePercent={60}
      draggableDirection={isMobile ? 'y' : 'x'}
      hideProgressBar
    />
  </Provider>,
);
