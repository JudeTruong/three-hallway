import * as THREE from 'three';

export class PictureFrame {
  constructor(imagePath, width = 2, height = 1) {
    this.group = new THREE.Group();

    /* Picture */
    const texture = new THREE.TextureLoader().load(imagePath);
    const pictureMaterial = new THREE.MeshStandardMaterial({ map: texture });
    pictureMaterial.color.multiplyScalar(12.25);
    pictureMaterial.color.setHSL(0, 1.2, 1);


    const pictureGeometry = new THREE.PlaneGeometry(width, height);
    this.picture = new THREE.Mesh(pictureGeometry, pictureMaterial);
    this.group.add(this.picture);

    /* Frame (slightly bigger, thin, behind) */
    const frameThickness = 0.1;

    const frameGeometry = new THREE.BoxGeometry(
      width + 0.2,
      height + 0.2,
      frameThickness
    );

    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    this.frame = new THREE.Mesh(frameGeometry, frameMaterial);

    // IMPORTANT: move BACK, not forward
    this.frame.position.z = -frameThickness / 1.5;
    this.group.add(this.frame);
  }
}
