export class InputManager {
  constructor() {
    this.keys = new Set();
    this.actions = { left: false, right: false, jump: false };
    window.addEventListener('keydown', e => {
      if (['ArrowLeft','ArrowRight','ArrowUp',' ','a','d','w','A','D','W'].includes(e.key)) e.preventDefault();
      this.keys.add(e.key.toLowerCase());
    });
    window.addEventListener('keyup', e => this.keys.delete(e.key.toLowerCase()));
  }
  update() {
    this.actions.left = this.keys.has('a') || this.keys.has('arrowleft');
    this.actions.right = this.keys.has('d') || this.keys.has('arrowright');
    this.actions.jump = this.keys.has('w') || this.keys.has('arrowup') || this.keys.has(' ');
  }
  bindTouch(root = document) {
    root.querySelectorAll('[data-key]').forEach(button => {
      const key = button.dataset.key;
      const set = value => { this.actions[key] = value; };
      button.addEventListener('pointerdown', e => { e.preventDefault(); set(true); });
      ['pointerup','pointercancel','pointerleave'].forEach(type => button.addEventListener(type, () => set(false)));
    });
  }
}
