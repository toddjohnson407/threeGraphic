/**
 * This file contains helper methods, variables
 * and constants used by other three js files
 */


///////////////////////////////
const plyrX = -3;
const playerSpeed = 0.05;
const obstBaseX = 3;
///////////////////////////////

let plyrY = -1.5;
let moving = false;
let alive = true;
///////////////////////////////


// Sleep function for fluid jumping
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

let rays = [
  // new THREE.Vector3(0, 0, 1),
  // new THREE.Vector3(1, 0, 1),
  // new THREE.Vector3(1, 0, 0),
  // new THREE.Vector3(1, 0, -1),
  // new THREE.Vector3(0, 0, -1),
  // new THREE.Vector3(-1, 0, -1),
  // new THREE.Vector3(-1, 0, 0),
  // new THREE.Vector3(-1, 0, 1)
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(1, 0, 0),
  // new THREE.Vector3(-1, , 0),
];

let caster = new THREE.Raycaster();
caster.far = 1;

/** Detects when player lands on a platform */
let detectPlatformLand = (obj1, obj2) => {
  obj1.geometry.computeBoundingBox();
  obj2.geometry.computeBoundingBox();
  obj1.updateMatrixWorld();
  obj2.updateMatrixWorld();
  var box1 = obj1.geometry.boundingBox.clone();
  box1.applyMatrix4(obj1.matrixWorld);
  var box2 = obj2.geometry.boundingBox.clone();
  box2.applyMatrix4(obj2.matrixWorld);

  // let isCollision = false;
  // for (let i = 0; i < rays.length; i++) {
  //   caster.set(obj2.position, rays[i]);
  //   let collide = caster.intersectObject(obj1);
  //   if (collide.length) isCollision = true;
  // }

  
  return box1.intersectsBox(box2)
  // return isCollision;
}

/**
 * Kills running animation
 */
let gameOver = () => {
  alive = false;
  document.removeEventListener('keyup', playerStop, false);
  document.addEventListener('keydown', playerMove, false);
}

/** Linear interpolation function */
let lip = (a, b, t) => a + (b - a) * t;

let ease = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
