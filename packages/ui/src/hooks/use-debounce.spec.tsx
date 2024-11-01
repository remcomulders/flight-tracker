import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './use-debounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  const mockFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('calls the function after the specified delay', () => {
    const { result } = renderHook(() => useDebounce(mockFunction, 200));

    act(() => {
      result.current('test');
    });

    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);

    expect(mockFunction).toHaveBeenCalledWith('test');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('cancels the previous call if invoked again within the delay', () => {
    const { result } = renderHook(() => useDebounce(mockFunction, 200));

    act(() => {
      result.current('first call');
      result.current('second call');
    });

    jest.advanceTimersByTime(100);
    expect(mockFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(mockFunction).toHaveBeenCalledWith('second call');
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('clears the timeout when clear is called', () => {
    const { result } = renderHook(() => useDebounce(mockFunction, 200));

    act(() => {
      result.current('test');
      result.current.clear();
    });

    jest.advanceTimersByTime(200);

    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('maintains the same reference for clear between renders', () => {
    const { result, rerender } = renderHook(() => useDebounce(mockFunction, 200));
    const initialClear = result.current.clear;

    rerender();

    expect(result.current.clear).toBe(initialClear);
  });
});
