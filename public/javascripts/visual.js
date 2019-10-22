
/** 
 * This is the main js file for three.js related
 * javascript project code
 */

// Create player object
let player = new Player(0.5, 0.5, {});;

// Create Obstacle objects
let obstacles = [
  new Obstacle(0.5, 0.5, { color: '#999999' }),
  new Obstacle(0.5, 0.5, { position: [3, -1.5, 1.65], color: '#ffffff' }),
  new Obstacle(0.5, 0.5, { position: [8, -1.5, 1.65], color: '#ffffff' }),
  new Obstacle(0.5, 0.5, { position: [12, -1.5, 1.65], color: '#ffffff' })
]

// Create Platform objects
let platforms = [
  new Platform(2, 0.25, { color: 'yellow' }),
]

obstacles.forEach(obst => scene.add(obst.mesh()))
platforms.forEach(platform => scene.add(platform.mesh()))

let groundGeo = new THREE.BoxGeometry(140, 1, 1.75);
let groundMat = new THREE.MeshStandardMaterial({ color: 0xff051 });
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, -3.1, 0);
scene.add(ground, player.mesh());

/**
 * Performs player object movement
 */
let playerMove = (e = window.event) => {
  if (e.code === 'Space' && player.jumping === false) player.jump();
  else player.move(e.which);
}

let playerStop = (e = window.event) => {
  player.stopMove(e.which);
}

/** Confirm player jump is complete */
// let playerLanded = (e = window.event) => player.landed(e.which);

/** Moves Obstacle object to oppositte side of view */
let resetObst = (obst) => obst.mesh().position.x = obstBaseX;
/** Moves Objstacle object */
let moveObst = (obst) => obst.move();

// document.addEventListener('keydown', playerJump, false);
document.addEventListener('keydown', playerMove, false);
document.addEventListener('keyup', playerStop, false);

let obstacle = obstacles[0];

var fps = 60;
var duration = 1.0;               // seconds
var step = 1 / (duration * fps);  // t-step per frame
var t = 0, dt = 0.02;
// Performs animations on current scene
let animate = () => {

  obstacles.forEach(obst => (detectCollision(player.mesh(), obst.mesh()) && gameOver()))

  if (player.jumping) {
    player.stopFall();
    let newY = lip(plyrY, 1, ease(t));  
    player.mesh().position.y = newY;  // set new position
    t += dt;
    if (t <= 0 || t >= 1) dt = -dt; 
  }

  if (player.falling && player.mesh().position.y === -1.5) {
    plyrY = -1.5;
    player.stopFall()
  }
  if (player.falling) {
    player.stopJump();
    let newY = lip(plyrY, -1.5, ease(t));  
    player.mesh().position.y = newY;  // set new position
    t += dt;
    if (t <= 0 || t >= 1) dt = -dt; 
  }

  if (player.jumping && player.mesh().position.y === plyrY) player.stopJump()

  platforms.forEach(platform => {
    let isColl = detectPlatformLand(player.mesh(), platform.mesh());
    if (isColl && !player.onPlat) {
      player.onPlat = true;
      plyrY = platform.mesh().position.y + 0.35;
      player.mesh().position.y = plyrY;
      player.stopJump();
      player.stopFall();
    } else if (player.onPlat && !isColl) {
      // player.jump();
      player.fall();
      // console.log(player.falling);
      // plyrY = -1.5;
      player.onPlat = false;
    } else if (!player.onPlat && !isColl) player.fall();
    // else toY = plyrY;
  })

  if (player.moving.left) {
    player.mesh().position.x += 0.05;
    player.playerRotZ(-0.05);
    camera.position.x += 0.05;
  }
  if (player.moving.right) {
    player.mesh().position.x -= 0.05
    player.playerRotZ(0.05);
    camera.position.x -= 0.05;
  }

  // (obstacle.mesh().position.x < -8) && resetObst(obstacle);
  alive && requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
 
animate();

