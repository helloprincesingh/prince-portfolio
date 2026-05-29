/* ======================================================
   3D TILT EFFECT + MODAL
====================================================== */

function setupCardEvents(card){

  /* 3D TILT */
  card.addEventListener(
    "mousemove",
    (e)=>{

      const rect =
      card.getBoundingClientRect();

      const x =
      e.clientX - rect.left;

      const y =
      e.clientY - rect.top;

      const centerX =
      rect.width / 2;

      const centerY =
      rect.height / 2;

      const rotateX =
      ((y - centerY) / 18);

      const rotateY =
      ((centerX - x) / 18);

      card.style.transform = `

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

        scale(1.03)

      `;

    }
  );

  /* RESET */
  card.addEventListener(
    "mouseleave",
    ()=>{

      card.style.transform = `

        rotateX(0)

        rotateY(0)

        scale(1)

      `;

    }
  );

  /* OPEN MODAL */
  card.addEventListener(
    "click",
    ()=>{

      const title =
      card.dataset.title || "";

      const description =
      card.dataset.description || "";

      const image =
      card.dataset.image || "";

      const techAttr =
      card.dataset.tech || "";

      const tech =
      techAttr.split(",");

      /* ELEMENTS */
      const modal =
      document.getElementById(
        "projectModal"
      );

      const modalTitle =
      document.getElementById(
        "modalTitle"
      );

      const modalDescription =
      document.getElementById(
        "modalDescription"
      );

      const modalImage =
      document.getElementById(
        "modalImage"
      );

      const modalTech =
      document.getElementById(
        "modalTech"
      );

      /* SET */
      modalTitle.textContent =
      title;

      modalDescription.textContent =
      description;

      modalImage.src =
      image;

      /* TECH */
      modalTech.innerHTML = "";

      tech.forEach((item)=>{

        if(!item.trim()) return;

        const span =
        document.createElement(
          "span"
        );

        span.textContent =
        item.trim();

        modalTech.appendChild(
          span
        );

      });

      /* SHOW */
      modal.classList.add(
        "active"
      );

    }
  );

}

/* ======================================================
   CLOSE MODAL
====================================================== */

const closeModal =
document.getElementById(
  "closeModal"
);

if(closeModal){

  closeModal.addEventListener(
    "click",
    ()=>{

      document
      .getElementById(
        "projectModal"
      )
      .classList.remove(
        "active"
      );

    }
  );

}

const modalOverlay =
document.querySelector(
  ".modal-overlay"
);

if(modalOverlay){

  modalOverlay.addEventListener(
    "click",
    ()=>{

      document
      .getElementById(
        "projectModal"
      )
      .classList.remove(
        "active"
      );

    }
  );

}

/* ======================================================
   LOAD PROJECTS
====================================================== */

async function loadProjects(){

  const container =
  document.getElementById(
    "projects-container"
  );

  if(!container) return;

  /* CLEAR */
  container.innerHTML = "";

  /* NO SUPABASE */
  if(

    typeof supabaseClient ===
    "undefined"

  ){

    console.warn(
      "Supabase not found"
    );

    return;

  }

  try{

    /* FETCH */
    const {

      data,

      error

    } = await supabaseClient

    .from("projects")

    .select("*")

    .order(
      "id",
      {
        ascending:false
      }
    );

    /* ERROR */
    if(error){

      console.log(error);

      return;

    }

    /* EMPTY */
    if(!data || data.length === 0){

      container.innerHTML = `

        <p class="empty-projects">

          No projects found.

        </p>

      `;

      return;

    }

    /* LOOP */
    data.forEach((project)=>{

      const card =
      document.createElement(
        "div"
      );

      /* CATEGORY */
      const category =

      project.category ||

      "web";

      /* CLASS */
      card.className =
      "project-card";

      /* DATA */
      card.dataset.category =
      category;

      card.dataset.title =
      project.title || "";

      card.dataset.description =
      project.description || "";

      card.dataset.image =
      project.image || "";

      card.dataset.tech =
      project.tech || "";

      /* TECH */
      const techStackHTML =

      (project.tech || "")

      .split(",")

      .filter(
        t => t.trim() !== ""
      )

      .map(
        t => `
          <span>
            ${t.trim()}
          </span>
        `
      )

      .join("");

      /* HTML */
      card.innerHTML = `

        <!-- IMAGE -->
        <div class="project-image">

          <img
            src="${
              project.image ||

              "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            }"

            alt="${
              project.title ||
              "project"
            }"
          >

        </div>

        <!-- CONTENT -->
        <div class="project-content">

          <h2>
            ${project.title || ""}
          </h2>

          <p>
            ${project.description || ""}
          </p>

          <!-- TECH -->
          <div class="tech-stack">

            ${techStackHTML}

          </div>

          <!-- BUTTONS -->
          <div class="project-buttons">

            ${
              project.live ?

              `

              <a
                href="${project.live}"

                target="_blank"

                class="btn"
              >

                <i class="fa-solid fa-arrow-up-right-from-square"></i>

                Live Demo

              </a>

              `

              : ""

            }

            ${
              project.github ?

              `

              <a
                href="${project.github}"

                target="_blank"

                class="icon-btn"
              >

                <i class="fa-brands fa-github"></i>

              </a>

              `

              : ""

            }

          </div>

        </div>

      `;

      /* APPEND */
      container.appendChild(
        card
      );

      /* EVENTS */
      setupCardEvents(
        card
      );

    });

    /* IMPORTANT */
    initFilters();

  }

  catch(err){

    console.log(err);

  }

}

/* ======================================================
   FILTER SYSTEM
====================================================== */

function initFilters(){

  const filterButtons =

  document.querySelectorAll(
    ".filter-btn"
  );

  filterButtons.forEach((button)=>{

    button.addEventListener(
      "click",
      ()=>{

        /* ACTIVE */
        filterButtons.forEach(
          (btn)=>{

            btn.classList.remove(
              "active"
            );

          }
        );

        button.classList.add(
          "active"
        );

        /* FILTER */
        const filter =
        button.dataset.filter;

        /* IMPORTANT */
        const projectCards =

        document.querySelectorAll(
          ".project-card"
        );

        /* LOOP */
        projectCards.forEach(
          (card)=>{

            const category =

            card.dataset.category;

            if(

              filter === "all" ||

              category === filter

            ){

              card.classList.remove(
                "hide"
              );

            }

            else{

              card.classList.add(
                "hide"
              );

            }

          }
        );

      }
    );

  });

}

/* ======================================================
   START
====================================================== */

loadProjects();