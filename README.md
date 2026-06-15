# TypeScript Game Starter

A tiny browser game built with TypeScript and the HTML Canvas API.

## What You Will Learn

- Drawing shapes on a canvas
- Reading keyboard input
- Running a game loop with `requestAnimationFrame`
- Updating player and enemy positions
- Detecting collisions
- Tracking score and game-over state

## Run It

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

Then open the local URL printed by Vite.

## Controls

- Arrow keys or WASD: move
- Space: restart after game over

## Project Structure

- `index.html`: page shell and canvas
- `src/main.ts`: game code
- `src/styles.css`: layout and visual styling
- `tsconfig.json`: TypeScript settings
- `package.json`: scripts and dev dependencies

## Deploy on GitHub Pages

This project includes `.github/workflows/deploy.yml`, which builds and deploys
the game whenever you push to `main`.

Before the first deployment, open the repository on GitHub and go to:

`Settings -> Pages -> Build and deployment -> Source -> GitHub Actions`

After the workflow finishes, the game will be available at:

`https://<your-github-username>.github.io/gantos/`
