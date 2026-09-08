# SOLOMON: DEVIL LEVEL

Original 2D rage-platformer browser game built with PHP 8.2+, MySQL 8+, HTML5 Canvas, CSS3 and Vanilla JavaScript.

## Current MVP

- Solomon dark/red/orange game UI
- Canvas game loop with responsive controls
- Keyboard + mobile touch controls
- Player physics, jumping and AABB platform collision
- Spikes, collectibles, checkpoints and level goals
- Five level data files
- PHP PDO/MySQL schema
- Registration, login and logout APIs
- Score and leaderboard APIs

## Run locally

1. Create a MySQL database and import `database/schema.sql`.
2. Configure `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS` in the environment.
3. Point Apache/Nginx document root at `public/`.
4. Open `public/index.php`.

For a quick local PHP server:

```bash
php -S localhost:8000 -t public
```

Then open `http://localhost:8000/`.

> The game itself loads level JSON from the repository and can be played before authentication is wired into the UI. Persistence APIs are ready for the next implementation stage.

## Architecture

```text
Browser UI + Canvas Game
        |
      Fetch
        |
   PHP JSON APIs
        |
 Controllers / Services
        |
       PDO
        |
      MySQL
```

## Roadmap

- Wire registration/login forms to the UI
- Add dashboard, level select and profile
- Persist progress and best scores
- Add admin authorization and management pages
- Add audio, particles and screen effects
- Add automated tests and deployment configuration

All artwork, characters, levels and branding should remain original and must not copy existing games.
