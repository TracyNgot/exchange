import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Provider } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import App from './App';
import { createStore } from './store';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';

import './antd.css';
import './i18n';

dayjs.extend(localizedFormat);

const spinner = <LoadingOutlined style={{ fontSize: 48 }} spin />;
Spin.setDefaultIndicator(spinner);

ReactDOM.render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
