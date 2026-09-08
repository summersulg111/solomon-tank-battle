// Core game state and animation loop for SOLOMON: DEVIL LEVEL.
export class Game {
  constructor({ canvas, level, input, physics, collision, camera, ui }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.level = level;
    this.input = input;
    this.physics = physics;
    this.collision = collision;
    this.camera = camera;
    this.ui = ui;
    this.state = 'LOADING';
    this.lastTime = 0;
    this.elapsed = 0;
  }

  start() {
    this.state = 'PLAYING';
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(now) {
    const delta = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    if (this.state === 'PLAYING') {
      this.elapsed += delta;
      this.update(delta);
      this.render();
      this.ui?.update({ time: this.elapsed });
    }
    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    this.input?.update();
    this.physics?.update(this.level, delta, this.input);
    this.collision?.update(this.level);
    this.camera?.update(this.level);
  }

  render() {
    const { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
    this.level?.render?.(this.ctx, this.camera);
  }

  pause() { this.state = 'PAUSED'; }
  resume() { this.state = 'PLAYING'; }
}
