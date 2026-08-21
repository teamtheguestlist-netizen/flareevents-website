/* =========================================
   FLARE — INTERACTIONS
========================================= */


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (event) {

  if (!cursor) return;

  cursor.style.transform =
    `translate(${event.clientX - 6}px, ${event.clientY - 6}px)`;

});


/* =========================================
   SCROLL REVEAL
========================================= */

const observer = new IntersectionObserver(

  function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


document
  .querySelectorAll(".reveal")
  .forEach(function (element) {

    observer.observe(element);

  });


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener(
  "scroll",
  function () {

    if (window.scrollY > 40) {

      navbar.style.background =
        "rgba(8,8,8,0.92)";

    } else {

      navbar.style.background =
        "rgba(8,8,8,0.72)";

    }

  },
  {
    passive: true
  }
);


/* =========================================
   MOBILE MENU
========================================= */

const mobileMenu =
  document.querySelector(".mobile-menu");

const navigation =
  document.querySelector(".nav-links");


if (mobileMenu) {

  mobileMenu.addEventListener(
    "click",
    function () {

      const isOpen =
        document.body.classList.toggle("menu-open");


      if (isOpen) {

        navigation.style.display = "flex";

        navigation.style.position = "fixed";

        navigation.style.inset = "70px 0 0";

        navigation.style.background = "#080808";

        navigation.style.flexDirection = "column";

        navigation.style.padding = "40px 6vw";

        navigation.style.gap = "25px";

        navigation.style.zIndex = "90";

      } else {

        navigation.removeAttribute("style");

      }

    }
  );

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

document
  .querySelectorAll(".nav-links a")
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        document.body.classList.remove(
          "menu-open"
        );

        navigation.removeAttribute("style");

      }
    );

  });


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetID =
          link.getAttribute("href");

        const target =
          document.querySelector(targetID);


        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================
   BUTTON HOVER
========================================= */

document
  .querySelectorAll(
    ".primary-button, .contact-button, .nav-button"
  )
  .forEach(function (button) {

    button.addEventListener(
      "mouseenter",
      function () {

        if (cursor) {

          cursor.style.transform +=
            " scale(3)";

        }

      }
    );

    button.addEventListener(
      "mouseleave",
      function () {

        if (cursor) {

          cursor.style.transform =
            cursor.style.transform.replace(
              " scale(3)",
              ""
            );

        }

      }
    );

  });
