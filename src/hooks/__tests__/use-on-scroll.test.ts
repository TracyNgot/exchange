import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useOnScroll from '../use-on-scroll';

describe('useOnScroll', () => {
  const handleScroll = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    document.getElementById = () =>
      ({
        offsetHeight: 1000,
      } as any);
  });

  it('handles scroll', () => {
    Object.defineProperty(window, 'innerHeight', { value: 1000 });
    renderHook(() => useOnScroll(handleScroll));

    expect(handleScroll).not.toBeCalled();

    fireEvent.scroll(window);

    expect(handleScroll).toBeCalled();
  });

  it('handles scroll if within margin', () => {
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    renderHook(() => useOnScroll(handleScroll, 0.5));

    expect(handleScroll).not.toBeCalled();

    fireEvent.scroll(window);

    expect(handleScroll).toBeCalled();
  });

  it("doesn't handles scroll if not end", () => {
    Object.defineProperty(window, 'innerHeight', { value: 400 });
    renderHook(() => useOnScroll(handleScroll));

    expect(handleScroll).not.toBeCalled();

    fireEvent.scroll(window);

    expect(handleScroll).not.toBeCalled();
  });

  it('removes event listener when unmount', () => {
    window.removeEventListener = jest.fn();
    const { unmount } = renderHook(() => useOnScroll(handleScroll));

    unmount();

    expect(window.removeEventListener).toBeCalled();
  });
});
