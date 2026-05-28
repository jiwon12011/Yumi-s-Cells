const hero = document.querySelector(".hero");
const motionLayers = document.querySelectorAll(".motion-layer");

const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (finePointer) {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<span class="custom-cursor-heart"></span><span class="custom-cursor-dot"></span>';
  document.body.appendChild(cursor);

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let targetCursorX = cursorX;
  let targetCursorY = cursorY;

  const moveCursor = () => {
    cursorX += (targetCursorX - cursorX) * 0.32;
    cursorY += (targetCursorY - cursorY) * 0.32;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(moveCursor);
  };

  window.addEventListener("pointermove", (event) => {
    targetCursorX = event.clientX;
    targetCursorY = event.clientY;
    cursor.classList.add("is-visible");
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, [role='button'], .cell, .mini-profile, .season-card, .gl-filter-btn, .gl-scene-card, .gl-emotion-item, .gl-cell-card")) {
      cursor.classList.add("is-hover");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button, [role='button'], .cell, .mini-profile, .season-card, .gl-filter-btn, .gl-scene-card, .gl-emotion-item, .gl-cell-card")) {
      cursor.classList.remove("is-hover");
    }
  });

  document.addEventListener("pointerleave", () => {
    cursor.classList.remove("is-visible");
  });

  moveCursor();
}

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
  gsap.to(".hero-wave", { y: 9, scaleX: 1.035, duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true, transformOrigin: "50% 100%" });

  // ── 캐릭터 float: idle=잔잔하게 / hover=원래 크기만큼 ────────────
  const cellConfigs = [
    { sel: ".yumi-main",
      idle:  { y: -3,  rotate: .18, duration: 4.6 },
      hover: { y: -15, rotate: .8 } },
    { sel: ".cell-love",
      idle:  { y: [-1, -4, -1], x: 1.5, rotate: 1,   duration: 3.5 },
      hover: { y: -14, x: 5,   rotate: 4 } },
    { sel: ".cell-angry",
      idle:  { y: -1,  x: .5,  rotate: .3,  duration: 3.4 },
      hover: { y: -8,  x: 2 } },
    { sel: ".cell-reading",
      idle:  { y: [-0.5, -2, -0.5], x: -1, rotate: -.4, duration: 4.5 },
      hover: { y: -12, x: -3, rotate: -1.4 } },
    { sel: ".cell-chill",
      idle:  { y: [-0.5, -2.5, -0.5], x: 1.5, rotate: .4, duration: 4.9 },
      hover: { y: -14, x: 4,  rotate: 1.2 } },
    { sel: ".cell-artist",
      idle:  { y: [-0.5, -2, -0.5], x: .8, rotate: -.4, duration: 3.9 },
      hover: { y: -12, x: 2,  rotate: -1.1 } },
  ];

  cellConfigs.forEach(({ sel, idle, hover }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.pointerEvents = "all"; // hero-stage가 pointer-events:none이라도 hover 수신

    let idleTween;
    const startIdle = () => {
      idleTween = gsap.to(el, { ...idle, ease: "sine.inOut", repeat: -1, yoyo: true });
    };
    startIdle();

    el.addEventListener("mouseenter", () => {
      if (idleTween) idleTween.kill();
      gsap.to(el, {
        y:      hover.y      ?? 0,
        x:      hover.x      ?? 0,
        rotate: hover.rotate ?? 0,
        duration: .45, ease: "power2.out"
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { y: 0, x: 0, rotate: 0, duration: .4, ease: "power2.out",
                    onComplete: startIdle });
    });
  });

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
    clipPath: "inset(-40px 0 -40px 18% round 8px)",
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

  gsap.to(".season-float-love",  { y: -5, x: 3, rotate: 1.2, scale: 1.008, duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".season-float-happy", { y: -5, x: -3, rotate: -1.2,            duration: 3.7, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(".season-decor-heart", { y: -3, rotate: 2.5,                    duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true });

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

  gsap.from(".gallery-card", {
    scrollTrigger: { trigger: ".news-gallery-panel", start: "top 70%" },
    y: 18,
    scale: .94,
    autoAlpha: 0,
    duration: .5,
    stagger: .07,
    ease: springEase
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

  // ── 1. Scroll progress bar ────────────────────────
  gsap.to(".scroll-progress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3
    }
  });

  // ── 3. Cell click elastic pop ────────────────────
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      gsap.timeline()
        .to(cell, { scale: 1.38, duration: 0.12, ease: "power2.out" })
        .to(cell, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.38)" });
    });
  });

  // ── 5. Random idle wiggle (removed — too intense) ───────────────

  // ── 6. Season card 3D hover tilt ─────────────────
  document.querySelectorAll(".season-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width  - 0.5;
      const cy = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(card, {
        rotateY: cx * 16,
        rotateX: -cy * 11,
        scale: 1.045,
        duration: 0.35,
        ease: "power2.out",
        transformPerspective: 700
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" });
    });
  });

  // ── 7. Mini-profile hover bounce ─────────────────
  document.querySelectorAll(".mini-profile").forEach((profile) => {
    profile.addEventListener("mouseenter", () => {
      gsap.to(profile, { y: -6, scale: 1.07, duration: 0.25, ease: "back.out(2.5)" });
    });
    profile.addEventListener("mouseleave", () => {
      gsap.to(profile, { y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)" });
    });
  });

  if (document.querySelector(".sub-page")) {
    gsap.from(".sub-kicker, .sub-hero h1, .sub-hero p, .sub-actions", {
      y: 24,
      autoAlpha: 0,
      duration: .58,
      stagger: .08,
      ease: softEase
    });

    /* sub-page hero: fade-up entrance (no infinite float) */
    gsap.from(".sub-hero-visual img", {
      y: 28,
      scale: .88,
      rotate: (index) => index % 2 ? 5 : -5,
      autoAlpha: 0,
      duration: .72,
      stagger: .08,
      ease: springEase
    });

    /* hero image subtle zoom (non-looping) */
    gsap.to(".sub-hero-visual", {
      scale: 1.04,
      duration: 9,
      ease: "none"
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

    /* ── 서브페이지 섹션 헤딩 스크롤 페이드업 ── */
    gsap.utils.toArray(".sub-section-heading").forEach((heading) => {
      gsap.from(heading.children, {
        scrollTrigger: { trigger: heading, start: "top 82%" },
        y: 24,
        autoAlpha: 0,
        duration: .62,
        stagger: .09,
        ease: softEase
      });
    });

    /* ── 이벤트 카드 3D 틸트 (mousemove) ── */
    document.querySelectorAll(".sub-event-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width  - 0.5;
        const cy = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, {
          rotateY: cx * 12,
          rotateX: -cy * 8,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 700
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)" });
      });
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

  /* scroll-progress for sub-pages (index.html already has its own) */
  if (document.querySelector(".sub-page")) {
    gsap.to(".scroll-progress", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });
  }
}

/* ── Header: add is-scrolled class on scroll ──────── */
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile nav: hamburger toggles the slide-down panel ── */
(function () {
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".main-nav");
  if (!button || !nav) return;

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  button.setAttribute("aria-expanded", "false");

  const setOpen = (open) => {
    document.body.classList.toggle("nav-open", open);
    button.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  };
  const close = () => setOpen(false);

  button.addEventListener("click", () => {
    setOpen(!document.body.classList.contains("nav-open"));
  });
  overlay.addEventListener("click", close);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) close();
  });
})();

/* ── Auto-detect active nav item ──────────────────── */
(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = a.getAttribute("href").replace("./", "");
    a.classList.toggle("is-active", href === page);
  });
})();

/* ── Page transition: fade out before navigation ──── */
document.querySelectorAll("a[href]").forEach((a) => {
  const href = a.getAttribute("href");
  if (!href || href.startsWith("#") || href.includes("://") || a.target === "_blank") return;
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const shell = document.querySelector(".site-shell");
    if (shell) shell.classList.add("page-exit");
    setTimeout(() => { window.location.href = href; }, 270);
  });
});
