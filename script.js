document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      const open = mobileMenu.classList.toggle("open");

      menuButton.classList.toggle("active", open);
      document.body.classList.toggle("menu-open", open);

      menuButton.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

    });

    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        menuButton.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================
     ESCAPE CLOSE MENU
  ========================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (!menuButton || !mobileMenu) return;

    mobileMenu.classList.remove("open");
    menuButton.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  });


  /* =========================================
     DESKTOP CUSTOM CURSOR
     DESKTOP ONLY
  ========================================= */

  const cursor = document.querySelector(".cursor-dot");

  const desktop =
    window.matchMedia(
      "(min-width:1101px) and (pointer:fine)"
    );

  if (cursor && desktop.matches) {

    window.addEventListener("mousemove", event => {

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

    }, { passive: true });


    const interactive =
      document.querySelectorAll(
        "a, button, .service-card, .chapter-card, .magnetic"
      );


    interactive.forEach(element => {

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


  /* =========================================
     MAGNETIC CIRCLE
     DESKTOP ONLY
  ========================================= */

  const circle =
    document.querySelector(".magnetic-circle");


  if (
    circle &&
    desktop.matches
  ) {

    circle.addEventListener(
      "mousemove",
      event => {

        const rect =
          circle.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        circle.style.transform =
          `translate(${x * .18}px, ${y * .18}px) scale(1.05)`;

      }
    );


    circle.addEventListener(
      "mouseleave",
      () => {

        circle.style.transform =
          "translate(0,0) scale(1)";

      }
    );

  }


  /* =========================================
     MAGNETIC BUTTONS
  ========================================= */

  if (desktop.matches) {

    document
      .querySelectorAll(".magnetic")
      .forEach(element => {

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
              `translate(${x * .06}px, ${y * .06}px)`;

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


  /* =========================================
     FIXED SCROLL REVEAL
     
     IMPORTANT:
     Observe ALL .reveal elements.
     This fixes the blank hero.
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -40px 0px"
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


  /* =========================================
     FORCE HERO VISIBLE
     
     Hero should NEVER stay hidden.
  ========================================= */

  setTimeout(() => {

    document
      .querySelectorAll(".hero .reveal")
      .forEach(element => {

        element.classList.add("visible");

      });

  }, 100);


  /* =========================================
     MARQUEE
     
     Supports your actual HTML:
     .marquee-section
     .marquee-track
  ========================================= */

  const marquee =
    document.querySelector(".marquee-track");


  if (marquee) {

    const original =
      marquee.innerHTML;

    marquee.innerHTML =
      original + original;

  }


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (!id || id === "#")
            return;

          const target =
            document.querySelector(id);

          if (!target)
            return;

          event.preventDefault();

          const header =
            document.querySelector(".site-header");

          const offset =
            header
              ? header.offsetHeight
              : 0;

          const position =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;

          window.scrollTo({

            top: position,
            behavior: "smooth"

          });

        }
      );

    });


  /* =========================================
     ACTIVE NAV
  ========================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(
      '.desktop-nav a[href^="#"]'
    );


  if (
    sections.length &&
    navLinks.length
  ) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting)
              return;

            navLinks.forEach(link => {

              link.classList.remove("active");

              if (
                link.getAttribute("href") ===
                `#${entry.target.id}`
              ) {

                link.classList.add("active");

              }

            });

          });

        },
        {
          threshold: 0.3
        }
      );


    sections.forEach(section => {

      navObserver.observe(section);

    });

  }


  /* =========================================
     PARALLAX
  ========================================= */

  if (
    window.matchMedia(
      "(min-width:769px) and (pointer:fine)"
    ).matches
  ) {

    const visuals =
      document.querySelectorAll(".visual");


    window.addEventListener(
      "scroll",
      () => {

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
              (progress - .5) * 20;

            visual.style.backgroundPosition =
              `center ${50 + movement}%`;

          }

        });

      },
      { passive: true }
    );

  }


  /* =========================================
     CHAPTER CARD TILT
  ========================================= */

  if (desktop.matches) {

    document
      .querySelectorAll(".chapter-card")
      .forEach(card => {

        const visual =
          card.querySelector(".visual");

        if (!visual)
          return;


        card.addEventListener(
          "mousemove",
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX - rect.left;

            const y =
              event.clientY - rect.top;

            const rotateX =
              ((y / rect.height) - .5) * -3;

            const rotateY =
              ((x / rect.width) - .5) * 3;

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

            visual.style.transform = "";

          }
        );

      });

  }


  /* =========================================
     FORM
  ========================================= */

  const form =
    document.querySelector(".project-form");


  if (form) {

    form.addEventListener(
      "submit",
      () => {

        const button =
          form.querySelector(".form-submit");

        if (!button)
          return;

        button.textContent =
          "SENDING...";

        button.disabled = true;

      }
    );

  }

});
