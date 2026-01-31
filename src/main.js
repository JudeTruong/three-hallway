import * as THREE from 'three';
import { PlayerControls } from './player/PlayerControls.js';

import { Floor } from './core/floor.js';
import { Sky } from './core/sky.js';
import { SpeechBubble } from '../public/models/speechBubble.js';
import { PictureFrame } from '../public/models/picture.js';

/* ================= SCENE ================= */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe9d7);

/* ================= CAMERA ================= */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 5);

/* ================= AUDIO ================= */
const listener = new THREE.AudioListener();
camera.add(listener);

const bgMusic = new THREE.Audio(listener);
new THREE.AudioLoader().load('/Audio/music.mp3', buffer => {
  bgMusic.setBuffer(buffer);
  bgMusic.setLoop(true);
  bgMusic.setVolume(0.4);
});

window.addEventListener('click', () => {
  if (!bgMusic.isPlaying) bgMusic.play();
}, { once: true });

/* ================= RENDERER ================= */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

/* ================= LIGHTING ================= */
scene.add(new THREE.AmbientLight(0xfff2e5, 0.55));

const sun = new THREE.DirectionalLight(0xfff2cc, 1.5);
sun.position.set(50, 100, 20);
scene.add(sun);

/* ================= FLOOR ================= */
const floor = new Floor(300, 300, '/Textures/grass.jpeg');
scene.add(floor.group);

/* ================= SKY ================= */
const sky = new Sky('/Textures/sky.jpeg');
scene.add(sky.mesh);

/* ================= FRAME DATA ================= */
/* ✨ EDIT ONLY THIS SECTION TO CUSTOMIZE FRAMES ✨ */

const frameData = [
  {
    texture: '/Textures/H1.jpg',
    message:  `This is a much longer piece of dialogue.
It can span multiple lines and the bubble
will automatically resize itself to fit
everything without clipping or overflow.`,
    position: { x: -30, y: 1.8, z: -15 },
    size: { w: 4.5, h: 2.8 }
  },
  {
    texture: '/Textures/H2.jpg',
    message: 'Late summer vibes ☀️',
    position: { x: -22, y: 1.8, z: -14 },
    size: { w: 3.8, h: 2.2 }
  },
  {
    texture: '/Textures/H1.jpg',
    message: 'I like this one a lot',
    position: { x: -14, y: 1.9, z: -15 },
    size: { w: 5.2, h: 3 }
  },
  {
    texture: '/Textures/H2.jpg',
    message: 'Golden hour hits different',
    position: { x: -5, y: 1.7, z: -16 },
    size: { w: 3.5, h: 2 }
  },
  {
    texture: '/Textures/H1.jpg',
    message: 'Quiet moment 🌿',
    position: { x: 6, y: 1.8, z: -15 },
    size: { w: 4.8, h: 2.6 }
  },
  {
    texture: '/Textures/H2.jpg',
    message: 'End of the walk',
    position: { x: 16, y: 1.9, z: -14 },
    size: { w: 4, h: 2.4 }
  }
];

/* ================= SPEECH BUBBLES ================= */
const bubbleObjects = [];

/* ================= BUILD FRAMES ================= */
const radius = 25;      // distance from camera
const height = 1.8;    // frame height

frameData.forEach((data, i) => {
  const angle = (i / frameData.length) * Math.PI * 2;

  const frame = new PictureFrame(
    data.texture,
    data.size.w,
    data.size.h
  );

  // Position in a circle around the camera
  frame.group.position.set(
    Math.sin(angle) * radius,
    height,
    Math.cos(angle) * radius
  );

  // Make frame face the camera
  frame.group.lookAt(
    camera.position.x,
    height,
    camera.position.z
  );

  scene.add(frame.group);

  const bubble = new SpeechBubble(data.message);
  bubble.sprite.position.set(0, data.size.h + 0.4, 0.15);
  frame.group.add(bubble.sprite);

  bubbleObjects.push({
    group: frame.group,
    bubble,
    radius: 4
  });
});

/* ================= FLOWERS ================= */
function makeFlower(x, z) {
  const flower = new THREE.Group();

  const stemHeight = Math.random() * 0.5 + 0.5;

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.1, stemHeight),
    new THREE.MeshStandardMaterial({ color: 0x84d070 })
  );
  stem.position.y = stemHeight / 2;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 12),
    new THREE.MeshStandardMaterial()
  );

  head.material.color.setHSL(Math.random(), 0.9, 0.6);
  head.material.emissive.set(head.material.color);
  head.material.emissiveIntensity = 0.25;
  head.position.y = stemHeight + 0.2;

  flower.add(stem, head);
  flower.position.set(x, 0, z);
  flower.userData.sway = Math.random() * Math.PI * 2;

  scene.add(flower);
}

for (let i = 0; i < 120; i++) {
  makeFlower(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
}

/* ================= HILLS ================= */
function addHillRing(radius, count) {
  const group = new THREE.Group();

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const size = 25 + Math.random() * 20;

    const texture = new THREE.TextureLoader().load('/Textures/hedge.jpeg');
    const material = new THREE.MeshStandardMaterial({ map: texture });

    const hill = new THREE.Mesh(
      new THREE.SphereGeometry(size, 32, 32),
      material
    );

    hill.position.set(
      Math.cos(angle) * radius,
      size * 0.1,
      Math.sin(angle) * radius
    );

    hill.scale.set(
      1.2 + Math.random() * 0.6,
      0.4 + Math.random() * 0.3,
      1.2 + Math.random() * 0.6
    );

    group.add(hill);
  }

  scene.add(group);
}

addHillRing(120, 8);
addHillRing(160, 6);

/* ================= PLAYER ================= */
const player = new PlayerControls(camera, document.body, scene);

/* ================= RESIZE ================= */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ================= LOOP ================= */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  player.update();
  sky.update(camera);
  sky.mesh.rotation.y += 0.0005;

  // Flower sway
  scene.traverse(obj => {
    if (obj.userData.sway !== undefined) {
      obj.rotation.z =
        Math.sin(clock.elapsedTime + obj.userData.sway) * 0.03;
    }
  });

  // Bubble proximity
  const playerPos = camera.position;
  bubbleObjects.forEach(obj => {
    const dist = playerPos.distanceTo(obj.group.position);
    dist < obj.radius ? obj.bubble.show() : obj.bubble.hide();
  });

  renderer.render(scene, camera);
}

animate();
