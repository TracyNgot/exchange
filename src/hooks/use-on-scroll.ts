import { useEffect } from 'react';

export default function useOnScroll(
  handleScroll: (...args: any) => any,
  margin = 0,
) {
  function handleScrollAtTheEnd() {
    const element = document.getElementById('root');
    if (!element) return;

    const height = element.offsetHeight;
    const offset = document.documentElement.scrollTop + window.innerHeight;

    if (offset * (1 + margin) >= height) {
      handleScroll();
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollAtTheEnd);
    return () => {
      window.removeEventListener('scroll', handleScrollAtTheEnd);
    };
  });
}
