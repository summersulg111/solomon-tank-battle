export class UIManager {
  constructor({ score, coins, deaths, timer, overlay, title, text, restart, pause }) {
    Object.assign(this, { score, coins, deaths, timer, overlay, title, text, restart, pause });
  }
  update(values = {}) {
    if (values.score != null) this.score.textContent = Math.floor(values.score);
    if (values.coins != null) this.coins.textContent = values.coins;
    if (values.deaths != null) this.deaths.textContent = values.deaths;
    if (values.time != null) this.timer.textContent = Number(values.time).toFixed(1);
  }
  notify(message) {
    this.title.textContent = message;
    this.text.textContent = 'Checkpoint reached. Your next respawn point is secured.';
    this.overlay.classList.remove('hidden');
    clearTimeout(this.noticeTimer);
    this.noticeTimer = setTimeout(() => this.overlay.classList.add('hidden'), 900);
  }
  complete(result) {
    this.update(result);
    this.title.textContent = 'LEVEL COMPLETE';
    this.text.textContent = `Score ${Math.floor(result.score)} · Coins ${result.coins} · Deaths ${result.deaths}`;
    this.restart.textContent = 'REPLAY';
    this.overlay.classList.remove('hidden');
  }
}
