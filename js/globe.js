/* CONTAINER */
const container = document.getElementById("globe-container");
const width = container.clientWidth;
const height = container.clientHeight || 500;

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  45,
  width / height,
  0.1,
  1000
);
camera.position.z = 13;

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

/* LIGHTING */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xa855f7, 2);
dirLight1.position.set(5, 5, 5);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.5);
dirLight2.position.set(-5, -5, -5);
scene.add(dirLight2);

/* GLOBE GROUP */
const globeGroup = new THREE.Group();
scene.add(globeGroup);

/* LAYER 1: INNER SOLID REFLECTIVE SPHERE */
const innerGeo = new THREE.SphereGeometry(4.8, 64, 64);
const innerMat = new THREE.MeshPhysicalMaterial({
  color: 0x070a13,
  roughness: 0.1,
  metalness: 0.1,
  transparent: true,
  opacity: 0.75,
  transmission: 0.5,
  ior: 1.2
});
const innerSphere = new THREE.Mesh(innerGeo, innerMat);
globeGroup.add(innerSphere);

/* LAYER 2: OUTER WIREFRAME GLOBE */
const outerGeo = new THREE.SphereGeometry(5, 36, 36);
const outerMat = new THREE.MeshStandardMaterial({
  color: 0x8b5cf6,
  emissive: 0x7c3aed,
  emissiveIntensity: 0.4,
  wireframe: true,
  transparent: true,
  opacity: 0.25
});
const outerGlobe = new THREE.Mesh(outerGeo, outerMat);
globeGroup.add(outerGlobe);

/* LAYER 3: CONSTELLATION POINTS (CITY GLOWS) */
const pointsCount = 450;
const pointsGeo = new THREE.BufferGeometry();
const pointsPositions = new Float32Array(pointsCount * 3);
const radius = 5.03;

for (let i = 0; i < pointsCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos((Math.random() * 2) - 1);
  
  pointsPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
  pointsPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
  pointsPositions[i * 3 + 2] = radius * Math.cos(phi);
}
pointsGeo.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));

const pointsMat = new THREE.PointsMaterial({
  color: 0xa855f7,
  size: 0.12,
  transparent: true,
  opacity: 0.95,
  blending: THREE.AdditiveBlending
});
const nodePoints = new THREE.Points(pointsGeo, pointsMat);
globeGroup.add(nodePoints);

/* LAYER 4: DYNAMIC CURVED CONNECTION ARCS */
const arcsGroup = new THREE.Group();
globeGroup.add(arcsGroup);

function createArc(p1, p2, color) {
  const points = [];
  const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  const distance = p1.distanceTo(p2);
  
  midPoint.normalize().multiplyScalar(5 + distance * 0.3);
  
  const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
  const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
  
  const curveMat = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  
  return new THREE.Line(curveGeo, curveMat);
}

// Generate premium network paths
const arcCoordinates = [];
for (let i = 0; i < 10; i++) {
  const theta1 = Math.random() * Math.PI * 2;
  const phi1 = Math.acos((Math.random() * 2) - 1);
  const p1 = new THREE.Vector3(
    5 * Math.sin(phi1) * Math.cos(theta1),
    5 * Math.sin(phi1) * Math.sin(theta1),
    5 * Math.cos(phi1)
  );
  
  const theta2 = Math.random() * Math.PI * 2;
  const phi2 = Math.acos((Math.random() * 2) - 1);
  const p2 = new THREE.Vector3(
    5 * Math.sin(phi2) * Math.cos(theta2),
    5 * Math.sin(phi2) * Math.sin(theta2),
    5 * Math.cos(phi2)
  );
  
  const color = Math.random() > 0.5 ? 0x06b6d4 : 0xa855f7;
  const arc = createArc(p1, p2, color);
  arcsGroup.add(arc);
}

/* STARS SPACE */
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 1000; i++) {
  starVertices.push((Math.random() - 0.5) * 600);
  starVertices.push((Math.random() - 0.5) * 600);
  starVertices.push((Math.random() - 0.5) * 600);
}
starGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(starVertices), 3));

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.4,
  transparent: true,
  opacity: 0.5
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

/* HOVER RING AURA */
const ringGeo = new THREE.TorusGeometry(6.6, 0.06, 16, 120);
const ringMat = new THREE.MeshBasicMaterial({
  color: 0x8b5cf6,
  transparent: true,
  opacity: 0.18,
  blending: THREE.AdditiveBlending,
  toneMapped: false
});
const ringGlow = new THREE.Mesh(ringGeo, ringMat);
ringGlow.rotation.x = Math.PI / 2;
ringGlow.position.y = 0;
scene.add(ringGlow);

function isLightTheme() {
  return document.body.classList.contains("light");
}

function updateGlobeTheme() {
  const light = isLightTheme();

  ambientLight.color.setHex(light ? 0x111827 : 0xffffff);
  ambientLight.intensity = light ? 0.75 : 0.4;

  dirLight1.color.setHex(light ? 0x93c5fd : 0xa855f7);
  dirLight1.intensity = light ? 1.2 : 2;

  dirLight2.color.setHex(light ? 0x38bdf8 : 0x06b6d4);
  dirLight2.intensity = light ? 1 : 1.5;

  innerMat.color.setHex(light ? 0xe2e8f0 : 0x070a13);
  innerMat.roughness = light ? 0.4 : 0.1;
  innerMat.opacity = light ? 0.9 : 0.75;
  innerMat.transmission = light ? 0.2 : 0.5;
  innerMat.needsUpdate = true;

  outerMat.color.setHex(light ? 0x6366f1 : 0x8b5cf6);
  outerMat.emissive.setHex(light ? 0x93c5fd : 0x7c3aed);
  outerMat.opacity = light ? 0.3 : 0.25;
  outerMat.needsUpdate = true;

  pointsMat.color.setHex(light ? 0x2563eb : 0xa855f7);
  pointsMat.opacity = light ? 0.8 : 0.95;
  pointsMat.needsUpdate = true;

  ringMat.color.setHex(light ? 0x2563eb : 0x8b5cf6);
  ringMat.opacity = light ? 0.12 : 0.18;
  ringMat.needsUpdate = true;

  starMaterial.color.setHex(light ? 0x1e293b : 0xffffff);
  starMaterial.opacity = light ? 0.35 : 0.5;
  starMaterial.needsUpdate = true;
}

updateGlobeTheme();

const themeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.attributeName === "class") {
      updateGlobeTheme();
      break;
    }
  }
});

themeObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

/* DRAG TO ROTATE (BULLETPROOF PHYSICS DAMPING) */
let targetRotationX = 0.5;
let targetRotationY = 0.5;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  previousMousePosition = {
    x: e.clientX,
    y: e.clientY
  };
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - previousMousePosition.x;
  const deltaY = e.clientY - previousMousePosition.y;
  
  targetRotationY += deltaX * 0.005;
  targetRotationX += deltaY * 0.005;
  
  previousMousePosition = {
    x: e.clientX,
    y: e.clientY
  };
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

/* MOBILE TOUCH GESTURES */
container.addEventListener('touchstart', (e) => {
  isDragging = true;
  const touch = e.touches[0];
  previousMousePosition = {
    x: touch.clientX,
    y: touch.clientY
  };
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  
  const deltaX = touch.clientX - previousMousePosition.x;
  const deltaY = touch.clientY - previousMousePosition.y;
  
  targetRotationY += deltaX * 0.006;
  targetRotationX += deltaY * 0.006;
  
  previousMousePosition = {
    x: touch.clientX,
    y: touch.clientY
  };
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

/* ANIMATION LOOP */
function animate() {
  requestAnimationFrame(animate);
  
  // Smoothly ease rotations with physics damping
  globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
  globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;
  
  // Continuous auto-rotation when user is idle
  if (!isDragging) {
    targetRotationY += 0.001;
  }
  
  // Parallax layers spin
  outerGlobe.rotation.y += 0.0002;
  nodePoints.rotation.y -= 0.0001;
  arcsGroup.rotation.y += 0.0004;
  ringGlow.rotation.z += 0.00035;
  
  renderer.render(scene, camera);
}

animate();

/* FLUID RESIZE */
window.addEventListener("resize", () => {
  const w = container.clientWidth;
  const h = container.clientHeight || 500;
  
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  
  renderer.setSize(w, h);
});