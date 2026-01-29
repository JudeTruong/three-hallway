import * as THREE from 'three';
import { PlayerControls } from './classes/PlayerControls.js';

/* Scene */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

/* Camera */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 5);

/* Renderer */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* Lights */
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

/* Floor */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000),
  new THREE.MeshStandardMaterial({ color: 0x4caf50 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

/* Cube (reference object) */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(12, 13, 12),
  new THREE.MeshStandardMaterial({ color: 0xF54927 })
);
cube.position.set(0, 1, -5);
scene.add(cube);

/* Player */
const player = new PlayerControls(camera, document.body, scene);

/* Resize */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});





/* Loop */
function animate() {
  requestAnimationFrame(animate);

  player.update();
  cube.rotation.y += 0.05;
  cube.rotation.x += 0.05;
  

  renderer.render(scene, camera);
}

animate();
