import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './Store.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <HashRouter basename="/E-Commerce-Webpage/">
        <App />
      </HashRouter>
    </Provider>,
  );
} else {
  throw new Error("Root element not found");
}
