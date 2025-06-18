import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './Store.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const basename = import.meta.env.PROD ? '/E-Commerce-Webpage/' : '/';
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
   <Provider store={store}>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </Provider>
  );
} else {
  throw new Error("Root element not found");
}

