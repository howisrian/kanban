import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DnDProviderWrapper from './DnDProvider';

ReactDOM.render(
  <DnDProviderWrapper>
    <App />
  </DnDProviderWrapper>,
  document.getElementById('root')
);