import React from 'react';
import PersistentDrawerLeft from './components/layout/PersistentDrawerLeft';

import HandWritingState from './context/handwriting/HandWritingState';

require('./App.css');

const App = () => {
  return (
    <HandWritingState>
      <PersistentDrawerLeft />
    </HandWritingState>
  );
};

export default App;
