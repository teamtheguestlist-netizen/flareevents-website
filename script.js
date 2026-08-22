document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     FLARE — GLOBAL SCRIPT
     Loader / transitions / mobile menu / cursor / reveal
  ========================================================= */

  const body = document.body;
  const header = document.querySelector(".site-header");


  /* =========================================================
     GLOBAL PAGE LOADER
     Creates the loader automatically if a page doesn't
     contain loader HTML.
  ========================================================= */

  let flareLoader = document.querySelector(".flare-page-loader");

  if (!flareLoader) {

    flareLoader = document.createElement("div");

    flareLoader.className = "flare-page-loader";

    flareLoader.innerHTML = `
      <img src="flare-logo.png" alt="FLARE">
      <div class="flare-loader-line"></div>
    `;

    body.prepend(flareLoader);
  }

  body.classList.add("flare-loading");


  const finishLoader = () => {

    body.classList.remove("flare-loading");

    body.classList.add("flare-ready");

    if (flareLoader) {

      flareLoader.classList.add("is-hidden");

      window.setTimeout(() => {

        if (flareLoader) {
          flareLoader.remove();
        }

      }, 850);
    }
  };


  if (document.readyState === "complete") {

    window.setTimeout(
      finishLoader,
      950
    );

  } else {

    window.addEventListener(
      "load",
      () => {

        window.setTimeout(
          finishLoader,
          950
        );

      },
      { once: true }
    );
  }


  /* =========================================================
     MOBILE MENU
     Automatically creates the same menu on every page.
  ========================================================= */

  const menuButton =
    document.querySelector(".menu-button");

  let mobileMenu =
    document.querySelector(".mobile-menu");


  if (
    menuButton &&
    !mobileMenu
  ) {

    mobileMenu =
      document.createElement("div");

    mobileMenu.className =
      "mobile-menu";

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );


    const desktopLinks =
      Array.from(
        document.querySelectorAll(
          ".desktop-nav a"
        )
      );


    const linksHTML =
      desktopLinks
        .map((link, index) => {

          const href =
            link.getAttribute("href") || "#";

          const label =
            link.textContent
              .trim()
              .replace("↗", "")
              .trim();


          return `
            <a href="${href}">
              <span>0${index + 1}</span>
              <strong>${label}</strong>
              <i>↗</i>
            </a>
          `;

        })
        .join("");


    mobileMenu.innerHTML = `

      <div class="mobile-menu-inner">

        <div class="mobile-menu-top">

          <span>FLARE / MENU</span>

          <span>
            EVENTS · INFLUENCE · EXPERIENCES
          </span>

        </div>


        <nav
          class="mobile-navigation"
          aria-label="Mobile navigation"
        >

          ${linksHTML}

        </nav>


        <div class="mobile-menu-footer">

          <span>FLARE</span>

          <span>© 2026</span>

        </div>

      </div>

    `;


    body.appendChild(
      mobileMenu
    );
  }


  const mobileLinks =
    mobileMenu
      ? mobileMenu.querySelectorAll(
          ".mobile-navigation a"
        )
      : [];


  /* =========================================================
     CLOSE MENU
  ========================================================= */

  const closeMenu = () => {

    if (
      !menuButton ||
      !mobileMenu
    ) {
      return;
    }


    menuButton.classList.remove(
      "active"
    );


    mobileMenu.classList.remove(
      "open"
    );


    body.classList.remove(
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
  };


  /* =========================================================
     OPEN MENU
  ========================================================= */

  const openMenu = () => {

    if (
      !menuButton ||
      !mobileMenu
    ) {
      return;
    }


    menuButton.classList.add(
      "active"
    );


    mobileMenu.classList.add(
      "open"
    );


    body.classList.add(
      "menu-open"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );


    menuButton.setAttribute(
      "aria-label",
      "Close menu"
    );


    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );
  };


  /* =========================================================
     MENU BUTTON
  ========================================================= */

  if (
    menuButton &&
    mobileMenu
  ) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );


    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );


    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          menuButton.classList.contains(
            "active"
          );


        if (isOpen) {

          closeMenu();

        } else {

          openMenu();

        }

      }
    );


    mobileLinks.forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            closeMenu();

          }
        );

      }
    );
  }


  /* =========================================================
     ESCAPE CLOSE
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeMenu();

      }

    }
  );


  /* =========================================================
     PAGE TO PAGE TRANSITIONS
  ========================================================= */

  document
    .querySelectorAll("a[href]")
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const href =
            link.getAttribute(
              "href"
            );


          if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            link.target === "_blank" ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          ) {

            return;

          }


          let url;


          try {

            url =
              new URL(
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
            url.search ===
              window.location.search
          ) {

            return;

          }


          if (!flareLoader) {

            return;

          }


          event.preventDefault();


          closeMenu();


          body.classList.remove(
            "flare-ready"
          );


          body.classList.add(
            "flare-loading"
          );


          flareLoader.classList.remove(
            "is-hidden"
          );


          window.setTimeout(
            () => {

              window.location.href =
                url.href;

            },
            500
          );

        }
      );

    });


  /* =========================================================
     CUSTOM CURSOR
  ========================================================= */

  const cursor =
    document.querySelector(
      ".cursor-dot"
    );


  const finePointer =
    window.matchMedia(
      "(pointer:fine)"
    );


  if (
    cursor &&
    finePointer.matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
      "mousemove",
      event => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      {
        passive: true
      }
    );


    const animateCursor =
      () => {

        currentX +=
          (mouseX - currentX) *
          0.18;


        currentY +=
          (mouseY - currentY) *
          0.18;


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


    interactiveElements.forEach(
      element => {

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

    magneticElements.forEach(
      element => {

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
              `translate(
                ${x * 0.08}px,
                ${y * 0.08}px
              )`;

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            element.style.transform =
              "";

          }
        );

      }
    );
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
          `translate(
            ${x * 0.18}px,
            ${y * 0.18}px
          ) scale(1.05)`;

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

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );
  }


  /* =========================================================
     SMOOTH ANCHOR LINKS
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      link => {

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


            if (!target) {

              return;

            }


            event.preventDefault();


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


            history.replaceState(
              null,
              "",
              targetID
            );

          }
        );

      }
    );


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

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              navLinks.forEach(
                link => {

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

                }
              );

            }
          );

        },
        {
          threshold: 0.35
        }
      );


    sections.forEach(
      section => {

        sectionObserver.observe(
          section
        );

      }
    );
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

    let ticking =
      false;


    const updateParallax =
      () => {

        visuals.forEach(
          visual => {

            const rect =
              visual.getBoundingClientRect();


            if (
              rect.top <
                window.innerHeight &&
              rect.bottom >
                0
            ) {

              const progress =
                (
                  window.innerHeight -
                  rect.top
                ) /
                (
                  window.innerHeight +
                  rect.height
                );


              const movement =
                (
                  progress -
                  0.5
                ) * 12;


              visual.style.backgroundPosition =
                `center ${50 + movement}%`;

            }

          }
        );


        ticking =
          false;

      };


    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          requestAnimationFrame(
            updateParallax
          );

          ticking =
            true;

        }

      },
      {
        passive: true
      }
    );

  }


  /* =========================================================
     HEADER SCROLL STATE
  ========================================================= */

  if (header) {

    const updateHeader =
      () => {

        if (
          window.scrollY > 40
        ) {

          header.classList.add(
            "scrolled"
          );

        } else {

          header.classList.remove(
            "scrolled"
          );

        }

      };


    updateHeader();


    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );

  }


  /* =========================================================
     IMAGE FALLBACK
  ========================================================= */

  document
    .querySelectorAll("img")
    .forEach(
      image => {

        image.addEventListener(
          "error",
          () => {

            image.style.visibility =
              "hidden";

          }
        );

      }
    );


  /* =========================================================
     IMAGE REVEAL
  ========================================================= */

  document
    .querySelectorAll(
      ".image-reveal"
    )
    .forEach(
      image => {

        if (image.complete) {

          image.classList.add(
            "loaded"
          );

          return;

        }


        image.addEventListener(
          "load",
          () => {

            image.classList.add(
              "loaded"
            );

          }
        );

      }
    );

});
