import React from 'react';
import ReactDOM from 'react-dom';
import StyledApp from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StyledApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
