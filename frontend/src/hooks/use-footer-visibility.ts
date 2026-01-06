import { useEffect, useState } from 'react';

export function useFooterVisibility() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footerSection = document.getElementById('footer-section');
    if (!footerSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Considera visível quando pelo menos 10% da seção está visível
          setIsFooterVisible(entry.isIntersecting && entry.intersectionRatio > 0.1);
        });
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '-50px 0px 0px 0px', // Considera visível um pouco antes de entrar na viewport
      }
    );

    observer.observe(footerSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return isFooterVisible;
}

