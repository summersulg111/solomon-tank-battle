export class PhysicsEngine {
  constructor({ gravity = 1800, speed = 280, jumpVelocity = -650 } = {}) {
    this.gravity = gravity;
    this.speed = speed;
    this.jumpVelocity = jumpVelocity;
  }
  update(level, dt, input) {
    const player = level?.player;
    if (!player || !player.alive) return;
    const left = input.actions.left;
    const right = input.actions.right;
    player.velocityX = (right ? this.speed : 0) - (left ? this.speed : 0);
    if (input.actions.jump && player.grounded) {
      player.velocityY = this.jumpVelocity;
      player.grounded = false;
    }
    player.velocityY += this.gravity * dt;
    player.x += player.velocityX * dt;
    player.y += player.velocityY * dt;
  }
}
