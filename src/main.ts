import "./styles.css";

type Vector = {
  x: number;
  y: number;
};

type MondrianColor = {
  name: string;
  value: string;
};

type Actor = {
  position: Vector;
  size: Vector;
  velocity: Vector;
  color: MondrianColor;
};

const palette: MondrianColor[] = [
  { name: "Red", value: "#dd0100" },
  { name: "Blue", value: "#225095" },
  { name: "Yellow", value: "#fac901" },
  { name: "White", value: "#f4f0e6" },
];

const canvas = getRequiredElement<HTMLCanvasElement>("#game");
const scoreElement = getRequiredElement<HTMLElement>("#score");
const statusElement = getRequiredElement<HTMLElement>("#status");
const context = getRequiredContext(canvas);

const keys = new Set<string>();
const player: Actor = {
  position: { x: 80, y: canvas.height / 2 - 20 },
  size: { x: 40, y: 40 },
  velocity: { x: 0, y: 0 },
  color: randomColor(),
};

const squares: Actor[] = [];
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
  player.color = randomColor();
  squares.length = 0;
  score = 0;
  spawnTimer = 0;
  gameOver = false;
  scoreElement.textContent = "0";
  setStatus();
}

function update(deltaSeconds: number): void {
  if (gameOver) {
    return;
  }

  updatePlayer(deltaSeconds);
  updateSquares(deltaSeconds);
  spawnTimer -= deltaSeconds;

  if (spawnTimer <= 0) {
    spawnSquare();
    spawnTimer = Math.max(0.35, 0.9 - score * 0.015);
  }

  for (let index = squares.length - 1; index >= 0; index -= 1) {
    const square = squares[index];

    if (!isColliding(player, square)) {
      continue;
    }

    if (square.color.value !== player.color.value) {
      gameOver = true;
      statusElement.textContent = `Wrong color: ${square.color.name}`;
      break;
    }

    score += 1;
    scoreElement.textContent = score.toString();
    player.color = randomColorExcept(player.color);
    squares.splice(index, 1);
    setStatus();
  }
}

function updatePlayer(deltaSeconds: number): void {
  const speed = 285;
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

function updateSquares(deltaSeconds: number): void {
  for (const square of squares) {
    square.position.x += square.velocity.x * deltaSeconds;
  }

  for (let index = squares.length - 1; index >= 0; index -= 1) {
    if (squares[index].position.x + squares[index].size.x < 0) {
      squares.splice(index, 1);
    }
  }
}

function spawnSquare(): void {
  const size = randomBetween(28, 58);
  const speed = randomBetween(120, 270) + score * 3;

  squares.push({
    position: {
      x: canvas.width + size,
      y: randomBetween(0, canvas.height - size),
    },
    size: { x: size, y: size },
    velocity: { x: -speed, y: 0 },
    color: randomColor(),
  });
}

function draw(): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawMondrianBoard();

  for (const square of squares) {
    drawActor(square, 4);
  }

  drawActor(player, 6);

  if (gameOver) {
    context.fillStyle = "rgba(0, 0, 0, 0.58)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f4f0e6";
    context.font = "bold 34px Arial, sans-serif";
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 12);
    context.font = "18px Arial, sans-serif";
    context.fillText("Press Space to restart", canvas.width / 2, canvas.height / 2 + 24);
    context.textAlign = "start";
  }
}

function drawMondrianBoard(): void {
  context.fillStyle = "#f4f0e6";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const blocks = [
    { x: 0, y: 0, width: 180, height: 110, color: "#dd0100" },
    { x: 620, y: 0, width: 180, height: 155, color: "#fac901" },
    { x: 0, y: 320, width: 145, height: 160, color: "#225095" },
    { x: 430, y: 300, width: 190, height: 180, color: "#dd0100" },
    { x: 650, y: 300, width: 150, height: 180, color: "#225095" },
    { x: 250, y: 0, width: 70, height: 220, color: "#fac901" },
  ];

  for (const block of blocks) {
    context.fillStyle = block.color;
    context.fillRect(block.x, block.y, block.width, block.height);
  }

  context.strokeStyle = "#111111";
  context.lineWidth = 10;

  const verticals = [145, 245, 325, 430, 620, 650];
  const horizontals = [110, 155, 220, 300, 320];

  for (const x of verticals) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (const y of horizontals) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawActor(actor: Actor, borderWidth: number): void {
  context.fillStyle = actor.color.value;
  context.fillRect(actor.position.x, actor.position.y, actor.size.x, actor.size.y);
  context.strokeStyle = "#111111";
  context.lineWidth = borderWidth;
  context.strokeRect(actor.position.x, actor.position.y, actor.size.x, actor.size.y);
}

function setStatus(): void {
  statusElement.textContent = `Catch ${player.color.name}`;
}

function randomColor(): MondrianColor {
  return palette[Math.floor(Math.random() * palette.length)];
}

function randomColorExcept(currentColor: MondrianColor): MondrianColor {
  const nextPalette = palette.filter((color) => color.value !== currentColor.value);
  return nextPalette[Math.floor(Math.random() * nextPalette.length)];
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

setStatus();
requestAnimationFrame(gameLoop);
