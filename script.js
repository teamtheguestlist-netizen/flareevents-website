document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

      menuButton.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.classList.toggle("menu-open");

    });

    mobileLinks.forEach(link => {

      link.addEventListener("click", () => {

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

      });

    });

  }


  /* =========================
     CUSTOM DESKTOP CURSOR
  ========================= */

  const cursor = document.querySelector(".cursor-dot");

  if (cursor && window.matchMedia("(pointer:fine)").matches) {

    window.addEventListener("mousemove", event => {

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

    });

    const interactive = document.querySelectorAll(
      "a, button, .service-card, .chapter-card"
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


  /* =========================
     DESKTOP MAGNETIC CIRCLE
  ========================= */

  const magneticCircle = document.querySelector(".magnetic-circle");

  if (
    magneticCircle &&
    window.matchMedia("(min-width:1101px) and (pointer:fine)").matches
  ) {

    magneticCircle.addEventListener("mousemove", event => {

      const rect = magneticCircle.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      magneticCircle.style.transform =
        `translate(${x * .2}px, ${y * .2}px) scale(1.05)`;

    });

    magneticCircle.addEventListener("mouseleave", () => {

      magneticCircle.style.transform = "translate(0,0) scale(1)";

    });

  }


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(
    ".service-card, .chapter-card, .capability-list > div, .principle-list > div"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: .12
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* =========================
     PARALLAX VISUALS
  ========================= */

  const visuals = document.querySelectorAll(".visual");

  if (window.matchMedia("(min-width:769px)").matches) {

    window.addEventListener("scroll", () => {

      visuals.forEach(visual => {

        const rect = visual.getBoundingClientRect();

        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {

          const progress =
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);

          const movement = (progress - .5) * 25;

          visual.style.backgroundPosition =
            `center ${50 + movement}%`;

        }

      });

    });

  }


  /* =========================
     SMOOTH ANCHOR LINKS
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetID = link.getAttribute("href");

      if (targetID === "#") return;

      const target = document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================
     FORM
  ========================= */

  const form = document.querySelector(".project-form");

  if (form) {

    form.addEventListener("submit", event => {

      const button = form.querySelector(".form-submit");

      if (button) {

        button.textContent = "SENDING...";
        button.disabled = true;

      }

    });

  }


  /* =========================
     ACTIVE SECTION
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');

  if (sections.length && navLinks.length) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navLinks.forEach(link => {

              link.classList.remove("active");

              if (
                link.getAttribute("href") ===
                `#${entry.target.id}`
              ) {
                link.classList.add("active");
              }

            });

          }

        });

      },
      {
        threshold: .4
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

});
