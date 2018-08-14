import React from 'react';
import ReactDOM from 'react-dom';
import { create as createJss } from 'jss';
import { JssProvider } from 'react-jss';
import nested from 'jss-nested';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ThemeSwitch from './ThemeSwitch';

const jss = createJss();
jss.use(nested());

ReactDOM.render(
  <JssProvider jss={jss}>
    <ThemeSwitch>
      <App />
    </ThemeSwitch>
  </JssProvider>,
  document.getElementById('root')
);
registerServiceWorker();
