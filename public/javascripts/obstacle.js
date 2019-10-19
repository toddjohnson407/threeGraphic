/**
 * Represents a three.js Mesh object that is an
 * obstacle for the player object
 */
class Obstacle {
  
  meshObj;

  constructor(width, height, { position = [0, -1.5, 1.65], color = '#019CBB', depth = 0.5 }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position
    this.meshObj = null;
  }

  mesh() {
    if (!this.meshObj) {
      let geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
      let material = new THREE.MeshStandardMaterial({ color: this.color });
      this.meshObj = new THREE.Mesh(geometry, material);
      this.meshObj.position.set(this.position[0], this.position[1], this.position[2]);
    }
    return this.meshObj;
  }

  /**
   * Moves Obstacle instance towards the
   * Player object
   */
  move = () => this.meshObj.position.x += -0.1;

  /** Resets obstacle's position */
  resetObst = (obst) => obst.position.x = obstBaseX;

}
