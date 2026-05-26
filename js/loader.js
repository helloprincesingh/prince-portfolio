/* LOADER */

window.addEventListener("load",()=>{

  const loader =
  document.querySelector(".loader-wrapper");

  setTimeout(()=>{

    if (loader) {
      loader.classList.add("fade");
    }

  },1200);

});