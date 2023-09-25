import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tag from './tag.component';

describe('TagEntry tests', () => {
  test('it renders correctly', () => {
    render(<Tag value='Tag1' />);
    const elem = screen.getByText('Tag1');
    expect(elem).toBeInTheDocument();
  });
})