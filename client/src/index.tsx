import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';

import ReactGA from 'react-ga4';
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALITICS_KEY!);

ReactGA.send('pageview');
const store = setupStore();
const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
ReactGA.event({
   category: 'User',
   action: 'Click Button',
   label: 'Submit Form',
});
root.render(
   <Provider store={store}>
      <BrowserRouter>
         <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}>
            <App />
         </APIProvider>
      </BrowserRouter>
   </Provider>,
);
