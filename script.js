(() => {
  "use strict";

  const body = document.body;

  /* =========================================================
     HELPERS
  ========================================================= */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


  /* =========================================================
     PAGE LOAD
  ========================================================= */

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      body.classList.add("flare-loaded");
      body.classList.add("hero-ready");
    });
  });

  setTimeout(() => {
    body.classList.add("flare-loaded");
    body.classList.add("hero-ready");
  }, 1200);


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuButton =
    $(".menu-button");

  const flareMenu =
    $(".flare-mobile-menu");

  function setMenu(open) {

    if (!menuButton || !flareMenu) {
      return;
    }

    menuButton.classList.toggle(
      "is-open",
      open
    );

    menuButton.classList.toggle(
      "active",
      open
    );

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.setAttribute(
      "aria-label",
      open
        ? "Close menu"
        : "Open menu"
    );

    flareMenu.classList.toggle(
      "is-open",
      open
    );

    flareMenu.setAttribute(
      "aria-hidden",
      String(!open)
    );

    body.classList.toggle(
      "menu-open",
      open
    );
  }


  if (menuButton && flareMenu) {

    menuButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        const isOpen =
          flareMenu.classList.contains(
            "is-open"
          );

        setMenu(!isOpen);
      }
    );


    $$(
      "[data-menu-link]",
      flareMenu
    ).forEach((link) => {

      link.addEventListener(
        "click",
        () => {
          setMenu(false);
        }
      );

    });


    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {
          setMenu(false);
        }

      }
    );


    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth > 1100) {
          setMenu(false);
        }

      },
      {
        passive: true
      }
    );
  }


  /* =========================================================
     SCROLL PROGRESS
  ========================================================= */

  let ticking = false;


  function updateProgress() {

    const doc =
      document.documentElement;

    const maxScroll =
      doc.scrollHeight -
      window.innerHeight;

    const progress =
      maxScroll > 0
        ? Math.min(
            1,
            Math.max(
              0,
              window.scrollY /
                maxScroll
            )
          )
        : 0;


    doc.style.setProperty(
      "--flare-progress",
      progress.toFixed(4)
    );


    doc.style.setProperty(
      "--flare-scroll",
      `${(
        progress * 100
      ).toFixed(2)}%`
    );


    const header =
      $(".site-header");


    if (header) {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    }


    ticking = false;
  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        requestAnimationFrame(
          updateProgress
        );

        ticking = true;
      }

    },
    {
      passive: true
    }
  );


  updateProgress();


  /* =========================================================
     SCROLL REVEAL
     
     IMPORTANT:
     Content stays visible by default.
     JS only adds animation.
  ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const revealSelector = [
    ".idea-grid",
    ".services-intro",
    ".service-panel",
    ".services-scroll-note",
    ".principles-heading",
    ".principle-list",
    ".chapter-heading",
    ".chapter-card",
    ".chapter-note",
    ".big-cta .cta-inner"
  ].join(",");


  const revealItems =
    Array.from(
      document.querySelectorAll(
        revealSelector
      )
    );


  /*
    Animation is progressive enhancement.
    If JS fails, the CSS keeps everything visible.
  */

  if (!reducedMotion) {

    document.documentElement.classList.add(
      "motion-enabled"
    );

  }


  revealItems.forEach(
    (element, index) => {

      element.classList.add(
        "motion-reveal"
      );

      element.style.setProperty(
        "--motion-delay",
        `${Math.min(
          index,
          6
        ) * 0.06}s`
      );

    }
  );


  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealItems.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target.classList.add(
                "is-visible"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.08,

          rootMargin:
            "0px 0px -6% 0px"
        }
      );


    revealItems.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  /* =========================================================
     SMOOTH ANCHOR LINKS
  ========================================================= */

  $$(
    'a[href^="#"]'
  ).forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();

          setMenu(false);


          target.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",

            block: "start"
          });

        }
      );

    }
  );


  /* =========================================================
     SERVICE LINKS
  ========================================================= */

  $$(".service-explore")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const href =
              link.getAttribute(
                "href"
              );


            if (!href) {
              return;
            }


            if (
              href.startsWith("#")
            ) {
              return;
            }


            event.stopPropagation();

          }
        );

      }
    );


  /* =========================================================
     MAGNETIC BUTTONS
     DESKTOP ONLY
  ========================================================= */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    );


  if (finePointer.matches) {

    $$(
      ".button, .cta-button, .cta-link, .service-explore"
    ).forEach(
      (element) => {

        element.addEventListener(
          "pointermove",
          (event) => {

            const rect =
              element.getBoundingClientRect();


            const x =
              event.clientX -
              (
                rect.left +
                rect.width / 2
              );


            const y =
              event.clientY -
              (
                rect.top +
                rect.height / 2
              );


            const strength = 0.10;


            element.style.transform =
              `translate3d(${
                (
                  x * strength
                ).toFixed(2)
              }px, ${
                (
                  y * strength
                ).toFixed(2)
              }px, 0)`;

          }
        );


        element.addEventListener(
          "pointerleave",
          () => {

            element.style.transform =
              "";

          }
        );

      }
    );

  }


  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  const cursor =
    $(".cursor-dot");


  if (
    cursor &&
    finePointer.matches
  ) {

    let mouseX = -100;
    let mouseY = -100;

    let currentX =
      mouseX;

    let currentY =
      mouseY;


    window.addEventListener(
      "pointermove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      {
        passive: true
      }
    );


    const renderCursor =
      () => {

        currentX +=
          (
            mouseX -
            currentX
          ) * 0.18;


        currentY +=
          (
            mouseY -
            currentY
          ) * 0.18;


        cursor.style.left =
          `${currentX}px`;

        cursor.style.top =
          `${currentY}px`;


        requestAnimationFrame(
          renderCursor
        );

      };


    renderCursor();


    $$(
      "a, button, .service-panel, .chapter-card"
    ).forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursor.classList.add(
              "active"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.classList.remove(
              "active"
            );

          }
        );

      }
    );

  }


  /* =========================================================
     SERVICE PANEL POINTER DEPTH
  ========================================================= */

  if (finePointer.matches) {

    $$(".service-panel")
      .forEach(
        (panel) => {

          panel.addEventListener(
            "pointermove",
            (event) => {

              if (
                window.innerWidth <= 900
              ) {
                return;
              }


              const rect =
                panel.getBoundingClientRect();


              const x =
                (
                  event.clientX -
                  rect.left
                ) /
                  rect.width -
                0.5;


              const y =
                (
                  event.clientY -
                  rect.top
                ) /
                  rect.height -
                0.5;


              panel.style.setProperty(
                "--mx",
                `${(
                  x * 4
                ).toFixed(2)}px`
              );


              panel.style.setProperty(
                "--my",
                `${(
                  y * 4
                ).toFixed(2)}px`
              );

            }
          );


          panel.addEventListener(
            "pointerleave",
            () => {

              panel.style.setProperty(
                "--mx",
                "0px"
              );


              panel.style.setProperty(
                "--my",
                "0px"
              );

            }
          );

        }
      );

  }


  /* =========================================================
     INTERNAL PAGE TRANSITIONS
  ========================================================= */

  $$(
    'a[href$=".html"]'
  ).forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          if (
            event.defaultPrevented ||
            link.target === "_blank" ||
            link.hasAttribute(
              "download"
            )
          ) {
            return;
          }


          const href =
            link.getAttribute(
              "href"
            );


          if (!href) {
            return;
          }


          body.classList.add(
            "flare-leaving"
          );

        }
      );

    }
  );


  /* =========================================================
     SOCIAL LINKS
  ========================================================= */

  $$(".social-icon")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            event.stopPropagation();

          }
        );

      }
    );


  /* =========================================================
     HERO PARALLAX
     VERY SUBTLE
  ========================================================= */

  const hero =
    $("[data-hero]");


  if (
    hero &&
    !reducedMotion
  ) {

    let heroTicking = false;


    function updateHeroParallax() {

      const scroll =
        window.scrollY;


      if (
        scroll >
        window.innerHeight * 1.1
      ) {

        hero.style.setProperty(
          "--hero-scroll",
          "0px"
        );

        heroTicking = false;

        return;
      }


      const offset =
        Math.min(
          scroll * 0.10,
          80
        );


      hero.style.setProperty(
        "--hero-scroll",
        `${offset}px`
      );


      heroTicking = false;

    }


    window.addEventListener(
      "scroll",
      () => {

        if (heroTicking) {
          return;
        }


        heroTicking = true;


        requestAnimationFrame(
          updateHeroParallax
        );

      },
      {
        passive: true
      }
    );

  }


  /* =========================================================
     FINAL READY STATE
  ========================================================= */

  setTimeout(
    () => {

      body.classList.add(
        "flare-motion-ready"
      );

    },
    100
  );

})();
