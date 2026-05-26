/* THREE JS BACKGROUND */

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(

  75,

  window.innerWidth /
  window.innerHeight,

  0.1,

  1000

);

const renderer =
new THREE.WebGLRenderer({

  alpha:true

});

/* SIZE */
renderer.setSize(

  window.innerWidth,

  window.innerHeight

);

const container =
document.getElementById(
  "three-container"
);

if (container) {

/* APPEND */
container.appendChild(
  renderer.domElement
);


/* GEOMETRY */
const geometry =
new THREE.BufferGeometry();

const vertices = [];

/* PARTICLES */
for(let i=0;i<5000;i++){

  vertices.push(

    (Math.random() - 0.5) * 2000

  );

  vertices.push(

    (Math.random() - 0.5) * 2000

  );

  vertices.push(

    (Math.random() - 0.5) * 2000

  );

}

/* POSITION */
geometry.setAttribute(

  "position",

  new THREE.Float32BufferAttribute(
    vertices,
    3
  )

);

/* MATERIAL */
const material =
new THREE.PointsMaterial({

  color:0x00ccff,

  size:2,

  transparent:true,

  opacity:0.8

});

/* POINTS */
const particles =
new THREE.Points(

  geometry,
  material

);

scene.add(particles);

/* CAMERA */
camera.position.z = 500;

/* ANIMATION */
function animate(){

  requestAnimationFrame(
    animate
  );

  particles.rotation.y += 0.0008;

  particles.rotation.x += 0.0003;

  renderer.render(
    scene,
    camera
  );

}

/* START */
animate();

/* RESIZE */
window.addEventListener(
  "resize",
  ()=>{

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

      window.innerWidth,

      window.innerHeight

    );

  }
);

}