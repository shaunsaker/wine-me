import React from 'react';
import renderer from 'react-test-renderer';

import { DataHandler } from '..';

describe('DataHandler', () => {
  let spy;
  const dispatch = jest.fn();

  it('renders with all props', () => {
    expect(renderer.create(<DataHandler dispatch={jest.fn()} authenticated />)).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<DataHandler dispatch={jest.fn()} />)).toMatchSnapshot();
  });

  it('calls syncData on componentDidMount if authenticated prop is supplied', () => {
    spy = jest.spyOn(DataHandler.prototype, 'syncData');

    renderer.create(<DataHandler dispatch={dispatch} authenticated />);

    expect(spy).toHaveBeenCalled();
  });

  it('does not call syncData on componentDidMount if authenticated prop is not supplied', () => {
    spy = jest.spyOn(DataHandler.prototype, 'syncData');

    renderer.create(<DataHandler dispatch={dispatch} />);

    expect(spy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    if (spy) {
      spy.mockClear();
    }
  });
});
