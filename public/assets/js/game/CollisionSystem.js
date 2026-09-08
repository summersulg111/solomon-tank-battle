export class CollisionSystem {
  static intersects(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }
  update(level) {
    const player = level?.player;
    if (!player) return;
    player.grounded = false;
    for (const platform of level.platforms || []) {
      if (!CollisionSystem.intersects(player, platform)) continue;
      const previousBottom = player.y + player.height - player.velocityY * 0.016;
      if (player.velocityY >= 0 && previousBottom <= platform.y + 8) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
      }
    }
    for (const trap of level.traps || []) {
      if (CollisionSystem.intersects(player, trap)) level.killPlayer?.();
    }
    for (const item of level.collectibles || []) {
      if (!item.collected && CollisionSystem.intersects(player, item)) {
        item.collected = true;
        level.collect?.(item);
      }
    }
    for (const checkpoint of level.checkpoints || []) {
      if (CollisionSystem.intersects(player, checkpoint)) level.activateCheckpoint?.(checkpoint);
    }
    if (level.goal && CollisionSystem.intersects(player, level.goal)) level.complete?.();
  }
}
