(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loader = $('.loader');
  if (loader) {
    const line = $('.loader-line span');
    if (window.gsap) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.to(line, { width: '100%', duration: 0.9 })
        .to(loader, { autoAlpha: 0, duration: 0.75, delay: 0.2, onComplete: () => loader.remove() });
    } else {
      setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 300);
      }, 850);
    }
  }

  const menu = $('.menu');
  const panel = $('.mobile-menu-panel');
  const close = $('.menu-close');
  if (menu && panel) {
    menu.addEventListener('click', () => panel.classList.add('open'));
    close?.addEventListener('click', () => panel.classList.remove('open'));
    $$('.mobile-menu-panel a').forEach((a) => a.addEventListener('click', () => panel.classList.remove('open')));
  }

  const nav = $('.nav');
  const updateNavState = () => {
    if (!nav) return;
    const scrolled = window.scrollY > 18;
    nav.classList.toggle('is-scrolled', scrolled);
  };
  updateNavState();
  addEventListener('scroll', updateNavState, { passive: true });

  let lastY = window.scrollY;
  addEventListener('scroll', () => {
    if (!nav) return;
    const y = window.scrollY;
    if (y > 100 && y > lastY) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastY = y;
  }, { passive: true });

  if (!reduced && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    if (window.Lenis) {
      const lenis = new Lenis({ duration: 1.15, smoothWheel: true, gestureOrientation: 'vertical' });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
    });

    gsap.utils.toArray('.reveal-text').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    });

    gsap.utils.toArray('.reveal-line').forEach((el, i) => {
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', y: 18 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, delay: i * 0.08, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    gsap.utils.toArray('.image-reveal').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', scale: 1.04 }, { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    });

    gsap.utils.toArray('.project-media img').forEach((img) => {
      gsap.to(img, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    });

    const hero = document.querySelector('.hero');
    const heroMedia = document.querySelector('.hero-media');
    const heroFlare = document.querySelector('.hero-flare');
    if (hero && heroMedia) {
      gsap.to(heroMedia, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    }
    if (hero && heroFlare) {
      gsap.to(heroFlare, { scale: 1.5, opacity: 0.6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
    }

    const methodTrack = document.querySelector('.method-track');
    if (methodTrack && document.querySelector('.method')) {
      gsap.to(methodTrack, {
        x: () => -(methodTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.08),
        ease: 'none',
        scrollTrigger: {
          trigger: '.method',
          start: 'top top',
          end: () => '+=' + methodTrack.scrollWidth * 1.1,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }

    const ticker = document.querySelector('.ticker span');
    if (ticker) {
      gsap.to(ticker, {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }
  } else {
    $$('.reveal, .reveal-text').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    $$('.reveal-line').forEach((el) => {
      el.style.clipPath = 'none';
      el.style.transform = 'none';
    });
    $$('.image-reveal').forEach((el) => el.style.clipPath = 'none');
  }

  const cursor = $('.cursor');
  if (cursor && !reduced && matchMedia('(pointer:fine)').matches) {
    cursor.style.opacity = '1';
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let cx = mx;
    let cy = my;
    addEventListener('mousemove', (event) => {
      mx = event.clientX;
      my = event.clientY;
    });
    const animateCursor = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    $$('a, button, .service-row, .project-media, .hero-cta-row > a').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  $$('.magnetic').forEach((el) => {
    if (reduced) return;
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

