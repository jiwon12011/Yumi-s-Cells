const hero = document.querySelector(".hero");
const motionLayers = document.querySelectorAll(".motion-layer");

const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

if (window.gsap && canAnimate) {
  document.body.classList.add("gsap-ready");
  gsap.registerPlugin(ScrollTrigger);

  const softEase = "power3.out";
  const springEase = "back.out(1.5)";

  gsap.set([
    ".site-header",
    ".eyebrow",
    ".hero h1 span",
    ".hero-description",
    ".hero-cta",
    ".yumi-main",
    ".cell",
    ".cell-panels",
    ".scroll-hint"
  ], { autoAlpha: 0 });

  const heroTl = gsap.timeline({ defaults: { ease: softEase } });

  heroTl
    .fromTo(".hero-bg", { scale: 1.08, filter: "blur(5px)" }, { scale: 1.02, filter: "blur(0px)", duration: 1.6 })
    .fromTo(".site-header", { y: -26 }, { y: 0, autoAlpha: 1, duration: .8 }, "-=1.25")
    .fromTo(".eyebrow", { y: 22 }, { y: 0, autoAlpha: 1, duration: .65 }, "-=.45")
    .fromTo(".hero h1 span", { y: 58, rotateX: 22 }, { y: 0, rotateX: 0, autoAlpha: 1, duration: .9, stagger: .12 }, "-=.25")
    .fromTo(".title-heart", { scale: 0, rotate: -28 }, { scale: 1, rotate: 8, duration: .55, ease: springEase }, "-=.28")
    .fromTo(".hero-description", { y: 22 }, { y: 0, autoAlpha: 1, duration: .65 }, "-=.3")
    .fromTo(".hero-cta", { y: 24, scale: .96 }, { y: 0, scale: 1, autoAlpha: 1, duration: .65 }, "-=.35")
    .fromTo(".yumi-main", { y: 70, scale: .9, rotate: -2 }, { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: 1, ease: springEase }, "-=.35")
    .fromTo(".cell", { y: 46, scale: .55, rotate: -18 }, { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: .72, stagger: .08, ease: springEase }, "-=.62")
    .fromTo(".cell-panels", { x: 42, y: -22, scale: .82 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .8, ease: springEase }, "-=.52")
    .fromTo(".scroll-hint", { y: 18 }, { y: 0, autoAlpha: 1, duration: .55 }, "-=.2");

  gsap.to(".hero-bg", {
    scale: 1.06,
    xPercent: -1.2,
    yPercent: -1,
    duration: 8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.to(".hero-glow-blue", { x: 38, y: 20, scale: 1.12, duration: 5.5, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".hero-glow-pink", { x: -32, y: 28, scale: 1.18, duration: 6.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".title-heart", { y: -5, rotate: -8, scale: 1.08, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".yumi-main", { y: -16, rotate: .6, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true });

  document.querySelectorAll(".cell").forEach((cell, index) => {
    gsap.to(cell, {
      y: [-8, -20, -8],
      x: index % 2 ? 8 : -8,
      rotate: index % 2 ? 5 : -5,
      duration: 2.6 + index * .28,
      delay: index * .14,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  });

  gsap.to(".cell-panels", { y: -15, rotate: -1.5, duration: 3.6, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".bubbles span", {
    y: "-105vh",
    x: "random(-28, 36)",
    scale: "random(.8, 1.25)",
    opacity: 0,
    duration: "random(6, 10)",
    stagger: { each: .8, repeat: -1 },
    ease: "none"
  });
  gsap.to(".sparkles span, .rel-star, .watch-spark", {
    scale: 1.35,
    rotate: 120,
    opacity: .95,
    duration: 1.15,
    stagger: .18,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.utils.toArray(".section-heading").forEach((heading) => {
    gsap.from(heading.children, {
      scrollTrigger: {
        trigger: heading,
        start: "top 82%"
      },
      y: 28,
      autoAlpha: 0,
      duration: .7,
      stagger: .08,
      ease: softEase
    });
  });

  gsap.from(".rel-center", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 78%" },
    scale: .78,
    y: 34,
    autoAlpha: 0,
    duration: .85,
    ease: springEase
  });

  gsap.from(".rel-card", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 78%" },
    y: 60,
    rotate: (index) => index % 2 ? 2 : -2,
    autoAlpha: 0,
    duration: .8,
    stagger: .16,
    ease: softEase
  });

  gsap.from(".mini-profile", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 70%" },
    y: 26,
    scale: .86,
    autoAlpha: 0,
    duration: .55,
    stagger: .045,
    ease: springEase
  });

  gsap.from(".connection-line", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 72%" },
    scaleX: 0,
    transformOrigin: "center",
    duration: .75,
    stagger: .12,
    ease: softEase
  });

  gsap.to(".yumi-orbit", { y: -9, scale: 1.03, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.from(".season-card", {
    scrollTrigger: { trigger: ".season-grid", start: "top 78%" },
    y: 66,
    rotateY: -12,
    autoAlpha: 0,
    duration: .85,
    stagger: .14,
    ease: springEase
  });

  gsap.to(".season-float-love", { y: -22, x: 10, rotate: 7, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".season-float-happy", { y: -18, x: -12, rotate: -5, duration: 3.7, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".season-cell-group", { x: -18, y: -8, duration: 5.2, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.from(".webtoon-copy > *", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 76%" },
    x: -45,
    autoAlpha: 0,
    duration: .65,
    stagger: .1,
    ease: softEase
  });

  gsap.from(".webtoon-phone", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 74%" },
    y: 90,
    rotate: -16,
    scale: .86,
    autoAlpha: 0,
    duration: .95,
    ease: springEase
  });

  gsap.from(".webtoon-panels", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 74%" },
    x: 90,
    autoAlpha: 0,
    duration: .9,
    ease: softEase
  });

  gsap.to(".webtoon-phone", { y: -14, rotate: -3, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.from(".news-block, .gallery-block", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 78%" },
    y: 52,
    autoAlpha: 0,
    duration: .75,
    stagger: .16,
    ease: softEase
  });

  gsap.from(".news-list a, .gallery-strip img", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 70%" },
    y: 24,
    scale: .92,
    autoAlpha: 0,
    duration: .5,
    stagger: .045,
    ease: springEase
  });

  gsap.from(".support-copy > *", {
    scrollTrigger: { trigger: ".support-banner", start: "top 82%" },
    y: 28,
    autoAlpha: 0,
    duration: .65,
    stagger: .1,
    ease: softEase
  });

  gsap.from(".support-cells-left", {
    scrollTrigger: { trigger: ".support-banner", start: "top 82%" },
    x: -90,
    rotate: -8,
    autoAlpha: 0,
    duration: .85,
    ease: springEase
  });

  gsap.from(".support-cells-right", {
    scrollTrigger: { trigger: ".support-banner", start: "top 82%" },
    x: 90,
    rotate: 8,
    autoAlpha: 0,
    duration: .85,
    ease: springEase
  });

  gsap.to(".support-cells-left, .support-cells-right", {
    y: -12,
    duration: 3,
    stagger: .35,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  gsap.from(".site-footer > *", {
    scrollTrigger: { trigger: ".site-footer", start: "top 90%" },
    y: 24,
    autoAlpha: 0,
    duration: .55,
    stagger: .08,
    ease: softEase
  });
}
