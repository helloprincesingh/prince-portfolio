/* SCENE */
const threeScene =
new THREE.Scene();

/* CAMERA */
const camera =
new THREE.PerspectiveCamera(

  75,

  window.innerWidth /
  window.innerHeight,

  0.1,

  2000

);

/* RENDERER */
const renderer =
new THREE.WebGLRenderer({

  alpha:true,
  antialias:true

});

/* SIZE */
renderer.setSize(

  window.innerWidth,
  window.innerHeight

);

/* PIXEL */
renderer.setPixelRatio(window.devicePixelRatio);
// Set background color and fog for depth
renderer.setClearColor(0x0d0d1a);
threeScene.fog = new THREE.FogExp2(0x0d0d1a, 0.001);
const bgTexture = new THREE.TextureLoader().load('./images/galaxy_texture.png');
threeScene.background = bgTexture;

/* APPEND */
document
.getElementById(
  "three-container"
)
.appendChild(
  renderer.domElement
);

/* GEOMETRY */
const geometry =
new THREE.BufferGeometry();

/* COUNT */
const count = 7000;

/* POSITIONS */
const positions =
new Float32Array(
  count * 3
);

/* COLORS */
const particleColors =
new Float32Array(
  count * 3
);

/* COLOR */
const color =
new THREE.Color();

/* CREATE PARTICLES */
for(let i=0;i<count;i++){

  const i3 = i * 3;

  /* POSITION */
  positions[i3] =
  (Math.random()-0.5) * 2000;

  positions[i3 + 1] =
  (Math.random()-0.5) * 2000;

  positions[i3 + 2] =
  (Math.random()-0.5) * 2000;

  /* COLOR */
  color.setHSL(

    Math.random(),

    1,

    0.7

  );

  particleColors[i3] =
  color.r;

  particleColors[i3 + 1] =
  color.g;

  particleColors[i3 + 2] =
  color.b;

}

/* SET */
geometry.setAttribute(

  "position",

  new THREE.BufferAttribute(
    positions,
    3
  )

);

geometry.setAttribute(

  "color",

  new THREE.BufferAttribute(
    particleColors,
    3
  )

);

/* MATERIAL */
const material =
new THREE.PointsMaterial({

  size:2,

  vertexColors:true,

  transparent:true,

  opacity:0.9,

  blending:
  THREE.AdditiveBlending

});

/* PARTICLES */
const particles =
new THREE.Points(

  geometry,
  material

);

threeScene.add(particles);

/* CAMERA */
camera.position.z = 400;

/* MOUSE */
let mouseX = 0;
let mouseY = 0;

/* MOVE */
document.addEventListener(
  "mousemove",
  (e)=>{

    mouseX =
    (e.clientX /
    window.innerWidth) - 0.5;

    mouseY =
    (e.clientY /
    window.innerHeight) - 0.5;

  }
);

/* CLOCK */
const clock =
new THREE.Clock();

/* ANIMATE */
function animate(){

  requestAnimationFrame(
    animate
  );

  const elapsed =
  clock.getElapsedTime();

  /* ROTATION */
  particles.rotation.y =
  elapsed * 0.05;

  particles.rotation.x =
  elapsed * 0.02;

  /* MOUSE PARALLAX */
  camera.position.x +=
  (mouseX * 80 -
  camera.position.x) * 0.03;

  camera.position.y +=
  (-mouseY * 80 -
  camera.position.y) * 0.03;

  camera.lookAt(threeScene.position);

  renderer.render(
    threeScene,
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