'use client';

import { useEffect, useRef } from 'react';

import styles from './Introduce.module.css';

export default function IntroduceInspector() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const section = box.closest('section');
    const label = box.firstElementChild;
    if (!section || !label) return;

    // 예외 처리: 포인터가 없거나(터치) 모션 최소화면 검사 오버레이를 켜지 않는다
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(
      section.querySelectorAll<HTMLElement>('[data-inspect]'),
    );

    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let hidden = true;
    let listening = false;

    const hide = () => {
      if (hidden) return;
      hidden = true;
      box.style.opacity = '0';
    };

    const paint = () => {
      frameId = 0;

      const hit = targets.find((target) => {
        const r = target.getBoundingClientRect();
        return (
          pointerX >= r.left &&
          pointerX <= r.right &&
          pointerY >= r.top &&
          pointerY <= r.bottom
        );
      });

      if (!hit) {
        hide();
        return;
      }

      const rect = hit.getBoundingClientRect();
      const base = section.getBoundingClientRect();

      // 숨은 상태에서 다시 나타날 때는 직전 위치에서 미끄러져 오지 않도록 전환을 끈다
      if (hidden) box.style.transition = 'none';

      box.style.transform = `translate(${rect.left - base.left}px, ${rect.top - base.top}px)`;
      box.style.width = `${rect.width}px`;
      box.style.height = `${rect.height}px`;
      label.textContent = `${hit.dataset.inspect} ${Math.round(rect.width)} × ${Math.round(rect.height)}`;

      if (hidden) {
        void box.offsetWidth; // 강제 리플로우로 위 스타일을 전환 없이 확정시킨다
        box.style.transition = '';
        hidden = false;
      }

      box.style.opacity = '1';
    };

    const schedule = () => {
      if (frameId === 0) frameId = requestAnimationFrame(paint);
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      schedule();
    };

    // 스크롤 중에는 박스가 어긋나므로 감췄다가, 마우스가 다시 움직이면 되살린다
    const handleScroll = () => {
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
      hide();
    };

    const startListening = () => {
      if (listening) return;
      listening = true;
      window.addEventListener('mousemove', handlePointerMove, {
        passive: true,
      });
      window.addEventListener('scroll', handleScroll, { passive: true });
    };

    const stopListening = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
      hide();
    };

    // 자기소개 섹션이 화면 밖이면 계산을 멈춘다
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startListening();
      else stopListening();
    });
    observer.observe(section);

    return () => {
      observer.disconnect();
      stopListening();
    };
  }, []);

  return (
    <div ref={boxRef} className={styles.inspector} aria-hidden>
      <span className={styles.inspectorLabel} />
    </div>
  );
}
