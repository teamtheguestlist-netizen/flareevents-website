document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     FLARE — INTERACTION ENGINE
     ===================================================== */


  /* =====================================================
     MOBILE MENU
     ===================================================== */

  const menuToggle = document.querySelector("#menuToggle");
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });


    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove("menu-open");

      });

    });


    /*
      Close menu when pressing Escape
    */

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {

        mobileMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove("menu-open");

      }

    });

  }


  /* =====================================================
     DESKTOP CUSTOM CURSOR
     ===================================================== */

  const cursor = document.querySelector(".cursor-dot");

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  );


  if (cursor && finePointer.matches) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;


    window.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

      },
      { passive: true }
    );


    /*
      Smooth cursor movement
    */

    const animateCursor = () => {

      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;

      requestAnimationFrame(animateCursor);

    };

    animateCursor();


    /*
      Cursor grows over interactive elements
    */

    const interactiveElements = document.querySelectorAll(
      "a, button, .service-card, .chapter-card, .magnetic"
    );


    interactiveElements.forEach(element => {

      element.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
      });

    });

  } else if (cursor) {

    cursor.style.display = "none";

  }


  /* =====================================================
     DESKTOP MAGNETIC CIRCLE
     ===================================================== */

  const magneticCircle =
    document.querySelector(".magnetic-circle");


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
          `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.05)`;

      }
    );


    magneticCircle.addEventListener(
      "mouseleave",
      () => {

        magneticCircle.style.transform =
          "translate(0,0) scale(1)";

      }
    );

  }


  /* =====================================================
     MAGNETIC BUTTONS
     ===================================================== */

  const magneticElements =
    document.querySelectorAll(".magnetic");


  if (finePointer.matches) {

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
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform = "";

        }
      );

    });

  }


  /* =====================================================
     SCROLL REVEAL
     ===================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =====================================================
     STAGGERED REVEAL
     ===================================================== */

  const staggerGroups = [
    ".service-cards",
    ".service-list",
    ".chapter-grid",
    ".values-list",
    ".principle-list"
  ];


  staggerGroups.forEach(selector => {

    const container =
      document.querySelector(selector);

    if (!container) return;

    const children =
      container.children;


    Array.from(children).forEach(
      (child, index) => {

        if (
          child.classList.contains("reveal")
        ) {

          child.style.transitionDelay =
            `${index * 90}ms`;

        }

      }
    );

  });


  /* =====================================================
     PARALLAX VISUALS
     ===================================================== */

  const visuals =
    document.querySelectorAll(".visual");


  if (
    visuals.length &&
    window.matchMedia(
      "(min-width:769px) and (pointer:fine)"
    ).matches
  ) {

    let ticking = false;


    const updateParallax = () => {

      visuals.forEach(visual => {

        const rect =
          visual.getBoundingClientRect();

        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {

          const progress =
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);

          const movement =
            (progress - 0.5) * 20;

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


  /* =====================================================
     SMOOTH ANCHOR LINKS
     ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute("href");


          if (
            !targetID ||
            targetID === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetID);


          if (!target) return;


          event.preventDefault();


          const header =
            document.querySelector(
              ".site-header"
            );


          const offset =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =====================================================
     ACTIVE NAVIGATION
     ===================================================== */

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
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;


            navLinks.forEach(link => {

              link.classList.remove(
                "active"
              );


              if (
                link.getAttribute("href") ===
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

      navObserver.observe(section);

    });

  }


  /* =====================================================
     TICKER / MARQUEE
     ===================================================== */

  const ticker =
    document.querySelector(".ticker-track");


  if (ticker) {

    /*
      Make sure the ticker has enough content
      to continuously loop.
    */

    const originalContent =
      ticker.innerHTML;


    /*
      If the existing ticker is short,
      duplicate it automatically.
    */

    if (ticker.scrollWidth <
      window.innerWidth * 2) {

      ticker.innerHTML +=
        originalContent;

    }

  }


  /* =====================================================
     IMAGE / VISUAL HOVER TILT
     ===================================================== */

  const chapterCards =
    document.querySelectorAll(
      ".chapter-card"
    );


  if (finePointer.matches) {

    chapterCards.forEach(card => {

      const visual =
        card.querySelector(".visual");


      if (!visual) return;


      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          const rotateX =
            ((y / rect.height) - 0.5) * -3;


          const rotateY =
            ((x / rect.width) - 0.5) * 3;


          visual.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(.985)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          visual.style.transform =
            "";

        }
      );

    });

  }


  /* =====================================================
     SERVICE CARD HOVER
     ===================================================== */

  const serviceCards =
    document.querySelectorAll(
      ".service-card"
    );


  serviceCards.forEach(card => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.classList.add(
          "is-hovered"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.classList.remove(
          "is-hovered"
        );

      }
    );

  });


  /* =====================================================
     FORM
     ===================================================== */

  const form =
    document.querySelector(
      ".project-form"
    );


  if (form) {

    form.addEventListener(
      "submit",
      event => {

        const button =
          form.querySelector(
            ".form-submit"
          );


        if (!button) return;


        button.textContent =
          "SENDING...";

        button.disabled = true;


        /*
          Don't fake a successful submission.
          The actual form destination should be
          configured separately.
        */

      }
    );

  }


  /* =====================================================
     HEADER SCROLL STATE
     ===================================================== */

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


        if (currentScroll > 80) {

          header.classList.add(
            "scrolled"
          );

        } else {

          header.classList.remove(
            "scrolled"
          );

        }


        lastScroll = currentScroll;

      },
      { passive: true }
    );

  }


  /* =====================================================
     PAGE LOAD
     ===================================================== */

  window.addEventListener(
    "load",
    () => {

      document.body.classList.add(
        "page-loaded"
      );

    }
  );


  /* =====================================================
     RESIZE SAFETY
     ===================================================== */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);


      resizeTimer =
        setTimeout(() => {

          /*
            Re-hide cursor on touch devices
          */

          if (
            cursor &&
            !window.matchMedia(
              "(pointer:fine)"
            ).matches
          ) {

            cursor.style.display =
              "none";

          }

        }, 150);

    }
  );


  /* =====================================================
     INITIAL REVEAL FOR ABOVE-FOLD CONTENT
     ===================================================== */

  setTimeout(() => {

    document
      .querySelectorAll(
        ".hero .reveal"
      )
      .forEach(element => {

        element.classList.add(
          "visible"
        );

      });

  }, 150);

});
