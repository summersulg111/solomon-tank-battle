export class Game {
  constructor({ canvas, level, input, physics, collision, camera, ui }) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.level = level;
    this.input = input; this.physics = physics; this.collision = collision; this.camera = camera; this.ui = ui;
    this.state = 'READY'; this.lastTime = 0; this.elapsed = 0; this.frame = null;
  }
  start() { if (this.state === 'PLAYING') return; this.state = 'PLAYING'; this.lastTime = performance.now(); this.frame = requestAnimationFrame(this.loop.bind(this)); }
  loop(now) {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05); this.lastTime = now;
    if (this.state === 'PLAYING') { this.update(dt); this.render(); }
    this.frame = requestAnimationFrame(this.loop.bind(this));
  }
  update(dt) {
    this.input.update(); this.physics.update(this.level, dt, this.input); this.collision.update(this.level); this.camera.update(this.level, dt);
    if (!this.level.completed) { this.elapsed += dt; this.ui?.update({ time: this.elapsed, score: this.level.score, coins: this.level.coins, deaths: this.level.deaths }); }
  }
  render() { this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); this.level.render(this.ctx, this.camera); }
  pause() { if (this.state === 'PLAYING') this.state = 'PAUSED'; }
  resume() { if (this.state === 'PAUSED') { this.state = 'PLAYING'; this.lastTime = performance.now(); } }
}
