import { Game } from './Game.js';
import { Level } from './Level.js';
import { LevelManager } from './LevelManager.js';
import { InputManager } from './InputManager.js';
import { PhysicsEngine } from './PhysicsEngine.js';
import { CollisionSystem } from './CollisionSystem.js';
import { Camera } from './Camera.js';

export async function startSolomonGame({ canvas, levelId = 1, ui = null }) {
  const input = new InputManager();
  input.bindTouch(document);
  const manager = new LevelManager('../game/levels');
  const data = await manager.load(levelId);
  const level = new Level(data, {
    onDeath: deaths => ui?.update?.({ deaths }),
    onCollect: () => ui?.update?.({ coins: level.coins, score: level.score }),
    onCheckpoint: () => ui?.notify?.('CHECKPOINT'),
    onComplete: result => ui?.complete?.(result)
  });
  const camera = new Camera(canvas, data.world);
  const physics = new PhysicsEngine();
  const collision = new CollisionSystem();
  const game = new Game({ canvas, level, input, physics, collision, camera, ui });
  game.start();
  return { game, level, input, manager };
}
