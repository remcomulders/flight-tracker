import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { InputForm } from './input-form';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('InputForm', () => {
  const mockRouterReplace = jest.fn();
  const mockSearchParamsGet = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockRouterReplace });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockSearchParamsGet,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with input and reset button', () => {
    const { getByTestId } = render(<InputForm />);
    expect(getByTestId('input-form')).toBeInTheDocument();
    expect(getByTestId('airport-input')).toBeInTheDocument();
    expect(getByTestId('reset-button')).toBeInTheDocument();
  });

  it('sets the input default value based on the destination query parameter', () => {
    mockSearchParamsGet.mockReturnValue('amsterdam');
    const { getByTestId } = render(<InputForm />);
    expect(getByTestId('airport-input')).toHaveValue('amsterdam');
  });

  it('updates the destination query parameter when input has 3 or more characters', async () => {
    const { getByTestId } = render(<InputForm />);
    const input = getByTestId('airport-input');

    fireEvent.change(input, { target: { value: 'london' } });

    await waitFor(() => {
      expect(mockRouterReplace).toHaveBeenCalledWith('?destination=london', { scroll: false });
    });
  });

  it('does not update the query parameter when input has less than 3 characters', async () => {
    const { getByTestId } = render(<InputForm />);
    const input = getByTestId('airport-input');

    fireEvent.change(input, { target: { value: 'lo' } });

    await waitFor(() => {
      expect(mockRouterReplace).not.toHaveBeenCalled();
    });
  });

  it('resets the input and query parameter when reset button is clicked', async () => {
    const { getByTestId } = render(<InputForm />);
    const input = getByTestId('airport-input');
    fireEvent.change(input, { target: { value: 'london' } });

    fireEvent.click(getByTestId('reset-button'));

    expect(input).toHaveValue('');
    expect(mockRouterReplace).toHaveBeenCalledWith('/', { scroll: false });
  });
});
