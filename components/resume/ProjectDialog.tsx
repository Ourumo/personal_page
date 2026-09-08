"use client";

import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

import { PROJECT_BUTTON_CLASS } from "./buttonStyle";

interface ProjectDialogProps {
  title: string;
  children: ReactNode;
}

/**
 * '자세히 보기' 버튼과 그 내용을 담는 모달.
 * 네이티브 <dialog> 를 써서 ESC 닫기 · 포커스 가둠 · 배경 비활성화 · 최상위 레이어를
 * 브라우저에 맡긴다. 이 컴포넌트는 여닫는 것만 담당하고 내용은 children 으로 받는다.
 */
export default function ProjectDialog({ title, children }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  /* 언마운트 중에 모달이 열려 있었다면 스크롤 잠금을 되돌린다 */
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  /* ESC · 닫기 버튼 · 배경 클릭 어느 경로로 닫혀도 여기를 지난다 */
  const handleClose = () => {
    document.documentElement.style.overflow = "";
  };

  /* dialog 자신이 클릭 대상이면 배경(::backdrop)을 누른 것이다 */
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current.close();
  };

  return (
    <>
      <button type="button" onClick={open} className={PROJECT_BUTTON_CLASS}>
        자세히 보기
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onClick={handleClick}
        className="m-auto w-[min(90vw,40rem)] rounded-2xl border border-border bg-bg-card p-0 text-main shadow-card-strong backdrop:bg-black/40"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <h3 id={titleId} className="font-semibold text-main">
            {title}
          </h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="닫기"
            className="rounded-sm px-1 text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 break-keep">
          {children}
        </div>
      </dialog>
    </>
  );
}
