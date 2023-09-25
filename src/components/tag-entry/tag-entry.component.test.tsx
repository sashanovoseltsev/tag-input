import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TagEntry from './tag-entry.component';

describe('TagEntry tests', () => {
  test('it renders correctly', () => {
    render(<TagEntry value='Tag1' removeCallback={(_: string) => { }} />);
    const elem = screen.getByText('Tag1');
    expect(elem).toBeInTheDocument();
  });

  test('it reacts to x click correctly', () => {
    const mockedRemoveHandler = jest.fn();
    render(<TagEntry value='Tag1' removeCallback={mockedRemoveHandler} />);

    const elem = screen.getByText('Tag1');
    expect(elem).toBeInTheDocument();

    const removeBtn = screen.getByText('×');
    fireEvent.click(removeBtn);

    expect(mockedRemoveHandler).toHaveBeenCalledWith('Tag1');
  });
})