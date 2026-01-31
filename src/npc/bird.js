// Bird.js
import * as THREE from 'three';

export class Bird {
  constructor(color = 0xffffff) {
    // Root object (important!)
    this.group = new THREE.Group();

    /* Body */
    const bodyGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color });
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.group.add(this.body);

    /* Optional: wings / box body */
    const boxGeometry = new THREE.BoxGeometry(0.6, 0.3, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.box = new THREE.Mesh(boxGeometry, boxMaterial);
    this.box.position.z = -0.5;
    this.group.add(this.box);
  }

  // Update function (call every frame)
  update(time) {
    this.group.position.y = Math.sin(time * 2) * 0.5;
    this.group.rotation.y += 0.01;
  }
}
