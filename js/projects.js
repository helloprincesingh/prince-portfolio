/* 3D TILT EFFECT */

const tiltCards =
document.querySelectorAll(".project-card");

tiltCards.forEach((card)=>{

  card.addEventListener("mousemove",(e)=>{

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

    card.style.transform =
    `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
    `;

  });

  /* RESET */
  card.addEventListener("mouseleave",()=>{

    card.style.transform =
    `
    rotateX(0)
    rotateY(0)
    scale(1)
    `;

  });

});


/* PROJECT MODAL */

const projectCards =
document.querySelectorAll(".project-card");

const modal =
document.getElementById("projectModal");

const closeModal =
document.getElementById("closeModal");

const modalTitle =
document.getElementById("modalTitle");

const modalDescription =
document.getElementById("modalDescription");

const modalImage =
document.getElementById("modalImage");

const modalTech =
document.getElementById("modalTech");

/* OPEN MODAL */
projectCards.forEach((card)=>{

  card.addEventListener("click",()=>{

    const title =
    card.dataset.title;

    const description =
    card.dataset.description;

    const image =
    card.dataset.image;

    const tech =
    card.dataset.tech.split(",");

    modalTitle.textContent =
    title;

    modalDescription.textContent =
    description;

    modalImage.src =
    image;

    /* TECH TAGS */
    modalTech.innerHTML = "";

    tech.forEach((item)=>{

      const span =
      document.createElement("span");

      span.textContent = item;

      modalTech.appendChild(span);

    });

    /* SHOW */
    modal.classList.add("active");

  });

});

/* CLOSE */
if (closeModal) {
  closeModal.addEventListener("click",()=>{

    modal.classList.remove("active");

  });
}

/* OVERLAY CLOSE */
const modalOverlay =
document.querySelector(".modal-overlay");

if (modalOverlay) {
  modalOverlay.addEventListener("click",()=>{

    modal.classList.remove("active");

  });
}

