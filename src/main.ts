import "./styles.css";

type Vector = {
  x: number;
  y: number;
};

type Actor = {
  position: Vector;
  size: Vector;
  velocity: Vector;
};

const canvas = getRequiredElement<HTMLCanvasElement>("#game");
const scoreElement = getRequiredElement<HTMLElement>("#score");
const statusElement = getRequiredElement<HTMLElement>("#status");
const context = getRequiredContext(canvas);

const keys = new Set<string>();
const player: Actor = {
  position: { x: 80, y: canvas.height / 2 - 20 },
  size: { x: 38, y: 38 },
  velocity: { x: 0, y: 0 },
};

const hazards: Actor[] = [];
let score = 0;
let gameOver = false;
let lastTime = performance.now();
let spawnTimer = 0;

window.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());

  if (gameOver && event.code === "Space") {
    resetGame();
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

function resetGame(): void {
  player.position = { x: 80, y: canvas.height / 2 - 20 };
  hazards.length = 0;
  score = 0;
  spawnTimer = 0;
  gameOver = false;
  statusElement.textContent = "Playing";
}

function update(deltaSeconds: number): void {
  if (gameOver) {
    return;
  }

  updatePlayer(deltaSeconds);
  updateHazards(deltaSeconds);
  spawnTimer -= deltaSeconds;
  score += deltaSeconds * 10;

  if (spawnTimer <= 0) {
    spawnHazard();
    spawnTimer = 0.65;
  }

  for (const hazard of hazards) {
    if (isColliding(player, hazard)) {
      gameOver = true;
      statusElement.textContent = "Game Over";
    }
  }

  scoreElement.textContent = Math.floor(score).toString();
}

function updatePlayer(deltaSeconds: number): void {
  const speed = 260;
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.has("arrowleft") || keys.has("a")) {
    player.velocity.x -= speed;
  }

  if (keys.has("arrowright") || keys.has("d")) {
    player.velocity.x += speed;
  }

  if (keys.has("arrowup") || keys.has("w")) {
    player.velocity.y -= speed;
  }

  if (keys.has("arrowdown") || keys.has("s")) {
    player.velocity.y += speed;
  }

  player.position.x = clamp(
    player.position.x + player.velocity.x * deltaSeconds,
    0,
    canvas.width - player.size.x,
  );
  player.position.y = clamp(
    player.position.y + player.velocity.y * deltaSeconds,
    0,
    canvas.height - player.size.y,
  );
}

function updateHazards(deltaSeconds: number): void {
  for (const hazard of hazards) {
    hazard.position.x += hazard.velocity.x * deltaSeconds;
  }

  for (let index = hazards.length - 1; index >= 0; index -= 1) {
    if (hazards[index].position.x + hazards[index].size.x < 0) {
      hazards.splice(index, 1);
    }
  }
}

function spawnHazard(): void {
  const size = randomBetween(26, 54);

  hazards.push({
    position: {
      x: canvas.width + size,
      y: randomBetween(0, canvas.height - size),
    },
    size: { x: size, y: size },
    velocity: { x: -randomBetween(160, 320), y: 0 },
  });
}

function draw(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  context.fillStyle = "#58d68d";
  context.fillRect(player.position.x, player.position.y, player.size.x, player.size.y);

  context.fillStyle = "#ff6b6b";
  for (const hazard of hazards) {
    context.fillRect(hazard.position.x, hazard.position.y, hazard.size.x, hazard.size.y);
  }

  if (gameOver) {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffffff";
    context.font = "32px sans-serif";
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 10);
    context.font = "18px sans-serif";
    context.fillText("Press Space to restart", canvas.width / 2, canvas.height / 2 + 24);
    context.textAlign = "start";
  }
}

function drawGrid(): void {
  context.strokeStyle = "#2d3440";
  context.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += 40) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 40) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
}

function isColliding(first: Actor, second: Actor): boolean {
  return (
    first.position.x < second.position.x + second.size.x &&
    first.position.x + first.size.x > second.position.x &&
    first.position.y < second.position.y + second.size.y &&
    first.position.y + first.size.y > second.position.y
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRequiredElement<TElement extends Element>(selector: string): TElement {
  const element = document.querySelector<TElement>(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

function getRequiredContext(targetCanvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const renderingContext = targetCanvas.getContext("2d");

  if (!renderingContext) {
    throw new Error("Canvas 2D rendering is not available");
  }

  return renderingContext;
}

function gameLoop(currentTime: number): void {
  const deltaSeconds = Math.min((currentTime - lastTime) / 1000, 0.05);
  lastTime = currentTime;

  update(deltaSeconds);
  draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
