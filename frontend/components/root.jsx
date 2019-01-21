import { HashRouter } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);