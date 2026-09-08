import { Player } from './Player.js';
import { Platform, Trap, Collectible, Checkpoint, Goal } from './entities.js';

export class Level {
  constructor(data, callbacks = {}) {
    Object.assign(this, data);
    this.platforms = (data.platforms || []).map(p => new Platform(p));
    this.traps = (data.traps || []).map(t => new Trap(t));
    this.collectibles = (data.collectibles || []).map(c => new Collectible(c));
    this.checkpoints = (data.checkpoints || []).map(c => new Checkpoint(c));
    this.goal = new Goal(data.goal);
    this.spawn = data.spawn || { x: 80, y: 100 };
    this.player = new Player(this.spawn);
    this.checkpoint = { ...this.spawn };
    this.callbacks = callbacks;
    this.score = 0;
    this.coins = 0;
    this.deaths = 0;
    this.completed = false;
  }
  killPlayer() {
    if (!this.player.alive || this.completed) return;
    this.player.alive = false;
    this.deaths++;
    this.callbacks.onDeath?.(this.deaths);
    setTimeout(() => this.respawn(), 180);
  }
  respawn() { this.player.respawn(this.checkpoint); }
  collect(item) { this.coins += Number(item.value || 1); this.score += Number(item.value || 1) * 10; this.callbacks.onCollect?.(item); }
  activateCheckpoint(cp) { if (!cp.active) { cp.active = true; this.checkpoint = { x: cp.x, y: cp.y - this.player.height }; this.callbacks.onCheckpoint?.(cp); } }
  complete() { if (this.completed) return; this.completed = true; this.callbacks.onComplete?.({ score: this.score, coins: this.coins, deaths: this.deaths }); }
  render(ctx, camera) {
    camera?.begin(ctx);
    ctx.fillStyle = '#0b0b0f'; ctx.fillRect(0, 0, this.world.width, this.world.height);
    this.platforms.forEach(x => x.render(ctx)); this.traps.forEach(x => x.render(ctx)); this.collectibles.forEach(x => x.render(ctx)); this.checkpoints.forEach(x => x.render(ctx)); this.goal.render(ctx); this.player.render(ctx);
    camera?.end(ctx);
  }
}
