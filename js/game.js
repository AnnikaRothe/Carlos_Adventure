let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let fullScreen = false;
let gameStarted = false;
let soundMute = false;
let game_music = new Audio("audio/game_music.mp3");
game_music.loop = true;
game_music.volume = 0.5; 
let game_over_sound = new Audio("audio/fail.mp3");
let game_win_sound = new Audio("audio/win_game.mp3");

/**
 * Initializes the game by setting up the interval to check the device orientation.
 * If the device is in portrait mode, it displays a message to rotate the device.
 * If the device is in landscape mode, it hides the message.
 */
function init() {
  setInterval(() => {
    if (window.innerHeight > window.innerWidth) {
      document.getElementById("main-container").classList.add("d-none");
      document.getElementById("rotate-device").classList.add("d-flex");
    } else {
      document.getElementById("main-container").classList.remove("d-none");
      document.getElementById("rotate-device").classList.remove("d-flex");
    }
  }, 1000 / 25);
}

/**
 * Starts the game by initializing the level, creating the game world, and setting up event listeners.
 * It also hides the start screen and plays the game music.
 */
function startGame() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameStarted = true;
  setTimeout(() => {
    document.getElementById("start-screen").classList.add("d-none");
    document.getElementById("btn-start-game").classList.add("d-none");
    document
      .getElementById("container-canvas")
      .classList.add("justify-content-start");
    if (!soundMute) {
      soundOn();
    }
    keyboard.buttonKeyPressEvents();
    keyboard.buttonKeyPressEventsUndo();
  }, 1000);
}


/**
 * Turns off the game sound and updates the UI accordingly.
 */
function soundOff() {
  document.getElementById("btn-sound-on").classList.add("d-none");
  document.getElementById("btn-sound-off").classList.add("d-flex");
  game_music.pause();
  soundMute = true;
}

/**
 * Turns on the game sound and updates the UI accordingly.
 */
function soundOn() {
  document.getElementById("btn-sound-on").classList.remove("d-none");
  document.getElementById("btn-sound-off").classList.remove("d-flex");
  game_music.play();
  soundMute = false;
}

/**
 * Ends the game with a win condition.
 * Pauses the game music, clears intervals, and displays the win screen.
 * Updates the UI and starts the game again.
 */
function winGame() {
  game_music.pause();
  clearAllIntervals();
  setTimeout(() => {
    document.getElementById("overlay").classList.add("d-flex");
    document.getElementById("win-screen").classList.add("d-flex");
    document
      .getElementById("container-canvas")
      .classList.remove("justify-content-start");
    backToStartScreen();
    init();
    gameStarted = false;
    if (!soundMute) {
      game_win_sound.play();
    }
  }, 2000); // Verzögerung von 2 Sekunden (2000 Millisekunden)
}

/**
 * Ends the game with a game over condition.
 * Pauses the game music, clears intervals, and displays the game over screen.
 * Updates the UI and starts the game again.
 */
function gameOver() {
  game_music.pause();
  clearAllIntervals();
  document.getElementById("overlay").classList.add("d-flex");
  document.getElementById("game-over-screen").classList.add("d-flex");
  document
    .getElementById("container-canvas")
    .classList.remove("justify-content-start");
  backToStartScreen();
  init();
  gameStarted = false;
  if (!soundMute) {
    game_over_sound.play();
  }
}

/**
 * Resets the game state and UI to the start screen.
 */
function backToStartScreen() {
  setTimeout(() => {
    document.getElementById("overlay").classList.remove("d-flex");
    document.getElementById("game-over-screen").classList.remove("d-flex");
    document.getElementById("win-screen").classList.remove("d-flex");
    document.getElementById("start-screen").classList.remove("d-none");
    document.getElementById("btn-start-game").classList.remove("d-none");
  }, 3000);
}

/**
 * Enters fullscreen mode for the game container element.
 * Updates the UI accordingly.
 */
function enterFullscreen() {
  let element = document.getElementById("container-canvas");
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
  document.getElementById("btn-full-screen").classList.add("d-none");
  document.getElementById("btn-close-full-screen").classList.add("d-flex");
  fullScreen = true;
}

/**
 * Exits fullscreen mode.
 * Updates the UI accordingly.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }

  document.getElementById("btn-full-screen").classList.remove("d-none");
  document.getElementById("btn-close-full-screen").classList.remove("d-flex");
  fullScreen = false;
}

/**
 * Clears all intervals to stop any running game processes.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Event listener for the keydown event.
 * Sets the corresponding keyboard properties based on the pressed key.
 * Prevents the default behavior for the space key to avoid scrolling.
 * @param {Event} e - The keydown event object.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
    event.preventDefault();
  }
});

/**
 * Event listener for the keyup event.
 * Clears the corresponding keyboard properties based on the released key.
 * @param {Event} e - The keyup event object.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
});
