import React from 'react';
import { vi } from 'vitest';
import App from './App';

describe('main.jsx', () => {
  it('should render App without crashing', () => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);
    const renderMock = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue(rootDiv);
    vi.spyOn(require('react-dom/client'), 'createRoot').mockReturnValue({ render: renderMock });
    require('./main.jsx');
    expect(renderMock).toHaveBeenCalledWith(<App />);
    document.body.removeChild(rootDiv);
  });
});
