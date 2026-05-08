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
  gsap.config({ nullTargetWarn: false });

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
    .add("start", 0)
    .fromTo(".hero-bg", { scale: 1.055, filter: "blur(3px)" }, { scale: 1.02, filter: "blur(0px)", duration: .62 }, "start")
    .fromTo(".site-header", { y: -14 }, { y: 0, autoAlpha: 1, duration: .34 }, "start+=.04")
    .fromTo(".eyebrow", { y: 10 }, { y: 0, autoAlpha: 1, duration: .3 }, "start+=.08")
    .fromTo(".hero h1 span", { y: 24, rotateX: 8 }, { y: 0, rotateX: 0, autoAlpha: 1, duration: .42, stagger: .045 }, "start+=.14")
    .fromTo(".title-heart", { scale: 0, rotate: -14 }, { scale: 1, rotate: 8, duration: .28, ease: springEase }, "start+=.32")
    .fromTo(".hero-description", { y: 10 }, { y: 0, autoAlpha: 1, duration: .32 }, "start+=.28")
    .fromTo(".hero-cta", { y: 12, scale: .98 }, { y: 0, scale: 1, autoAlpha: 1, duration: .34 }, "start+=.36")
    .fromTo(".yumi-main", { y: 30, scale: .96, rotate: -.8 }, { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: .5, ease: springEase }, "start+=.22")
    .fromTo(".cell", { y: 20, scale: .78, rotate: -8 }, { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: .38, stagger: .032, ease: springEase }, "start+=.34")
    .fromTo(".cell-panels", { x: 18, y: -8, scale: .92 }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .38, ease: springEase }, "start+=.38")
    .fromTo(".scroll-hint", { y: 10 }, { y: 0, autoAlpha: 1, duration: .3 }, "start+=.48");

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
  gsap.to(".title-heart", { y: -3, rotate: -6, scale: 1.05, duration: 1.7, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".yumi-main", { y: -8, rotate: .35, duration: 4.6, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".hero-wave", { y: 9, scaleX: 1.035, duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true, transformOrigin: "50% 100%" });

  gsap.to(".cell-love", { y: [-3, -12, -3], x: 5, rotate: 4, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".cell-angry", { y: -3, x: 1.5, rotate: .8, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".cell-reading", { y: [-1, -6, -1], x: -3, rotate: -1.4, duration: 4.5, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".cell-chill", { y: [-2, -7, -2], x: 4, rotate: 1.2, duration: 4.9, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".cell-artist", { y: [-1, -5, -1], x: 2, rotate: -1.1, duration: 3.9, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.to(".cell-panels", {
    y: -14,
    x: 8,
    rotate: -1.8,
    scale: 1.025,
    duration: 3.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    transformOrigin: "72% 44%"
  });
  gsap.to(".bubbles span", {
    y: "-72vh",
    x: "random(-18, 22)",
    scale: "random(.82, 1.12)",
    opacity: 0,
    duration: "random(8, 13)",
    stagger: { each: 1.05, repeat: -1 },
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

  gsap.from(".rel-card-cells", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 78%" },
    x: -80,
    rotate: -2,
    autoAlpha: 0,
    duration: .8,
    ease: softEase
  });

  gsap.from(".rel-card-people, .rel-card-town", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 78%" },
    x: 80,
    clipPath: "inset(0 0 0 18% round 8px)",
    autoAlpha: 0,
    duration: .78,
    stagger: .14,
    ease: softEase
  });

  gsap.from(".mini-profile", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 70%" },
    y: (index) => index % 2 ? 30 : -18,
    scale: .82,
    rotate: (index) => index % 3 === 0 ? -7 : 5,
    autoAlpha: 0,
    duration: .55,
    stagger: .045,
    ease: springEase
  });

  gsap.from(".connection-line", {
    scrollTrigger: { trigger: ".relationship-map", start: "top 72%" },
    scaleX: 0,
    transformOrigin: (index) => index === 0 ? "right center" : "left center",
    duration: .85,
    stagger: .16,
    ease: softEase
  });

  gsap.to(".yumi-orbit", { y: -9, scale: 1.025, duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".rel-center strong", { y: -5, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.from(".season-card", {
    scrollTrigger: { trigger: ".season-grid", start: "top 78%" },
    y: 22,
    rotateY: (index) => index % 2 ? 5 : -5,
    clipPath: "inset(3% 3% 3% 3% round 8px)",
    autoAlpha: 0,
    duration: .62,
    stagger: .09,
    ease: springEase
  });

  gsap.to(".season-float-love", { y: -18, x: 12, rotate: 5, scale: 1.035, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".season-float-happy", { y: -18, x: -12, rotate: -5, duration: 3.7, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".season-decor-heart", { y: -10, rotate: 8, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.from(".webtoon-copy > *", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 76%" },
    y: 22,
    autoAlpha: 0,
    duration: .65,
    stagger: .1,
    ease: softEase
  });

  gsap.from(".webtoon-phone", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 74%" },
    y: 36,
    rotate: -10,
    scale: .94,
    autoAlpha: 0,
    duration: .78,
    ease: softEase
  });

  gsap.from(".webtoon-panels", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 74%" },
    x: 34,
    autoAlpha: 0,
    clipPath: "inset(0 100% 0 0)",
    duration: .78,
    ease: softEase
  });

  gsap.from(".webtoon-frame", {
    scrollTrigger: { trigger: ".webtoon-meet", start: "top 72%" },
    scaleY: 0,
    transformOrigin: "top center",
    duration: .42,
    stagger: .13,
    ease: "power2.out"
  });

  gsap.to(".webtoon-phone", { y: -6, rotate: -5, duration: 5.4, ease: "sine.inOut", repeat: -1, yoyo: true });

  gsap.from(".news-gallery-panel", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 78%" },
    clipPath: "inset(7% 4% 7% 4% round 8px)",
    scale: .97,
    autoAlpha: 0,
    duration: .72,
    ease: softEase
  });

  gsap.from(".news-block", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 75%" },
    x: -38,
    autoAlpha: 0,
    duration: .65,
    ease: softEase
  });

  gsap.from(".gallery-block", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 75%" },
    x: 38,
    autoAlpha: 0,
    duration: .65,
    ease: softEase
  });

  gsap.from(".featured-news", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 72%" },
    y: 26,
    rotate: -2,
    scale: .92,
    autoAlpha: 0,
    duration: .7,
    ease: springEase
  });

  gsap.from(".news-list a", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 70%" },
    x: 24,
    y: 10,
    rotate: -1,
    scale: .94,
    autoAlpha: 0,
    duration: .55,
    stagger: .085,
    ease: springEase
  });

  gsap.from(".gallery-strip img", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 70%" },
    y: 18,
    scale: .9,
    autoAlpha: 0,
    duration: .5,
    stagger: .055,
    ease: springEase
  });

  gsap.to(".gallery-strip img", {
    y: (index) => index % 2 ? -3 : -5,
    duration: (index) => 4.2 + index * .2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: .12
  });

  gsap.from(".support-copy > *", {
    scrollTrigger: { trigger: ".support-banner", start: "top 82%" },
    y: 28,
    scale: .94,
    autoAlpha: 0,
    duration: .65,
    stagger: .1,
    ease: softEase
  });

  gsap.fromTo(".support-cells-left", {
    x: -90,
    rotate: -8,
    autoAlpha: 0
  }, {
    scrollTrigger: { trigger: ".support-banner", start: "top 82%" },
    x: 0,
    rotate: 0,
    autoAlpha: 1,
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

  gsap.to(".support-buttons a", {
    y: -4,
    duration: 1.6,
    stagger: .18,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  if (document.querySelector(".sub-page")) {
    gsap.from(".sub-kicker, .sub-hero h1, .sub-hero p, .sub-actions", {
      y: 24,
      autoAlpha: 0,
      duration: .58,
      stagger: .08,
      ease: softEase
    });

    gsap.from(".sub-hero-visual img", {
      y: 28,
      scale: .88,
      rotate: (index) => index % 2 ? 5 : -5,
      autoAlpha: 0,
      duration: .72,
      stagger: .08,
      ease: springEase
    });

    gsap.to(".sub-hero-visual img", {
      y: (index) => index % 2 ? -10 : -14,
      rotate: (index) => index % 2 ? 2 : -2,
      duration: (index) => 3.4 + index * .35,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: .08
    });

    gsap.to(".sub-bubbles span", {
      y: -22,
      x: (index) => index % 2 ? 12 : -10,
      scale: 1.05,
      duration: (index) => 4.2 + index * .5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: .15
    });

    gsap.from(".sub-card, .story-timeline article, .sub-gallery-tile, .sub-news-main, .sub-news-items a, .sub-event-card, .sub-info-grid article", {
      scrollTrigger: { trigger: ".sub-section", start: "top 76%" },
      y: 34,
      scale: .96,
      autoAlpha: 0,
      duration: .62,
      stagger: .075,
      ease: springEase
    });
  }

  gsap.from(".site-footer > *", {
    scrollTrigger: { trigger: ".site-footer", start: "top 90%" },
    y: 24,
    autoAlpha: 0,
    duration: .55,
    stagger: .08,
    ease: softEase
  });
}
