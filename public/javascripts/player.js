/**
 * Represents the player of the game as
 * as three.js Mesh object 
 */
class Player {
  
  jumping;
  meshObj;

  constructor(width, height, { position = [-3, -1.5, 1.65], color = '#019CBB', depth = 0.5 }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position;
    this.jumping = false;
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

  move(keyCode) {
    console.log(keyCode);
    if (keyCode == 37) {
      this.meshObj.position.x -= playerSpeed;
    } else if (keyCode == 39) {
      this.meshObj.position.x += playerSpeed;
    } else if (keyCode === 32 && !this.jumping && this.meshObj.position.y === -1.5) this.jumping = true;
  }

  /**
   * Performs player object jump motion
   */
  jump = async () => {
    // console.log(this.meshObj.position.y)
    this.jumping = true;
    for (let i = 0; i < 90; i++) {
      await sleep(1);
      this.meshObj.translateX(0.03);

    }
    for (let i = 0; i < 90; i++) {
      await sleep(1);
      this.playerPosY(-0.03);
    }
  }

  /** Sets jumping to true once player has landed */
  landed = (keyCode) => keyCode === 32 && (this.jumping = false);


  /** Moves the player's y position by inc */
  playerPosY = (inc) => this.meshObj.position.y += inc;
  /** Moves the player's x/y/z rotation by inc */
  playerRotX = (inc) => this.meshObj.rotation.x += inc;
  playerRotY = (inc) => this.meshObj.rotation.y += inc;
  playerRotZ = (inc) => this.meshObj.rotation.z += inc;

}
