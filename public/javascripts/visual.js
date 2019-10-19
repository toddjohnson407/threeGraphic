
/** 
 * This is the main js file for three.js related
 * javascript project code
 */

// GAME SPECIFIC CONSTANTS/VARS //

/////////////////////////////////

// GAME SPECIFIC HELPER METHODS //



/////////////////////////////////

// Orbit Controls
let controls;
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
  new Obstacle(0.5, 0.5, { color: '#ffffff' })
]

obstacles.forEach(obst => scene.add(obst.mesh()))

let groundGeo = new THREE.BoxGeometry(14, 1, 1.75);
let groundMat = new THREE.MeshStandardMaterial({ color: 0xff051 });
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, -3.1, 0);
scene.add(ambientLight, pointLight, ground, player.mesh());

console.log(camera, renderer.domElement)
let createControls = () => {
  controls = new THREE.OrbitControls( camera, renderer.domElement );
}

createControls();


/**
 * Performs player object jump motion
 * 
 * @param {*} e keyup event
 */
let playerJump = async (e = window.event) => (e.code === 'Space' && !player.jumping) && player.jump()
/**
 * Performs player object movement
 */
let playerMove = (e = window.event) => player.move(e.which);
/** Confirm player jump is complete */
// let playerLanded = (e = window.event) => player.landed(e.which);

/** Moves Obstacle object to oppositte side of view */
let resetObst = (obst) => obst.mesh().position.x = obstBaseX;
/** Moves Objstacle object */
let moveObst = (obst) => obst.move();

// document.addEventListener('keypress', playerJump, false);
document.addEventListener('keyup', playerJump, false);
document.addEventListener('keydown', playerMove, false);

let obstacle = obstacles[0];

console.log(player.mesh().position, obstacle.mesh().position);
// Performs animations on current scene
let animate = () => {
  // !player.jumping && player.mesh().position.y === -1.5 && player.jump();
  detectCollision(player.mesh(), obstacle.mesh()) && gameOver();
  (obstacle.mesh().position.x < -8) && resetObst(obstacle);
  alive && requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
 
animate();


/**
 * Kills running animation
 */
let gameOver = () => {
  alive = false;
  document.removeEventListener('keyup', playerJump, false);
  document.addEventListener('keydown', playerMove, false);
}
