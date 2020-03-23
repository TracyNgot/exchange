import { renderHook } from '@testing-library/react-hooks';
import { useTimer } from '../index';

describe('useTimer', () => {
  beforeEach(jest.useFakeTimers);

  it('calls callback each interval', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimer(callback));

    jest.advanceTimersByTime(10001);
    expect(setInterval).toBeCalledTimes(1);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(10001);
    expect(callback).toBeCalledTimes(2);

    unmount();
    expect(clearInterval).toBeCalled();
  });
});
