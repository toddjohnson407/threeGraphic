
/** 
 * This is the main js file for three.js related
 * javascript project code
 */


/**
 * Represents a three.js Mesh object that is an
 * obstacle for the player object
 */
class Obstacle {
  
  constructor(width, height, { position = [0, -1.5, 1.65], color = '#019CBB', depth = 0.5 }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position
  }

  mesh() {
    let geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    let material = new THREE.MeshStandardMaterial({ color: this.color });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.position[0], this.position[1], this.position[2]);
    return mesh;
  }
}


// GAME SPECIFIC CONSTANTS/VARS //

const baseY = -1.5;
const plyrX = -3;
const playerSpeed = 0.05;
const obstBaseX = 3;
let jumping = false;
let moving = false;
let alive = true;

/////////////////////////////////

// GAME SPECIFIC HELPER METHODS //

// Sleep function for fluid jumping
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Moves the player's y position by inc
let playerPosY = (inc) => player.position.y += inc;
// Moves the player's x/y rotation by inc
let playerRotX = (inc) => player.rotation.x += inc;
let playerRotY = (inc) => player.rotation.y += inc;
let playerRotZ = (inc) => player.rotation.z += inc;

/////////////////////////////////


// The area which objects are rendered
const scene = new THREE.Scene();
// View angle of scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Renders scene
const renderer = new THREE.WebGLRenderer({ antialias: true});
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
// Add custom lighting to scene
scene.add( ambientLight, pointLight )

// Create player object
let playerGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let playerMat = new THREE.MeshStandardMaterial({ color: '#fa6963' });
let player = new THREE.Mesh(playerGeo, playerMat);
player.position.set(-3, -1.5, 1.65);
scene.add(player);

// Create Obstacle objects
let obstacles = [
  new Obstacle(0.5, 0.5, { color: '#ffffff' }).mesh(),
]
obstacles.forEach(obst => scene.add(obst));

let groundGeo = new THREE.BoxGeometry(14, 1, 1.75);
let groundMat = new THREE.MeshStandardMaterial({ color: 0xff051 });
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.set(0, -3.1, 0);
scene.add(ground, player);

/**
 * Performs player object jump motion
 * 
 * @param {*} e keyup event
 */
let playerJump = async (e = window.event) => {
  if (e.code === 'Space' && !jumping) {
    jumping = true;
    for (let i = 0; i < 90; i++) {
      await sleep(7);
      playerPosY(0.03);
      // playerRotX(0.03);
    }
    for (let i = 0; i < 90; i++) {
      await sleep(7);
      playerPosY(-0.03);
      // playerRotX(0.05);
    }
    jumping = false;
  }
}


/**
 * Performs player object movement
 */
let playerMove = (e = window.event) => {
  let keyCode = e.which;
  console.log(keyCode);

 if (keyCode == 37) {
    player.position.x -= playerSpeed;
  } else if (keyCode == 39) {
    player.position.x += playerSpeed;
  }
}

/** Moves Obstacle object to oppositte side of view */
let resetObst = (obst) => {
  obst.position.x = obstBaseX;
}

/**
 * Moves Obstacle object towards player
 * object
 * 
 * @param {Obstacle} obst Obstactle instance to be moved
 */
let moveObst = (obst) => {
  obst.position.x += -0.04;
}

document.addEventListener('keypress', playerJump, false);
document.addEventListener('keydown', playerMove, false);

let obstacle = obstacles[0];

/** Detects collision between player and an Obstacle */
let detectCollision = (obj1, obj2) => {
  obj1.geometry.computeBoundingBox();
  obj2.geometry.computeBoundingBox();
  obj1.updateMatrixWorld();
  obj2.updateMatrixWorld();
  
  var box1 = obj1.geometry.boundingBox.clone();
  box1.applyMatrix4(obj1.matrixWorld);

  var box2 = obj2.geometry.boundingBox.clone();
  box2.applyMatrix4(obj2.matrixWorld);

  return box1.intersectsBox(box2);
}



// Performs animations on current scene
let animate = () => {

  // camera.position.x += 0.1;
  detectCollision(player, obstacle) && gameOver();

  (obstacle.position.x < -8) && resetObst(obstacle);
  
  // moveObst(obstacle);
  
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
