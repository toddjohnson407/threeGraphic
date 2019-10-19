/**
 * This file contains helper methods, variables
 * and constants used by other three js files
 */


///////////////////////////////
const baseY = -1.5;
const plyrX = -3;
const playerSpeed = 0.05;
const obstBaseX = 3;
///////////////////////////////
let jumping = false;
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

/**
 * Kills running animation
 */
let gameOver = () => {
  alive = false;
  document.removeEventListener('keyup', playerJump, false);
  document.addEventListener('keydown', playerMove, false);
}

/** Linear interpolation function */
let lip = (a, b, t) => a + (b - a) * t;

let ease = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
