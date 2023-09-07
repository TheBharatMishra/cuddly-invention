import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#iamback"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const material = new THREE.MeshStandardMaterial({
  color: 0xfffff,
  wireframe: true,
});

/*
const material = new THREE.MeshBasicMaterial({
  color: 0xfffff,
  wireframe: true,
});
*/

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Adding Light

// const pointLight = new THREE.PointLight(0xff3ff);
const pointLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Light Helper
const lightHelper = new THREE.PointLightHelper(pointLight);
// Grid Helper
const gridHelper = new THREE.GridHelper(200, 50);

// Orbital Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Creating Star
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffa500 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

// Adding Stars
Array(200).fill().forEach(addStar);

// Loading Textures
const spaceTexture = new THREE.TextureLoader().load("space.png");

scene.background = spaceTexture;

// Adding more textures
const tysonTexture = new THREE.TextureLoader().load("mike-tyson-nod.gif");
const tyson = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: tysonTexture })
);
scene.add(tyson);

// Adding Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormalTexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 16, 16),
  new THREE.MeshStandardMaterial({
    // color: 0xfdff
    map: moonTexture,
    normalMap: moonNormalTexture,
  })
);
scene.add(moon);

scene.add(lightHelper, gridHelper);

camera.position.z = 25;

// Some stuff

const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y = +0.075;
  moon.rotation.z = +0.05;

  tyson.rotation.y = +0.05;
  tyson.rotation.x = +0.05;

  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
  camera.position.z = t * -0.01;
};

document.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  moon.position.z = 30;
  moon.position.setX(-10);
  // setTimeout(() => {
  //   tyson.position.x += 0.05;
  // }, 5000);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
