




/* PAGE TRANSITION */

const transition =
document.querySelector(
  ".page-transition"
);

/* ALL LINKS */
const links =
document.querySelectorAll("a");

/* CLICK */
links.forEach((link)=>{

  link.addEventListener("click",(e)=>{

    const href =
    link.getAttribute("href");

    /* IGNORE EMPTY, EXTERNAL, DOWNLOAD, OR NEW-TAB LINKS */
    if(
      href &&
      !href.startsWith("#") &&
      !href.startsWith("http") &&
      !link.hasAttribute("download") &&
      link.getAttribute("target") !== "_blank"
    ){

      e.preventDefault();

      if (transition) {
        transition.classList.add("active");
      }

      setTimeout(()=>{

        window.location.href =
        href;

      },500);

    }

  });

});