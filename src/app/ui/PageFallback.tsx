import style from "./PageFallback.module.css";

export function PageFallback() {
  return (
    <div
      className={style.wrap}
      role="status"
      aria-live="polite"
      aria-label="Загрузка страницы"
    >
      <div className={style.spinner} />
      <span className={style.text}>Загрузка…</span>
    </div>
  );
}
