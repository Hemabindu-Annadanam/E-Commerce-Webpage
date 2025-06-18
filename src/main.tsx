import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './Store.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  const isProd = import.meta.env.PROD;
  root.render(
    <Provider store={store}>
      {isProd ? (
        <BrowserRouter basename="/E-Commerce-Webpage/">
          <App />
        </BrowserRouter>
      ) : (
        <HashRouter>
          <App />
        </HashRouter>
      )}
    </Provider>,
  );
} else {
  throw new Error("Root element not found");
}
