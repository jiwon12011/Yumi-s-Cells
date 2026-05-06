const hero = document.querySelector(".hero");
const motionLayers = document.querySelectorAll(".motion-layer");

if (hero && motionLayers.length) {
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;

  const updatePointer = (event) => {
    const bounds = hero.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  };

  const drift = () => {
    pointerX += (targetX - pointerX) * 0.06;
    pointerY += (targetY - pointerY) * 0.06;

    motionLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 12);
      layer.style.setProperty("--mx", `${pointerX * depth}px`);
      layer.style.setProperty("--my", `${pointerY * depth}px`);
    });

    requestAnimationFrame(drift);
  };

  hero.addEventListener("pointermove", updatePointer);
  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  drift();
}
