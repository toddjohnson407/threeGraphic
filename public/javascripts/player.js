/**
 * Represents the player of the game as
 * as three.js Mesh object 
 */
class Player {
  /** Whether or not the player is currently in the action of jumping */
  // jumping;
  /** Whether or not the player is currently in the action of double jumping */
  doubleJumping;
  /** The three.js Mesh object of the player */
  meshObj;
  /** The X coordinate of the player when the begin a jump */
  preJumpX;
  /** The X coordinate of the player's future destination once a jump is complete */
  postJumpX;
  /** The unit increment of how much the player's Y coordinate changes each animate cycle  */
  incY;
  /** Whether or not the player is more than halfway through its jump */
  pastHalfway;
  /** The current action state the player is in */
  actionState;

  // /** Whether or not the player is currently moving { right: boolean, left: boolean } */
  // moving;
  // onPlat;
  // falling;

  constructor(width, height, { position = [-3, -1.5, 1.65], color = '#019CBB', depth = 0.5 }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position;

    this.incY = 0.1;
    this.incX = 0.055;

    // this.jumping = false;
    this.doubleJumping = false;
    this.pastHalfway = false;

    this.actionState = 'static';

    this.preJumpX = null;
    this.postJumpX = null;

    let geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    let material = new THREE.MeshStandardMaterial({ color: this.color });
    this.meshObj = new THREE.Mesh(geometry, material);
    this.meshObj.position.set(this.position[0], this.position[1], this.position[2]);
  }

  /** Whether or not the player is currently in the action of jumping */
  get jumping() { return this.actionState === 'jumping'}l
  /** Whether or not the player is currently in the action of falling */
  get falling() { return this.actionState === 'falling'}l

  get mesh() {
    if (!this.meshObj) {
      let geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
      let material = new THREE.MeshStandardMaterial({ color: this.color });
      this.meshObj = new THREE.Mesh(geometry, material);
      this.meshObj.position.set(this.position[0], this.position[1], this.position[2]);
    }
    return this.meshObj;
  }

  get posX() { return this.mesh.position.x; }
  get posY() { return this.mesh.position.y; }
  set posX(pos) { this.meshObj.position.x = pos; }
  set posY(pos) { this.meshObj.position.y = pos; }

  get baseIncY() { return 0.075 }


  doubleIncY = () => {
    // if (this.pastHalfway) {
    //   this.incY += this.baseIncY;
    //   console.log('pastHalf double');
    // } else {
      // console.log('preHalf double');
      // let percentageToHalfway = (this.distanceBetween(this.preJumpX, this.posX) / (this.distanceX / 2));
      // if (percentageToHalfway > 1) {
      //   console.log('over halfway');
      //   percentageToHalfway -= 1;
        
      // } else {
      //   console.log('under halfway');
      // }
      // this.incY += (this.baseIncY * percentageToHalfway);
    // }
  }
  

  /** Returns the X coordinate halfway between pre and post jump X values  */
  get halfwayX() { return this.preJumpX + (this.distanceX / 2); }

  /** Returns the distance between pre and post jump X values */
  get distanceX() { return this.distanceBetween(this.preJumpX, this.postJumpX); }

  /** Returns the distance between to values */
  distanceBetween = (lowVal, highVal) => {
    if (lowVal < 0 && highVal > 0)
      return Math.abs(lowVal) + highVal;
    else if (lowVal < 0 && highVal < 0) 
      return Math.abs(lowVal) - Math.abs(highVal);
      
    return highVal - this.preJumpX;
  }
  
  /**
   * Performs player object jump motion
   */
  jump = () => this.actionState = 'jumping';
  stopJump = () => this.actionState = 'static';
  fall = () => this.actionState = 'falling';
  stopFall = () => this.actionState = 'static';
  doubleJump = () => this.doubleJumping = true;
  stopDoubleJump = () => this.doubleJumping = false;

  /** Checks whether or not the player should still be jumping */
  checkJump = () => {
    // If the player has reached or exceeded his postJumpX coordinate
    // then stop jumping and set new pre/post x coordinates
    // if (this.posX >= this.postJumpX || (this.posY <= plyrY && this.pastHalfway)) {
    if ((this.posY <= plyrY && this.pastHalfway)) {
      this.stopJump();
      this.stopDoubleJump();
      this.posY = plyrY;
      console.log('jump ending posY:', this.posY);
    }
    if (!this.pastHalfway && this.posX >= this.halfwayX) {
      this.pastHalfway = true;
      // if (this.doubleJumping) player.incY += 0.05;
    }
  }

  /** Checks whether or not the player should still be falling */
  checkFall = () => {
    if (this.posY <= plyrY) {
      this.stopFall();
    }
  }
  
  /** Moves the player's y position by inc */
  playerPosY = (inc) => this.meshObj.position.y += inc;
  /** Moves the player's x/y/z rotation by inc */
  playerRotX = (inc) => this.meshObj.rotation.x += inc;
  playerRotY = (inc) => this.meshObj.rotation.y += inc;
  playerRotZ = (inc) => this.meshObj.rotation.z += inc;
}
