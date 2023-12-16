// @ts-nocheck
// IMPORTANT: Test suite is under construction please don't use it right now.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PreviewLink } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PreviewLink href="https://nativebase.io" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
