import * as THREE from 'three';

export class Bird {
    constructor(color = 0xffffff) {
        // We use a Group so we can add wings or a beak later easily
        this.group = new THREE.Group();

        // The body (a simple cone)
        const bodyGeom = new THREE.SphereGeometry(5, 5, 8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: color });
        this.mesh = new THREE.Mesh(bodyGeom, bodyMat);
        
        // Point the "nose" forward (rotate 90 degrees)
        this.mesh.rotation.x = Math.PI / 2;


        const second=new THREE.BoxGeometry(15,15,15);
        this.boxMaterial=new THREE.MeshStandardMaterial({ color: 0x11111 });
        this.body=new THREE.Mesh(second, boxMaterial);
        this.group.add(this.body)

        this.group.add(this.mesh);
    }

    // A custom function to handle the bird's flight math
    fly(time) {
        this.group.position.y += Math.sin(time * 2) * 0.02;
        this.group.position.z += Math.cos(time) * 0.01;
    }
}