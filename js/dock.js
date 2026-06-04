/* ACTIVE DOCK ITEM */

const dockItems =
document.querySelectorAll(
  ".dock-item"
);

/* CURRENT PAGE */
const currentPage =
window.location.pathname
.split("/")
.pop();

/* LOOP */
dockItems.forEach((item)=>{

  const href =
  item.getAttribute(
    "href"
  );

  if(href === currentPage){

    item.style.background =

    "linear-gradient(135deg,#7c3aed,#00ccff)";

    item.style.transform =

    "translateY(-10px)";

    item.style.boxShadow =

    "0 0 25px #7c3aed";

  }

});