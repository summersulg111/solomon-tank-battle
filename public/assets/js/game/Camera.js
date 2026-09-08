export class Camera {
  constructor(canvas, world) { this.canvas = canvas; this.world = world || { width: canvas.width, height: canvas.height }; this.x = 0; this.y = 0; this.smoothing = 8; }
  update(level, dt = 1 / 60) {
    const player = level?.player; if (!player) return;
    const targetX = player.x + player.width / 2 - this.canvas.width / 2;
    const targetY = player.y + player.height / 2 - this.canvas.height / 2;
    const maxX = Math.max(0, (level.world?.width || this.canvas.width) - this.canvas.width);
    const maxY = Math.max(0, (level.world?.height || this.canvas.height) - this.canvas.height);
    const blend = 1 - Math.exp(-this.smoothing * dt);
    this.x += (Math.max(0, Math.min(maxX, targetX)) - this.x) * blend;
    this.y += (Math.max(0, Math.min(maxY, targetY)) - this.y) * blend;
  }
  begin(ctx) { ctx.save(); ctx.translate(-Math.round(this.x), -Math.round(this.y)); }
  end(ctx) { ctx.restore(); }
}
