export class Player {
  constructor(spawn) {
    this.width = 34;
    this.height = 48;
    this.x = spawn.x;
    this.y = spawn.y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.grounded = false;
    this.alive = true;
  }
  respawn(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.grounded = false;
    this.alive = true;
  }
  get bounds() { return { x: this.x, y: this.y, width: this.width, height: this.height }; }
  render(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#e53935';
    ctx.fillRect(this.x + 7, this.y + 8, 20, 7);
    ctx.fillStyle = '#111111';
    ctx.fillRect(this.x + 7, this.y + 25, 20, 5);
  }
}
