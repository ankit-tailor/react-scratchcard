import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScratchCard } from '../src';

const App = () => {
  return (
    <ScratchCard>
      <img
        height={150}
        width={300}
        src="https://wallpapers.com/images/hd/cat-with-shades-cool-picture-lkenou4wsqrbib37.jpg"
      />
    </ScratchCard>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
