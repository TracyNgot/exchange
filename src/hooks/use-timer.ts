import { useEffect, useRef } from 'react';

export default function useTimer(callback: () => void) {
  const timer = useRef<any>(false);

  useEffect(() => {
    timer.current = setInterval(() => callback(), 10000);

    return () => {
      clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback]);
}
