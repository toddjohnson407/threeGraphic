/**
 * Represents the player of the game as
 * as three.js Mesh object 
 */
class Player {
  
  jumping;
  moving;
  meshObj;
  onPlat;
  falling;

  constructor(width, height, { position = [-3, -1.5, 1.65], color = '#019CBB', depth = 0.5 }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position;
    this.jumping = false;
    this.onPlat = false;
    this.falling = false;
    this.meshObj = null;
    this.moving = { right: false, left: false }
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

  move(keyCode) {
    if (keyCode == 39) {
      this.moving.right = false
      this.moving.left = true;
    } else if (keyCode == 37) {
      this.moving.left = false;
      this.moving.right = true;
    }
  }

  stopMove(keyCode) {
    if (keyCode == 39) {
      this.moving.left = false;
    } else if (keyCode == 37) {
      this.moving.right = false;
    }
  }

  fall = () => {
    
  }

  /**
   * Performs player object jump motion
   */
  jump = () => this.jumping = true
  stopJump = () => this.jumping = false

  /**
   * Performs player object fall motion
   */
  fall = () => this.falling = true
  stopFall = () => this.falling = false

  // /** Sets jumping to true once player has landed */
  // landed = (keyCode) => keyCode === 32 && (this.jumping = false);


  /** Moves the player's y position by inc */
  playerPosY = (inc) => this.meshObj.position.y += inc;
  /** Moves the player's x/y/z rotation by inc */
  playerRotX = (inc) => this.meshObj.rotation.x += inc;
  playerRotY = (inc) => this.meshObj.rotation.y += inc;
  playerRotZ = (inc) => this.meshObj.rotation.z += inc;

}
