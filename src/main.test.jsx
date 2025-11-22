import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

describe('main.jsx', () => {
  it('should render App without crashing', () => {
    // Mock document.getElementById and createRoot
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);
    const renderMock = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue(rootDiv);
    jest.spyOn(require('react-dom/client'), 'createRoot').mockReturnValue({ render: renderMock });
    require('./main');
    expect(renderMock).toHaveBeenCalledWith(<App />);
    document.body.removeChild(rootDiv);
  });
});
