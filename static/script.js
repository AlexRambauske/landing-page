(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) return;

  let frame = 0;
  let nextX = 50;
  let nextY = 45;

  const paintPointer = () => {
    root.style.setProperty("--pointer-x", `${nextX}%`);
    root.style.setProperty("--pointer-y", `${nextY}%`);
    frame = 0;
  };

  const onPointerMove = (event) => {
    nextX = (event.clientX / window.innerWidth) * 100;
    nextY = (event.clientY / window.innerHeight) * 100;
    if (!frame) frame = requestAnimationFrame(paintPointer);
  };

  const onPointerLeave = () => {
    nextX = 50;
    nextY = 45;
    if (!frame) frame = requestAnimationFrame(paintPointer);
  };

  const onVisibilityChange = () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("visibilitychange", onVisibilityChange);
})();
