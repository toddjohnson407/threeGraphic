
/** 
 * This is the main js file for three.js related
 * javascript project code
 */

// Create player object
let player = new Player(0.5, 0.5, {});;

// Create Obstacle objects
let obstacles = [
  // new Obstacle(0.5, 0.5, { color: '#999999' }),
  // new Obstacle(0.5, 0.5, { position: [3, -1.5, 1.65], color: '#ffffff' }),
  // new Obstacle(0.5, 0.5, { position: [8, -1.5, 1.65], color: '#ffffff' }),
  // new Obstacle(0.5, 0.5, { position: [12, -1.5, 1.65], color: '#ffffff' })
]

// Create Platform objects
let platforms = [
  new Platform(2, 2, { color: 'yellow' }),
]

obstacles.forEach(obst => scene.add(obst.mesh()))
platforms.forEach(platform => scene.add(platform.mesh()))

let groundGeo = new THREE.BoxGeometry(140, 1, 1.75);
let groundMat = new THREE.MeshStandardMaterial({ color: 0xff051 });
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, -3.1, 0);
scene.add(ground, player.mesh);

/**
 * Performs player object movement
 */
let playerMove = (e = window.event) => {
  if (e.code === 'Space' && player.doubleJumping === false) {

    // player.preJumpX = player.posX;
    // player.postJumpX = player.preJumpX + 2;

    
    if (player.jumping) {
      console.log('here');
      player.doubleJump();
      // player.incY += 0.05;
      // player.doubleIncY();
    }
    else {
      // player.incY = player.baseIncY;
      // player.posY = plyrY;
      // player.meshObj.rotation.z = 0;
      player.jump();
    }
    player.pastHalfway = false;
    player.preJumpX = player.posX;
    player.postJumpX = player.preJumpX + 2;
  }
}

/** Confirm player jump is complete */
// let playerLanded = (e = window.event) => player.landed(e.which);

/** Moves Obstacle object to oppositte side of view */
let resetObst = (obst) => obst.mesh().position.x = obstBaseX;
/** Moves Objstacle object */
let moveObst = (obst) => obst.move();

// Listen for space bar keydown to trigger jump
document.addEventListener('keydown', playerMove, false);;

let obstacle = obstacles[0];


// Performs animations on current scene
let animate = () => {
  if (player.jumping) {
    player.checkJump();
    player.playerRotZ(-0.075);
    player.posX += player.incX;
    player.posY += player.pastHalfway ? 0 - player.incY : player.incY;
    camera.position.x += 0.05;
  }

  if (player.falling) {
    player.checkFall();
    player.posY -= player.baseIncY;
  }

  platforms.forEach(platform => {
    let isColl = detectPlatformLand(player.mesh, platform.mesh());
    let isOnTop = player.posX > platform.mesh().position.x - (platform.width / 2);
    if (isColl && isOnTop) {
      if (player.jumping) {
        // console.log('isOnTop:', isOnTop);
        player.stopJump();
        player.stopDoubleJump();
        player.posY = platform.mesh().position.y + (platform.height / 1.55);
      }
    } else if (isColl && !isOnTop) {
      if (player.jumping) {
        player.stopJump();
        player.stopDoubleJump();
        player.fall();
      }
    }
  });

  alive && requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
 
animate();

