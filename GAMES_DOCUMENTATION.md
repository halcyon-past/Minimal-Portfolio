# Arcade Games Architecture & Documentation

This document provides a comprehensive breakdown of every mini-game within the Minimalist Portfolio Arcade. It details the structure, underlying algorithms (including level generation and verification), state management scenarios, and technical specifics per game.

---

## 1. Snake Game (`SnakeGamePage.jsx`)

**Concept:** A modern interpretation of the classic Snake game with a developer-oriented twist (eating tech icons and occasionally an AI robot).

### Core Structure & State
- **State Management:**
  - `snake`: An array of coordinate objects `[{x, y}, ...]` where index 0 is the head.
  - `direction`: An object `{x, y}` indicating the current velocity vector.
  - `food`: An object `{x, y, icon, type}` holding the target coordinate and its visual emoji representation.
  - `status`: String state machine (`'waiting'`, `'playing'`, `'dying'`, `'gameover'`).
  - `speed`: Integer representing interval milliseconds.
  - **Ref Hooks**: Crucially, `useRef` handles `snakeRef`, `dirRef`, `foodRef`, and `scoreRef`. Using refs inside the `useEffect` interval loop avoids stale closures and prevents React StrictMode double-invocation bugs that cause double-movement in intervals.

### Algorithms & Mechanics
- **Movement Algorithm:** 
  An interval runs every `speed` milliseconds. It calculates the new head position by adding the `dirRef` coordinates to the current head's coordinates. The new head is mapped to the front of the array.
- **Handling Scenarios:**
  - **Wall Collision:** If the new head exceeds `GRID_SIZE` (0 to 19), the game ends (`setStatus('dying')`). No wrap-around logic is used.
  - **Self Collision:** Before moving, if the new head shares coordinates with *any* existing segment of the snake, the game ends.
  - **Eating Food:** If the head matches the food coordinates:
    1. Score is incremented.
    2. `speed` is decreased (making it faster) by substituting Math.max limits (e.g., `setSpeed(prev => Math.max(50, prev - 2))`).
    3. The tail is *not* popped (the snake grows).
    4. A new food is spawned.
  - **Standard Move:** If no food is eaten, the tail segment (`snake.pop()`) is removed to maintain the structure's length.
- **Level Generation (Food Spawning):**
  A `generateFood()` while-loop continually creates random `{x, y}` pairs and checks via `.some()` against the entire snake array. If `onSnake` is true, the loop repeats, guaranteeing food always spawns in a free tile. There is a 5% chance the food is an 'AI' `🤖` instead of standard tech icons.

---

## 2. Sudoku (`SudokuGamePage.jsx`)

**Concept:** A functional, playable Sudoku board supporting numeric input, note-taking, error tracking, and a built-in timer. 

### Core Structure & State
- **State Management:**
  - `gameState`: An object `{ puzzle: [...], solved: [...] }`.
  - `selectedCell`: Coordinates `{r, c}` of the currently focused cell.
  - `notesMode`: Boolean toggling whether numbers are registered as guesses or pencil marks.
  - `timer` & `errors`: Track standard metrics. Error threshold triggers a loss.

### Algorithms & Mechanics
- **Level Generation (Board Permutation):**
  Rather than running a heavy backtracking algorithm on the client to generate a board from scratch, the game relies on a performant permutation strategy:
  1. It begins with a **hardcoded, valid seed board**.
  2. **Number Shuffling:** It creates a shuffled mapping of the integers 1-9. It iterates over the seed board and replaces every number based on this mapping (e.g., if 1 maps to 7, all 1s become 7s). Because Sudoku rules are invariant to uniform symbol swapping, the board remains perfectly valid.
  3. **Hole Punching:** A loop runs to randomly select a cell. If the cell is not empty, it removes the number (setting it to `0`) and increments `removedCells` until it reaches exactly 45 empty spaces (Medium difficulty).
- **Verification Algorithm:**
  1. The game permanently retains the fully `solved` grid generated in step 2.
  2. When a user inputs a number (and isn't in `notesMode`), the input is verified in `O(1)` time by comparing it directly to `gameState.solved[r][c]`.
  3. If incorrect, the `errors` count increments.
  4. If correct, the board updates. A `useEffect` then checks if all 81 cells are filled and have `val !== 0`. If true, the game triggers a win sequence.

---

## 3. Typing Test (`TypingTestPage.jsx`)

**Concept:** A programming-syntax typing speed test calculating real-time WPM and accuracy using developer-heavy vocabulary.

### Core Structure & State
- **State Management:**
  - `words`: Array of strings generated for the test.
  - `typedHistory`: Array of completed strings the user has typed.
  - `currentInputValue`: The string in the active input box.
  - `status`, `timeLeft`, `wpm`, `accuracy`.

### Algorithms & Mechanics
- **Level Generation:**
  A subset array `CODE_WORDS` isolates common JS/Python keywords (`useState`, `console.log`, `async`, `def`). The generator randomly selects from this array to create a 150-word tape strip.
- **Handling Typing Scenarios:**
  - As the user types into the hidden `inputRef`, the string updates `currentInputValue`.
  - If the user presses the spacebar (`e.target.value.endsWith(' ')`), the word is pushed from `currentInputValue` to `typedHistory`, and the input box is cleared.
- **Verification Algorithm (WPM & Accuracy Calculation):**
  When time expires, the algorithm compares `typedHistory` against the generated `words`.
  1. **Character Matrix Matching:** It iterates through each typed word and compares the characters against the target word linearly. `minLen = Math.min(...)` ensures it only counts correctly placed characters.
  2. **Spacebar Handling:** If the word matches entirely, an exact correct point is credited for the required space.
  3. **Formula:** 
     - WPM = `(correctCharacters / 5) / timeInMinutes`
     - Accuracy = `(correctCharacters / totalCharactersTyped) * 100`

---

## 4. Data Pipeline (`DataPipelinePage.jsx`)

**Concept:** A pipe-puzzle game where players rotate various grid-based pipes to construct a continuous fluid path from a "Source" to an "End".

### Core Structure & State
- **State Management:**
  - `board`: Flatted 1D array of pipe objects `{ type, rotations, isFixed }`.
  - `flowBoard`: Boolean array mirroring `board` determining if 'water' currently reaches that cell.
  - `levelIndex`: Tracks the active handcrafted structure.
  
### Algorithms & Mechanics
- **Level Generation:**
  Unlike Snake or Sudoku, pipelines rely on structurally guaranteed solvable maps. Hand-crafted layouts (Strings like 'S', 'I', 'L', 'T', '+', 'E') define a 2D grid conceptually, flattened into 1D for state. 
  - On initialization, all non-fixed tiles (not 'S' or 'E') have their `rotations` integer randomized between 0 and 3.
- **Verification & Flow Output Algorithm (BFS Traversal):**
  Every time the user rotates a tile, a Breadth-First Search (BFS) graph traversal executes:
  1. **Port Mapping Definition:** Pipes hold an initial boolean array `[top, right, bottom, left]` indicating connectivity (e.g., Straight 'I' = `[1, 0, 1, 0]`).
  2. **Dynamic Rotation Calculation:** The current effective connectivity is calculated by popping and unshifting the boolean array `cell.rotations % 4` times.
  3. **BFS Queue:** Starts at the 'S' index.
  4. **Neighbor Verification:** Checks the 4 cardinal neighbors relative to the 1D matrix (using `% size` and `Math.floor(/ size)` conversion to 2D math). 
  5. **Port Alignment Validation:** If the current tile has an outgoing port `0` (Top), it verifies if the neighbor tile directly above it has an active outgoing port `2` (Bottom).
  6. **Expansion:** Valid flowing tiles push to the queue and activate `flowBoard[index] = true`.
- **Win Condition:** If the BFS algorithm ever sets the index of the 'E' (End) tile to `true` in `flowBoard`, the circuit is complete, instantly triggering the solved state.
- **Level Persistence & Navigation:**
  The game tracks the user's completed levels and stores their current progression in `localStorage` (`pipelineCurrentLevel` and `pipelineBestMoves_N`). Upon successful completion of a level, the game strictly advances the user to the next map. Navigation directly to specific levels using URL queries (`?level=N`) is strictly validated against prior completion logic. If a user attempts to jump ahead via URL parameters without a verified highscore from `N-1`, the system routes them structurally to a 404 block for security and progression pacing.

---

## 5. Tic Tac Toe (`TicTacToePage.jsx`)

**Concept:** An interactive AI Tic Tac Toe experience featuring Framer Motion visuals and an adversarial Minimax algorithm.

### Core Structure & State
- **State Management:**
  - `board`: An array of length 9 populated with `null`, `'Python'`, or `'Java'`.
  - `status`: Lifecycle router (`'config'` -> `'playing'` -> `'ended'`).
  - `difficulty`: Impacts AI decision depth and randomness (`'easy'`, `'hard'`).
  - `currentTurn`, `winner`.

### Algorithms & Mechanics
- **Verification Algorithm (Win Condition):**
  An array of exactly 8 winning index combinations (Rows, Columns, Diagonals). A `checkWinner(squares)` function maps through this array. If `squares[a] === squares[b] === squares[c]`, that string is returned as the winner.
- **Adversarial AI Algorithm (Minimax):**
  - Hard difficulty exclusively relies on the Minimax mathematical decision tree.
  - The algorithm simulates all possible futures continuously.
  - **Base Cases:** If the simulated board is a win for AI, return +10. If player win, return -10. Tie returns 0.
  - **Recursive Branching:** If no terminal state, it places a simulated piece, calls Minimax on the resulting board, and stores the score.
  - It maximizes the score on the AI's simulated turn, and acts to minimize the AI's score on the simulated player's turn (assuming the player plays optimally).
  - The top-level function `makeAIMove` picks the index yielding the highest score string.
- **Handling Difficulty:**
  - On `'easy'`, the AI has a 60% chance to intentionally ignore Minimax and instead use `Math.random()` to simply select any empty index inside `board`, providing a sub-optimal experience suitable for lower-tier challenge.
  - On `'hard'`, random selection is disabled, making the Minimax AI mathematically impossible to beat (best case scenario evaluates to a Draw).
- **Handling UI Overlay Flow:**
  - State guards the DOM generation. If `status === 'config'`, absolute positioned overlay menus absorb clicks to set the config states BEFORE the board grid becomes clickable, ensuring strict architectural phase isolation.

---

## 6. Space Invaders (`SpaceInvadersPage.jsx`)

**Concept:** A retro canvas-based arcade shooter featuring a player-controlled ship, a marching grid of alien enemies, and bullet hell mechanics.

### Core Structure & State
- **State Management:**
  - `status`, `score`, `highScore` handle the React UI lifecycle.
  - `gameState` ref: A mutable object housing all engine state without prompting React re-renders. It contains:
    - `player`: `{x, y, dx, width, height}`.
    - `aliens`: Array of alien objects with coordinates, size, type, and an `alive` boolean.
    - `lasers` & `alienLasers`: Arrays representing active projectiles.
    - `alienDirection`, `alienSpeed`, `keys` (dictionary of currently pressed movement keys), and `lastShot` (throttle timestamp).

### Algorithms & Mechanics
- **Game Engine Loop:**
  Uses a performant HTML `<canvas>` combined with `requestAnimationFrame` driving an `update()` and `draw()` cycle at ~60fps.
- **Movement & Edge Behavior:**
  - **Player:** Reads boolean toggles from `gameState.keys` (managed by `keydown` and `keyup` listeners) to smoothly translate the `player.x` coordinate without native key-repeating delays. Hard boundary checks cap movement at `0` and `CANVAS_WIDTH`.
  - **Aliens:** Moves the entire swarm horizontally by `.x += alienSpeed * alienDirection`. If any single living alien touches a screen edge (`x <= 0` or `x + width >= CANVAS_WIDTH`), `hitEdge` evaluates to `true`. This causes the swarm to immediately reverse direction `* -1`, increase `alienSpeed`, and descend on the Y-axis.
- **Combat & Verification:**
  - **Shooting Throttle:** Player shots check against Date.now() ensuring a 300ms cooldown threshold. Aliens independently roll `Math.random() < 0.0005` every frame to dictate laser fire probabilities per living unit.
  - **Collision Detection (AABB):** Iterates over active player lasers and active aliens simultaneously evaluating an Axis-Aligned Bounding Box calculation (`laser.x < alien.x + alien.width && laser.x + laser.width > alien.x ...`). Upon hit, the alien's `alive` state becomes false and the laser shifts out of the array.
- **Win/Lose Conditions:**
  - **Win:** Iterates through aliens; if zero aliens are marked `alive`, triggers `'won'` status.
  - **Game Over:** Triggers if an alien laser AABB overlaps the player, or if the descending alien swarm's Y-coordinates successfully reach the player's Y threshold.

---

## 7. Flappy Bird (`FlappyBirdPage.jsx`)

**Concept:** An endless canvas-based scroller featuring a physics-driven jumping mechanic and scrolling obstacle generation. Environment aesthetics mimic a night-time city skyline where pipes are modeled as buildings with lit windows.

### Core Structure & State
- **State Management:**
  - Standard React lifecycle management for `status`, `score`.
  - `gameState` ref handles high-frequency mutable variables:
    - `bird`: `{x, y, velocity, width, height}`.
    - `pipes`: An array of dynamically generated obstacle boundaries.
    - `frames`: Continuous integer tracking elapsed cycles.
    - Cosmetic arrays generated once deeply on start: `stars` and `clouds`.

### Algorithms & Mechanics
- **Physics Engine:** 
  Every frame, `GRAVITY` (a constant velocity scalar) is continuously added to `bird.velocity`. The `bird.y` coordinate is then updated by this velocity, resulting in a smooth parabolic drop. Pressing Space/Up explicitly sets `bird.velocity` to a negative constant (`JUMP`), instituting sharp upward arcs.
- **Obstacle (Building) Generation:**
  Instead of rendering standard Mario pipes, the gap obstacle represents skyscrapers with individual lit windows:
  - Executes every 100 frames (`state.frames % 100 === 0`).
  - Calculates a random `topPipeHeight`. Using `PIPE_SPACING` (the static gap distance), the `bottomBuildingHeight` automatically fills the inverse space.
  - Randomly decorates array loops pushing `{y, lit}` dictionaries representing windows.
- **Scrolling & Bounds:**
  - The map naturally loops off-screen by decrementing `x -= PIPE_SPEED` on all tracked obstacles. Once `x + PIPE_WIDTH < 0`, the obstacle drops from the array constraint.
- **Collision & Verification:**
  - **Floor/Ceiling Bound:** Instant `'gameover'` if `bird.y` crosses `0` or `CANVAS_HEIGHT`.
  - **AABB Pass Failures:** Instantly parses Axis-Aligned Bounding checking for overlap natively between `bird` and the top pipe dimensions or bottom pipe dimensions concurrently.
  - **Scoring Metric:** Monitors boolean flag `.passed` mounted onto each pipe. When `bird.x` overtakes `pipe.x + PIPE_WIDTH` unharmed, the object flags `passed = true` yielding a single point increment.

---

## 8. 404 Endless Runner (`EndlessRunner.jsx`)

**Concept:** A hidden, Canvas-based endless runner mini-game embedded directly into the custom 404 page. The objective is to jump over barrels and dodge flying tickets as a developer dinosaur.

### Core Structure & State
- **State Management:**
  - `status`, `score`, `highScore` (persisted in `localStorage` as `runnerHighScore`).
  - `imagesLoaded`: Verifies that all sprites (`dinoImg`, `barrelImg`, `ticketImg`) are loaded successfully before initializing playback loops.
  - `gameState` ref handling continuous high-frequency metrics inside the loop:
    - `dino`: `{x, y, velocityY, width, height, isGrounded}`.
    - `obstacles`: Dynamic array mapping `x`, `y`, `width`, `type`.

### Algorithms & Mechanics
- **Physics Engine (Jumping):** 
  Utilizes the same standard vertical gravity cycle applied to `dino.velocityY`. Ground bounds clamp collisions stopping decent perfectly on horizontal floor traces while immediately re-enabling jumping flags (`isGrounded = true`). Frame rate and scaling dictate progressive `speed` increments corresponding roughly to thousands of points increasing jump timing rigor.
- **Resource Loading Protocol:**
  Canvas objects instantly pull `ctx.drawImage` logic and would throw null bounds failing asynchronously if image pointers were absent. An `imagesLoaded` state tracks a strict count matrix against multiple image instances guaranteeing sprites render cleanly for the initial placeholder visual prior to interactivity logic toggling `isPlaying`.
- **AABB Hit Detection:**
  A frame-locked loop verifies hitbox boundaries continuously between the primary `dino` matrix coordinates and every item looping through the `obstacles` array per cycle, enforcing instant-termination mechanics and updating local high scores instantly.