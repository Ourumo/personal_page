'use client';

import { useEffect, useRef } from 'react';

import styles from './Introduce.module.css';

export default function IntroduceSpotlight() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    // 예외 처리: 포인터가 없거나 모션 최소화가 켜져있으면 = CSS 기본값(중앙 고정)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paint = () => {
      frameId = 0;
      const rect = layer.getBoundingClientRect();
      layer.style.setProperty('--mx', `${pointerX - rect.left}px`);
      layer.style.setProperty('--my', `${pointerY - rect.top}px`);
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      // 이벤트마다 스타일을 쓰지 않고 프레임당 한 번으로 제한한다
      if (frameId === 0) frameId = requestAnimationFrame(paint);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      if (frameId !== 0) cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={layerRef} className={styles.spotlight} aria-hidden />;
}
