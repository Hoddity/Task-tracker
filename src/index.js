import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store  from './_store/store';
import { App } from './App';
import './index.css';
import './task.css'
import './start.css'
import './integrations.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
);
