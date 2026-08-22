document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const body = document.body;
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer:fine)").matches;

  /* =========================================================
     FLARE — MOTION CONTROLLER
  ========================================================= */

  /* ---------- Loader ---------- */

  let loader = document.querySelector(".flare-page-loader");

  if (!loader) {
    loader = document.createElement("div");
    loader.className = "flare-page-loader";

    loader.innerHTML = `
      <img src="flare-logo.png" alt="FLARE">
      <div class="flare-loader-line"></div>
    `;

    body.prepend(loader);
  }

  const finishLoader = () => {
    root.classList.add("flare-loaded");

    window.setTimeout(() => {
      if (loader) {
        loader.classList.add("is-hidden");
      }

      window.setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.remove();
        }
      }, 700);

    }, reduceMotion ? 0 : 850);
  };

  if (document.readyState === "complete") {

    window.setTimeout(
      finishLoader,
      reduceMotion ? 0 : 250
    );

  } else {

    window.addEventListener(
      "load",
      () => {
        window.setTimeout(
          finishLoader,
          reduceMotion ? 0 : 250
        );
      },
      { once: true }
    );

  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  const setMenu = (open) => {

    if (!menuButton || !mobileMenu) return;

    menuButton.classList.toggle("active", open);
    mobileMenu.classList.toggle("open", open);
    body.classList.toggle("menu-open", open);

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      String(!open)
    );
  };


  if (menuButton && mobileMenu) {

    setMenu(false);

    menuButton.addEventListener("click", (event) => {

      event.preventDefault();

      const isOpen =
        mobileMenu.classList.contains("open");

      setMenu(!isOpen);

    });


    mobileMenu
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {
          setMenu(false);
        });

      });


    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        setMenu(false);
      }

    });


    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth > 1100) {
          setMenu(false);
        }

      },
      { passive: true }
    );

  }


  /* =========================================================
     HERO
  ========================================================= */

  root.classList.add("flare-loaded");


  /* =========================================================
     SCROLL PROGRESS + HEADER
  ========================================================= */

  let scrollTicking = false;

  const updateScroll = () => {

    const doc = document.documentElement;

    const maxScroll = Math.max(
      1,
      doc.scrollHeight - window.innerHeight
    );

    const progress = Math.min(
      1,
      Math.max(
        0,
        window.scrollY / maxScroll
      )
    );

    root.style.setProperty(
      "--flare-progress",
      progress.toFixed(4)
    );


    if (header) {

      const scrolled =
        window.scrollY > 40;

      header.classList.toggle(
        "scrolled",
        scrolled
      );

      header.classList.toggle(
        "is-scrolled",
        scrolled
      );

    }

    scrollTicking = false;
  };


  const onScroll = () => {

    if (scrollTicking) return;

    scrollTicking = true;

    window.requestAnimationFrame(
      updateScroll
    );

  };


  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  updateScroll();


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealSelector = [

    ".idea-grid > div",

    ".services-intro",

    ".service-panel",

    ".services-scroll-note",

    ".principles-heading",

    ".principle-list > div",

    ".chapter-heading > div",

    ".chapter-card",

    ".chapter-note",

    ".big-cta .cta-inner"

  ].join(",");


  const revealItems = Array.from(
    document.querySelectorAll(
      revealSelector
    )
  );


  revealItems.forEach((item) => {

    item.classList.add(
      "motion-reveal"
    );

  });


  if (
    !reduceMotion &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(

        (entries, obs) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            obs.unobserve(
              entry.target
            );

          });

        },

        {
          threshold:
            window.matchMedia(
              "(pointer:coarse)"
            ).matches
              ? 0.07
              : 0.12,

          rootMargin:
            "0px 0px -8% 0px"
        }

      );


    revealItems.forEach((item) => {

      observer.observe(item);

    });

  } else {

    revealItems.forEach((item) => {

      item.classList.add(
        "is-visible"
      );

    });

  }


  /* =========================================================
     SMOOTH ANCHOR SCROLLING
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const id =
            link.getAttribute(
              "href"
            );

          if (
            !id ||
            id === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              id
            );

          if (!target) {
            return;
          }


          event.preventDefault();

          setMenu(false);


          const offset =
            header
              ? header.offsetHeight
              : 0;


          const top =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            offset;


          window.scrollTo({

            top,

            behavior:
              reduceMotion
                ? "auto"
                : "smooth"

          });


          history.replaceState(
            null,
            "",
            id
          );

        }
      );

    });


  /* =========================================================
     DESKTOP SERVICE TILT
  ========================================================= */

  if (
    finePointer &&
    !reduceMotion
  ) {

    document
      .querySelectorAll(
        ".service-panel"
      )
      .forEach((panel) => {

        panel.addEventListener(
          "pointermove",
          (event) => {

            const rect =
              panel.getBoundingClientRect();


            const x =
              (event.clientX -
                rect.left) /
                rect.width -
              0.5;


            const y =
              (event.clientY -
                rect.top) /
                rect.height -
              0.5;


            panel.style.setProperty(
              "--mx",
              `${x * 5}px`
            );


            panel.style.setProperty(
              "--my",
              `${y * 4}px`
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

      });

  }


  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  const cursor =
    document.querySelector(
      ".cursor-dot"
    );


  if (
    cursor &&
    finePointer &&
    !reduceMotion
  ) {

    let mouseX =
      window.innerWidth / 2;

    let mouseY =
      window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;


    window.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      { passive: true }
    );


    const animateCursor = () => {

      currentX +=
        (mouseX - currentX) *
        0.16;


      currentY +=
        (mouseY - currentY) *
        0.16;


      cursor.style.left =
        `${currentX}px`;


      cursor.style.top =
        `${currentY}px`;


      requestAnimationFrame(
        animateCursor
      );

    };


    requestAnimationFrame(
      animateCursor
    );


    document
      .querySelectorAll(
        "a, button, .service-panel, .chapter-card"
      )
      .forEach((element) => {

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

      });

  }


  /* =========================================================
     PAGE-TO-PAGE FADE
  ========================================================= */

  if (!reduceMotion) {

    document
      .querySelectorAll(
        'a[href$=".html"], a[href^="./"], a[href^="../"]'
      )
      .forEach((link) => {

        link.addEventListener(
          "click",
          (event) => {

            const href =
              link.getAttribute(
                "href"
              );


            if (
              !href ||
              link.target === "_blank" ||
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.altKey
            ) {
              return;
            }


            let url;

            try {

              url = new URL(
                href,
                window.location.href
              );

            } catch {

              return;

            }


            if (
              url.origin !==
              window.location.origin
            ) {
              return;
            }


            if (
              url.pathname ===
                window.location.pathname &&
              !url.search
            ) {
              return;
            }


            event.preventDefault();

            setMenu(false);

            body.classList.add(
              "flare-leaving"
            );


            window.setTimeout(
              () => {

                window.location.href =
                  url.href;

              },
              420
            );

          }
        );

      });

  }


  /* =========================================================
     ACTIVE DESKTOP NAV
  ========================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  const navLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );


  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              navLinks.forEach(
                (link) => {

                  link.classList.toggle(

                    "active",

                    link.getAttribute(
                      "href"
                    ) ===
                    `#${entry.target.id}`

                  );

                }
              );

            }
          );

        },

        {

          threshold: 0.45,

          rootMargin:
            `-${
              (header?.offsetHeight || 0) +
              10
            }px 0px -35% 0px`

        }

      );


    sections.forEach(
      (section) => {

        navObserver.observe(
          section
        );

      }
    );

  }

});
