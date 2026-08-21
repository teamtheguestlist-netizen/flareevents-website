document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuButton =
    document.querySelector(".menu-button");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  const mobileLinks =
    document.querySelectorAll(".mobile-navigation a");


  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        menuButton.classList.toggle("active");

      mobileMenu.classList.toggle("open");

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close menu"
          : "Open menu"
      );

      mobileMenu.setAttribute(
        "aria-hidden",
        String(!isOpen)
      );

    });


    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open menu"
        );

        mobileMenu.setAttribute(
          "aria-hidden",
          "true"
        );

      });

    });

  }


  /* =========================================================
     ESCAPE CLOSE MENU
  ========================================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (!mobileMenu || !menuButton) return;

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("open");

    document.body.classList.remove(
      "menu-open"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

  });


  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  const cursor =
    document.querySelector(".cursor-dot");

  const finePointer =
    window.matchMedia(
      "(pointer:fine)"
    );


  if (cursor && finePointer.matches) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

      },
      { passive: true }
    );


    const animateCursor = () => {

      currentX +=
        (mouseX - currentX) * 0.18;

      currentY +=
        (mouseY - currentY) * 0.18;

      cursor.style.left =
        `${currentX}px`;

      cursor.style.top =
        `${currentY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };


    animateCursor();


    const interactiveElements =
      document.querySelectorAll(
        "a, button, .service-card, .magnetic-circle"
      );


    interactiveElements.forEach(element => {

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
     MAGNETIC ELEMENTS
  ========================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic"
    );


  if (
    magneticElements.length &&
    finePointer.matches
  ) {

    magneticElements.forEach(element => {

      element.addEventListener(
        "mousemove",
        event => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          element.style.transform =
            `translate(${x * .08}px, ${y * .08}px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform =
            "";

        }
      );

    });

  }


  /* =========================================================
     MAGNETIC CIRCLE
  ========================================================= */

  const magneticCircle =
    document.querySelector(
      ".magnetic-circle"
    );


  if (
    magneticCircle &&
    window.matchMedia(
      "(min-width:1101px) and (pointer:fine)"
    ).matches
  ) {

    magneticCircle.addEventListener(
      "mousemove",
      event => {

        const rect =
          magneticCircle.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        magneticCircle.style.transform =
          `translate(${x * .18}px, ${y * .18}px) scale(1.05)`;

      }
    );


    magneticCircle.addEventListener(
      "mouseleave",
      () => {

        magneticCircle.style.transform =
          "";

      }
    );

  }


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add(
        "visible"
      );

    });

  }


  /* =========================================================
     SMOOTH ANCHOR LINKS
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute(
              "href"
            );


          if (
            !targetID ||
            targetID === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetID
            );


          if (!target) return;


          event.preventDefault();


          const header =
            document.querySelector(
              ".site-header"
            );


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


          window.scrollTo({

            top:
              targetPosition,

            behavior:
              "smooth"

          });

        }
      );

    });


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

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            navLinks.forEach(link => {

              link.classList.remove(
                "active"
              );


              if (
                link.getAttribute(
                  "href"
                ) ===
                `#${entry.target.id}`
              ) {

                link.classList.add(
                  "active"
                );

              }

            });

          });

        },
        {
          threshold: 0.35
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }


  /* =========================================================
     PARALLAX WORK VISUALS
  ========================================================= */

  const visuals =
    document.querySelectorAll(
      ".visual"
    );


  if (
    visuals.length &&
    window.matchMedia(
      "(min-width:769px)"
    ).matches &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    let ticking = false;


    const updateParallax = () => {

      visuals.forEach(visual => {

        const rect =
          visual.getBoundingClientRect();


        if (
          rect.top <
            window.innerHeight &&
          rect.bottom >
            0
        ) {

          const progress =
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);


          const movement =
            (progress - .5) * 12;


          visual.style.backgroundPosition =
            `center ${50 + movement}%`;

        }

      });


      ticking = false;

    };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          requestAnimationFrame(
            updateParallax
          );

          ticking = true;

        }

      },
      { passive: true }
    );

  }


  /* =========================================================
     HEADER SCROLL STATE
  ========================================================= */

  const header =
    document.querySelector(
      ".site-header"
    );


  if (header) {

    let lastScroll = 0;


    window.addEventListener(
      "scroll",
      () => {

        const currentScroll =
          window.scrollY;


        if (
          currentScroll > 40
        ) {

          header.classList.add(
            "scrolled"
          );

        } else {

          header.classList.remove(
            "scrolled"
          );

        }


        lastScroll =
          currentScroll;

      },
      { passive: true }
    );

  }


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.style.visibility =
          "hidden";

      }
    );

  });


});
