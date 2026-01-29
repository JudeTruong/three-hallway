import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// At the top with your other imports




/* -----------------------
   1. SCENE (the world)
------------------------ */
const scene = new THREE.Scene();
// A soft sky blue
scene.background = new THREE.Color(0x87ceeb); 

// Add Fog to make the distance look hazy/natural
// (color, near distance, far distance)





/* -----------------------
   2. CAMERA (your eyes)
------------------------ */
const camera = new THREE.PerspectiveCamera(
  75, // field of view (degrees)
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);



/* -----------------------
   3. RENDERER (draws stuff)
------------------------ */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



//ORBIT CONTROLS AFTER RENDERING
// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);
// Optional: Add damping (makes the movement feel "heavy" and smooth)
controls.enableDamping = true;
controls.dampingFactor = 0.05;


/* -----------------------
   4. A SIMPLE OBJECT
------------------------ */

// White light shining from above
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(5, 10, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


// Shape
const geometry = new THREE.BoxGeometry(2, 2, 2);
//sun 
const circle = new THREE.SphereGeometry(2, 32, 32);
// plane 
const plane = new THREE.PlaneGeometry(1000,1000)


// Material (how it looks)
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('./public/grass.jpg');
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;
colorTexture.repeat.set(20, 20);

const material = new THREE.MeshStandardMaterial({ color: 0x19264 });
const planeMaterial = new THREE.MeshBasicMaterial({map: colorTexture,side: THREE.DoubleSide });
const sunMaterial=new THREE.MeshBasicMaterial({color: 0xF0EC16})

// Mesh = geometry + material
const sun=new THREE.Mesh(circle,sunMaterial)
const cube = new THREE.Mesh(geometry, material);
const floor = new THREE.Mesh(plane, planeMaterial);
// Add cube to the scene
scene.add(cube);
scene.add(floor);
scene.add(sun)





/* -----------------------
   5. Camera position
------------------------ */
camera.position.z = -27;
camera.position.y=0
camera.lookAt(0, -1, 0);

/* -----------------------
    object positions
------------------------ */
floor.rotation.x = Math.PI / 2;
cube.position.z=-4;
sun.position.y=10
sun.position.z=-4
floor.position.z=-4;
floor.position.y=-5;
/* -----------------------
   6. Render loop
------------------------ */


function animate() {
  requestAnimationFrame(animate);

  // Required if enableDamping = true
  controls.update(); 
  const time = performance.now() * 0.001; // Get current time in seconds

    // Tell the bird to fly!

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  

  renderer.render(scene, camera);
}

animate();
