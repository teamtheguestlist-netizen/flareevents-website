/* =========================================================
   FLARE — GLOBAL JAVASCRIPT
   Menu + Loader + Scroll Reveal + Smooth UX
========================================================= */

(() => {

  "use strict";


  /* =======================================================
     DOM READY
  ======================================================= */

  document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initMobileMenu();
    initScrollReveal();
    initSmoothAnchors();
    initHeaderScroll();
    initExternalLinks();

  });


  /* =======================================================
     PAGE LOADER
  ======================================================= */

  function initLoader(){

    const loader =
      document.querySelector(".flare-page-loader");

    if(!loader) return;


    const hideLoader = () => {

      loader.classList.add("is-hidden");
document.body.classList.add("loader-finished");
      setTimeout(() => {

        loader.remove();

      }, 1000);

    };


    /*
      Give the logo animation enough time to play.
      But never leave the user stuck on the loader.
    */

    if(document.readyState === "complete"){

      setTimeout(hideLoader, 900);

    }else{

      window.addEventListener(
        "load",
        () => {

          setTimeout(hideLoader, 500);

        },
        {once:true}
      );

    }


    /*
      Absolute fallback.
    */

    setTimeout(hideLoader, 3000);

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function initMobileMenu(){

    const menuButton =
      document.getElementById("menuToggle");

    const mobileMenu =
      document.getElementById("mobileMenu");


    if(!menuButton || !mobileMenu) return;


    const mobileLinks =
      mobileMenu.querySelectorAll(
        ".mobile-navigation a"
      );


    function openMenu(){

      document.body.classList.add("menu-open");

      menuButton.classList.add("active");

      menuButton.setAttribute(
        "aria-expanded",
        "true"
      );

      menuButton.setAttribute(
        "aria-label",
        "Close menu"
      );


      mobileMenu.classList.add("active");

      mobileMenu.setAttribute(
        "aria-hidden",
        "false"
      );

    }


    function closeMenu(){

      document.body.classList.remove("menu-open");

      menuButton.classList.remove("active");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open menu"
      );


      mobileMenu.classList.remove("active");

      mobileMenu.setAttribute(
        "aria-hidden",
        "true"
      );

    }


    function toggleMenu(){

      const isOpen =
        mobileMenu.classList.contains("active");

      if(isOpen){

        closeMenu();

      }else{

        openMenu();

      }

    }


    menuButton.addEventListener(
      "click",
      toggleMenu
    );


    /*
      Close menu when a navigation link is clicked.
    */

    mobileLinks.forEach(link => {

      link.addEventListener(
        "click",
        () => {

          closeMenu();

        }
      );

    });


    /*
      ESC closes menu.
    */

    document.addEventListener(
      "keydown",
      event => {

        if(
          event.key === "Escape" &&
          mobileMenu.classList.contains("active")
        ){

          closeMenu();

          menuButton.focus();

        }

      }
    );


    /*
      Clicking outside the actual menu content
      closes it.
    */

    mobileMenu.addEventListener(
      "click",
      event => {

        if(
          event.target === mobileMenu
        ){

          closeMenu();

        }

      }
    );


    /*
      If screen becomes desktop width,
      force menu closed.
    */

    window.addEventListener(
      "resize",
      () => {

        if(window.innerWidth > 1100){

          closeMenu();

        }

      }
    );

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  function initScrollReveal(){

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    if(!revealElements.length) return;


    /*
      If browser doesn't support IntersectionObserver,
      simply show everything.
    */

    if(
      !("IntersectionObserver" in window)
    ){

      revealElements.forEach(
        element => {

          element.classList.add(
            "visible"
          );

        }
      );

      return;

    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if(
              entry.isIntersecting
            ){

              entry.target.classList.add(
                "visible"
              );

              /*
                Once revealed, stop observing.
                This prevents unnecessary work.
              */

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          root:null,

          /*
            Animation starts slightly before
            the element reaches the viewport.
          */

          rootMargin:
            "0px 0px -8% 0px",

          threshold:.08
        }
      );


    revealElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR LINKS
  ======================================================= */

  function initSmoothAnchors(){

    const anchorLinks =
      document.querySelectorAll(
        'a[href^="#"]'
      );


    anchorLinks.forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const href =
            link.getAttribute("href");


          if(
            !href ||
            href === "#"
          ){

            return;

          }


          const target =
            document.querySelector(
              href
            );


          if(!target) return;


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
            target.getBoundingClientRect().top
            +
            window.scrollY
            -
            headerHeight
            -
            15;


          window.scrollTo({

            top:
              Math.max(
                0,
                targetPosition
              ),

            behavior:
              "smooth"

          });


          /*
            Update URL without forcing
            a page reload.
          */

          try{

            history.pushState(
              null,
              "",
              href
            );

          }catch(error){

            /*
              Ignore browsers that don't
              allow history updates.
            */

          }

        }
      );

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
  ======================================================= */

  function initHeaderScroll(){

    const header =
      document.querySelector(
        ".site-header"
      );


    if(!header) return;


    let ticking = false;


    function updateHeader(){

      const scrollY =
        window.scrollY;


      if(scrollY > 20){

        header.classList.add(
          "is-scrolled"
        );

      }else{

        header.classList.remove(
          "is-scrolled"
        );

      }


      ticking = false;

    }


    window.addEventListener(
      "scroll",
      () => {

        if(!ticking){

          window.requestAnimationFrame(
            updateHeader
          );

          ticking = true;

        }

      },
      {
        passive:true
      }
    );


    updateHeader();

  }


  /* =======================================================
     EXTERNAL SOCIAL LINKS
  ======================================================= */

  function initExternalLinks(){

    const externalLinks =
      document.querySelectorAll(
        'a[target="_blank"]'
      );


    externalLinks.forEach(link => {

      link.addEventListener(
        "click",
        () => {

          /*
            Intentionally empty.
            This gives us one central place
            to add analytics later.
          */

        }
      );

    });

  }


})();
