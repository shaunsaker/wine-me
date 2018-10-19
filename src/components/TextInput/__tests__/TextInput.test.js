import React from 'react';
import renderer from 'react-test-renderer';

import TextInput from '..';

describe('TextInput', () => {
  const placeholder = 'Test';
  const value = 'Foo';
  const handleChange = jest.fn();
  const keyboardType = 'email-address';
  const handleSubmit = jest.fn();
  const returnKeyType = 'done';
  const testID = 'test';
  const inputRef = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<TextInput />);

      expect(component).toMatchSnapshot();
    });

    it('renders with all props', () => {
      const component = renderer.create(
        <TextInput
          placeholder={placeholder}
          value={value}
          handleChange={handleChange}
          keyboardType={keyboardType}
          handleSubmit={handleSubmit}
          returnKeyType={returnKeyType}
          testID={testID}
          inputRef={inputRef}
          hasError
          hasSuccess
          secureTextEntry
          multiline
        />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
