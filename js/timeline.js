/* TIMELINE ANIMATION */

const timelineItems =
document.querySelectorAll(
  ".timeline-item"
);

/* OBSERVER */
const observer =
new IntersectionObserver(

  (entries)=>{

    entries.forEach((entry)=>{

      if(entry.isIntersecting){

        entry.target.classList.add(
          "show"
        );

      }

    });

  },

  {
    threshold:0.2
  }

);

/* LOOP */
timelineItems.forEach((item)=>{

  observer.observe(item);

});