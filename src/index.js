import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
  key: 'root',
  storage,
}

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const persistor = persistStore(store, App)

ReactDOM.render(
  <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
