// Sky.js
import * as THREE from 'three';

export class Sky {
  constructor(texturePath, radius = 500) {
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
    material.side = THREE.BackSide;
    material.depthWrite = false;

    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    this.mesh = new THREE.Mesh(geometry, material);
  }

  update(camera) {
    // Keep sky centered on camera
    this.mesh.position.copy(camera.position);
  }
}

