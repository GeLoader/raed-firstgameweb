import { useEffect, useRef, useState } from 'react';

// Scroll reveal hook - adds 'in' class when element enters viewport.
export function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(entry.target);
        }
      },
      options
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, shown };
}