/**
 * Represents a collectible object in the game.
 * Extends the DrawableObject class.
 * The offset defines the distance (offset) between the edges of 
 * the visible area of the CollectableObject and the edges of its actual collision area.
 * It consists of the properties top, left, right, and bottom, each specifying the distance in pixels.
 */
class CollectableObject extends DrawableObject {
  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10,
  };
}
