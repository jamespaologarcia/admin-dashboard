import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from "@reduxjs/toolkit";

//To import gobalReducer without {}, refer to the code at jsonconfig.json
import globalReducer from "state"
import {Provider} from "react-redux";
import { setupListeners } from '@reduxjs/toolkit/query';
import {api} from "state/api";


const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* passes the const "store" to the Provider component for the boilerplate template with light and dark mode */}
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>
);