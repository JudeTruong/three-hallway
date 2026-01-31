import * as THREE from 'three';

export class SpeechBubble {
  constructor(text, options = {}) {
    this.text = text;

    this.font = options.font || '24px Arial';
    this.padding = options.padding || 20;
    this.maxWidth = options.maxWidth || 300;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.material = new THREE.SpriteMaterial({
      map: this.texture,
      transparent: true
    });

    this.sprite = new THREE.Sprite(this.material);
    this.sprite.scale.set(2, 1, 1); // will be resized later

    this.visible = false;
    this.sprite.visible = false;

    this._draw();
  }

  /* ================= TEXT WRAPPING ================= */
  _wrapText(text) {
    this.ctx.font = this.font;
    const words = text.split(' ');
    const lines = [];
    let line = '';

    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      const { width } = this.ctx.measureText(test);

      if (width > this.maxWidth && line !== '') {
        lines.push(line);
        line = words[i] + ' ';
      } else {
        line = test;
      }
    }

    lines.push(line);
    return lines;
  }

  /* ================= DRAW ================= */
  _draw() {
    const lines = this._wrapText(this.text);
    const lineHeight = 32;

    const textWidth = this.maxWidth;
    const textHeight = lines.length * lineHeight;

    this.canvas.width = textWidth + this.padding * 2;
    this.canvas.height = textHeight + this.padding * 2;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /* Bubble background */
    this.ctx.fillStyle = 'rgba(255,255,255,0.95)';
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 4;

    this._roundedRect(
      this.ctx,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      20
    );

    this.ctx.fill();
    this.ctx.stroke();

    /* Text */
    this.ctx.font = this.font;
    this.ctx.fillStyle = '#222';
    this.ctx.textBaseline = 'top';

    lines.forEach((line, i) => {
      this.ctx.fillText(
        line,
        this.padding,
        this.padding + i * lineHeight
      );
    });

    this.texture.needsUpdate = true;

    /* Resize sprite based on canvas size */
    const scale = 0.01;
    this.sprite.scale.set(
      this.canvas.width * scale,
      this.canvas.height * scale,
      1
    );
  }

  /* ================= UTILS ================= */
  _roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ================= API ================= */
  show() {
    this.sprite.visible = true;
  }

  hide() {
    this.sprite.visible = false;
  }

  toggle() {
    this.sprite.visible = !this.sprite.visible;
  }

  setText(newText) {
    this.text = newText;
    this._draw();
  }
}
