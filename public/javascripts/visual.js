
/** 
 * This is the main js file for three.js related
 * javascript project code
 */

// GAME SPECIFIC CONSTANTS/VARS //

/////////////////////////////////

// GAME SPECIFIC HELPER METHODS //



/////////////////////////////////

// // Orbit Controls
// let controls;

// The area which objects are rendered
let scene = new THREE.Scene();
// View angle of scene
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Renders scene
let renderer = new THREE.WebGLRenderer({ antialias: true});
// Set size attributes of the renderer
renderer.setSize( window.innerWidth, window.innerHeight );
// Place renderer DOM
document.body.appendChild( renderer.domElement );

// Set the coordinate position of the view camera
camera.position.z = 5;
camera.position.x = -0.25;
camera.position.y = 0;

// Custom ighting for scene
let ambientLight = new THREE.AmbientLight ( 0xffffff, 0.5)
let pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );

// Create player object
let player = new Player(0.5, 0.5, {});;

// Create Obstacle objects
let obstacles = [
  new Obstacle(0.5, 0.5, { color: '#ffffff' }),
  new Obstacle(0.5, 0.5, { position: [3, -1.5, 1.65], color: '#ffffff' }),
  new Obstacle(0.5, 0.5, { position: [8, -1.5, 1.65], color: '#ffffff' }),
  new Obstacle(0.5, 0.5, { position: [12, -1.5, 1.65], color: '#ffffff' })
]

obstacles.forEach(obst => scene.add(obst.mesh()))

let groundGeo = new THREE.BoxGeometry(140, 1, 1.75);
let groundMat = new THREE.MeshStandardMaterial({ color: 0xff051 });
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, -3.1, 0);
scene.add(ambientLight, pointLight, ground, player.mesh());



/**
 * Performs player object jump motion
 * 
 * @param {*} e keyup event
 */
// let playerJump = async (e = window.event) => (e.code === 'Space' && !player.jumping) && player.jump()
let playerJump = (e = window.event) => {
  if (e.code === 'Space' && player.jumping === false) player.jump();
};
/**
 * Performs player object movement
 */
let playerMove = (e = window.event) => {
  // console.log(e.which);
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
var duration = 2.0;               // seconds
var step = 1 / (duration * fps);  // t-step per frame
var t = 0, dt = 0.02;

// Performs animations on current scene
let animate = () => {
  // !player.jumping && player.mesh().position.y === -1.5 && plßayer.jump();
  obstacles.forEach(obst => (detectCollision(player.mesh(), obst.mesh()) && gameOver()))
  // detectCollision(player.mesh(), obstacle.mesh()) && gameOver();

  if (player.jumping) {
    let newY = lip(-1.5, 1, ease(t));  
    player.mesh().position.y = newY;  // set new position
    t += dt;
    if (t <= 0 || t >= 1) dt = -dt; 
  }
  if (player.jumping && player.mesh().position.y === baseY) player.stopJump()

  if (player.moving.left) {
    player.mesh().position.x += 0.05;
    camera.position.x += 0.05;
  }
  if (player.moving.right) {
    player.mesh().position.x -= 0.05
    camera.position.x -= 0.05;
  }

  // (obstacle.mesh().position.x < -8) && resetObst(obstacle);
  alive && requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
 
animate();

