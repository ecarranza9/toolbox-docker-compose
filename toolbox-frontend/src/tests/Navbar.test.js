import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/layout/Navbar';

describe('NavBar Component', () => {
  test('should match title', () => {
    render(<NavBar />);
    expect(screen.getByText('React Test APP')).toBeInTheDocument()
  });

  test('should match snapshot', async () => {
    render(<NavBar />);
    const nav = await screen.getByTestId('navbar');
    expect(nav).toMatchSnapshot();
  });
})