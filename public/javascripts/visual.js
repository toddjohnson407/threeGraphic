
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
  // new Platform(2, 0.25, { color: 'yellow' }),
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
  if (e.code === 'Space' && player.jumping === false && !player.falling && player.mesh().position.y <= -1) {
    preJumpX = player.mesh().position.x;
    postJumpX = preJumpX + 1;
    player.jump();
  }
  // else player.move(e.which);
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
// document.addEventListener('keyup', playerStop, false);

let obstacle = obstacles[0];

var t = 0, dt = 0.02;
var t2 = 0, dt2 = 0.02;

var tY = 0, dtY= 0.02;
var tX = 0, dtX= 0.02;

var yDest = 1;

// Performs animations on current scene
let animate = () => {
  
  obstacles.forEach(obst => (detectCollision(player.mesh(), obst.mesh()) && gameOver()))

  if (player.jumping) {
    console.log('jumping', preJumpX, postJumpX);
    let newX = lip(preJumpX, postJumpX, ease(tX));
    let newY = lip(plyrY, 1, ease(tY));
    // let newY = lip(plyrY, yDest, ease(tY));

    player.mesh().position.x = newX;
    player.mesh().position.y = newY;

    tY += dtY;
    tX += dtX;
    if (tY <= 0 || tY >= 1) {
      console.log('inverting:');
      // yDest = -1.5;
      dtY = -dtY;
    }
    // if (tY <= 0 || tY >= 1) dY = -dY;
  }

  if (player.jumping && player.mesh().position.y <= -1.5) {
  // if (player.jumping && player.mesh().position.x >= postJumpX) {
    console.log('stopping jump');
    console.log('player y position:', player.mesh().position.y);
    console.log('postJumpX:', postJumpX);
    console.log('player.mesh().position.x:', player.mesh().position.x);
    player.stopJump();
    // player.mesh().position.y = -1.5;
    preJumpX = postJumpX;
    postJumpX = postJumpX + 1;
  }

  // if (player.falling && !player.jumping) {
  //   console.log('falling', plyrY);
  //   let newY = lip(plyrY, -1.5, ease(t));

  //   let newX = lip(plyrX, -5.5, ease(t));  

  //   player.mesh().position.x = newX;  // set new X position

  //   player.mesh().position.y = newY;  // set new Y position
  //   t -= dt;
  //   if (t <= 0 || t >= 1) dt = -dt;
  //   if (t2 <= 0 || t2 >= 1) player.stopFall();
  // }
  // if (player.jumping && !player.falling) {
  //   let newY = lip(plyrY, 1, ease(t2));
  //   let newX = lip(plyrX, -2, ease(t2));
  //   console.log('jumping Y:', plyrY, newY);
  //   console.log('jumping X:', plyrX, newX);

  //   player.mesh().position.x = newX; // set new X position

  //   player.mesh().position.y = newY;  // set new Y position
  //   t2 += dt2;
  //   if (t2 <= 0 || t2 >= 1) dt2 = -dt2;
  // }
  
  
  
  platforms.forEach(platform => {
    let isColl = detectPlatformLand(player.mesh(), platform.mesh());
    if (isColl && !player.onPlat) {
      player.onPlat = true;
      plyrY = platform.mesh().position.y + 0.35;
      plyrX = platform.mesh().position.x;
      player.mesh().position.y = plyrY;

      player.mesh().position.x = plyrX;

      player.stopJump();
      player.stopFall();
      // t2 = 0; dt2 = 0.02;
      t = 0; dt = 0.02;
    } else if (player.onPlat && !isColl && !player.jumping) {
      player.stopJump();
      t2 = 0; dt2 = 0.02;
      plyrY = platform.mesh().position.y + 0.35;
      plyrX = platform.mesh().position.x + 0.35;
      player.fall();
      player.onPlat = false;
    }
  });
  
  if (player.falling && player.mesh().position.y <= -1.5) {
    player.stopFall();
    dt2 = 0.02; t2 = 0;
    plyrY = -1.5;
  }
  if (player.jumping && player.mesh().position.y === plyrY) player.stopJump()

  // if (player.moving.left) {
  //   player.mesh().position.x += 0.05;
  //   player.playerRotZ(-0.05);
  //   camera.position.x += 0.05;
  // }
  // if (player.moving.right) {
  //   player.mesh().position.x -= 0.05
  //   player.playerRotZ(0.05);
  //   camera.position.x -= 0.05;
  // }

  // (obstacle.mesh().position.x < -8) && resetObst(obstacle);
  alive && requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
 
animate();

