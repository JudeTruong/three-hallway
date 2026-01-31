// Floor.js
import * as THREE from 'three';

export class Floor {
  constructor(width = 200, height = 200, texturePath) {
    this.group = new THREE.Group();

    /* Load texture */
    const texture = new THREE.TextureLoader().load(texturePath);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    

    /* Material */
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    material.color.set(0x04DE76);


    /* Geometry */
    const geometry = new THREE.PlaneGeometry(width, height);
    this.mesh = new THREE.Mesh(geometry, material);
    
    /* Make it horizontal */
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = 0;

    this.group.add(this.mesh);
  }
}
