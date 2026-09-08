export class LevelManager {
  constructor(basePath = '../game/levels') { this.basePath = basePath; this.cache = new Map(); }
  async load(id) {
    id = Math.max(1, Math.min(5, Number(id)));
    if (this.cache.has(id)) return structuredClone(this.cache.get(id));
    const response = await fetch(`${this.basePath}/level-0${id}.json`, { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Level ${id} could not be loaded`);
    const data = await response.json();
    this.validate(data, id);
    this.cache.set(id, data);
    return structuredClone(data);
  }
  validate(data, expectedId) {
    if (!data || Number(data.id) !== expectedId) throw new Error('Invalid level data');
    if (!data.world || !Number.isFinite(data.world.width)) throw new Error('Invalid world dimensions');
    for (const key of ['platforms','traps','collectibles','checkpoints']) {
      if (!Array.isArray(data[key])) throw new Error(`Invalid ${key} data`);
    }
    if (!data.goal || !Number.isFinite(data.goal.x)) throw new Error('Invalid goal');
  }
}
