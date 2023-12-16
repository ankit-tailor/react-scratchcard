import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScratchCard } from '../src';

const App = () => {
  return (
    <ScratchCard finishPercent={30}>
      <img
        height={150}
        width={300}
        src="https://images.pexels.com/photos/14686115/pexels-photo-14686115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
    </ScratchCard>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
