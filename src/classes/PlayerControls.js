import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export class PlayerControls {
  constructor(camera, domElement) {
    /* ------------------
       STORE CAMERA
    ------------------ */
    this.camera = camera;

    /* ------------------
       JUMP / GRAVITY
    ------------------ */
    this.gravity = 30;        // downward force
    this.jumpForce = 10;      // jump strength
    this.canJump = true;      // allow initial jump
    this.playerHeight = 1.6;  // eye height

    /* ------------------
       POINTER LOCK
    ------------------ */
    this.controls = new PointerLockControls(camera, domElement);

    /* ------------------
       MOVEMENT STATE
    ------------------ */
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.clock = new THREE.Clock();

    this.move = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    this.speed = 100; // ✅ reasonable FPS speed

    /* ------------------
       INPUT
    ------------------ */
    domElement.addEventListener('click', () => {
      this.controls.lock();
    });

    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(e) {
    if (!this.controls.isLocked) return;

    switch (e.code) {
      case 'KeyW': this.move.forward = true; break;
      case 'KeyS': this.move.backward = true; break;
      case 'KeyA': this.move.left = true; break;
      case 'KeyD': this.move.right = true; break;

      case 'Space':
        if (this.canJump) {
          this.velocity.y = this.jumpForce;
          this.canJump = false;
        }
        break;
    }
  }

  onKeyUp(e) {
    switch (e.code) {
      case 'KeyW': this.move.forward = false; break;
      case 'KeyS': this.move.backward = false; break;
      case 'KeyA': this.move.left = false; break;
      case 'KeyD': this.move.right = false; break;
    }
  }

  update() {
    if (!this.controls.isLocked) return;

    const delta = this.clock.getDelta();

    /* ------------------
       GRAVITY + JUMP
    ------------------ */
    this.velocity.y -= this.gravity * delta;
    this.camera.position.y += this.velocity.y * delta;

    // Ground collision (flat ground)
    if (this.camera.position.y < this.playerHeight) {
      this.velocity.y = 0;
      this.camera.position.y = this.playerHeight;
      this.canJump = true;
    }

    /* ------------------
       HORIZONTAL MOVE
    ------------------ */
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    this.direction.z =
      Number(this.move.forward) - Number(this.move.backward);
    this.direction.x =
      Number(this.move.right) - Number(this.move.left);

    this.direction.normalize();

    if (this.move.forward || this.move.backward)
      this.velocity.z -= this.direction.z * this.speed * delta;

    if (this.move.left || this.move.right)
      this.velocity.x -= this.direction.x * this.speed * delta;

    this.controls.moveRight(-this.velocity.x * delta);
    this.controls.moveForward(-this.velocity.z * delta);
  }
}
