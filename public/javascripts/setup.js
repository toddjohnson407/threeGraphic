/**
 * Setups the three.js enviromnet, scene, and world
 */

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
camera.position.z = 5.5;
camera.position.x = -0.25;
camera.position.y = 0;

// Custom ighting for scene
let ambientLight = new THREE.AmbientLight ( 0xffffff, 0.5)
let pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add(ambientLight, pointLight);
