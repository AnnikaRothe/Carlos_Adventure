/**
 * Represents the keyboard input for controlling the game.
 */
class Keyboard {
  RIGHT = false;
  LEFT = false;
  UP = false;
  SPACE = false;

  /**
   * Adds event listeners for button key press events.
   */
  buttonKeyPressEvents() {
    document
      .getElementById("btn-walk-left")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.LEFT = true;
      });
    document
      .getElementById("btn-walk-right")
      .addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });
    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.UP = true;
    });
    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
  }

  /**
   * Adds event listeners for button key release events.
   */
  buttonKeyPressEventsUndo() {
    document
      .getElementById("btn-walk-left")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        this.LEFT = false;
      });
    document
      .getElementById("btn-walk-right")
      .addEventListener("touchend", (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });
    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.UP = false;
    });
    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
  }
}

