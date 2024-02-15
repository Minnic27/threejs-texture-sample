import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

// Variables
let model;

// Setting up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// OrbitControls
const cameraControl = new OrbitControls(camera, renderer.domElement);

// Textures
const earthTexture = new THREE.TextureLoader().load("./assets/textures/earth.jpg");
const cloudTexture = new THREE.TextureLoader().load("./assets/textures/clouds.jpg");

// Lights
const directionalLight = new THREE.DirectionalLight(0xdec487, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xf5b158, 1, 0);
pointLight.position.set(0, 0, 30);
scene.add(pointLight);

// Earth
const earthGeometry = new THREE.SphereGeometry(15);
const earthMaterial = new THREE.MeshLambertMaterial( { map: earthTexture } );
const earth = new THREE.Mesh( earthGeometry, earthMaterial );
earth.position.set(0,0,-50);
scene.add( earth );

// Clouds
const cloudsGeometry = new THREE.SphereGeometry(15.2);
const cloudsMaterial = new THREE.MeshBasicMaterial( { map: cloudTexture, transparent: true, opacity: 0.4 } );
const clouds = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
clouds.position.set(0,0,-50);
scene.add( clouds );


camera.position.set(0,0,0.1);
camera.lookAt(scene.position);
//cameraControl.target = camera.position;

// 3D Model
const model3d = new GLTFLoader();
model3d.load("./assets/prefabs/paimon/paimon.gltf", function(paimon){
    model = paimon;
    scene.add(paimon.scene);
    paimon.scene.position.set(-20,-5,-20);
    renderer.render(scene, camera);
})


function animate() {
	requestAnimationFrame( animate );
    //start animate code HERE

    //paimon.rotation.x += 0.001;

    if (model) {
        model.scene.rotation.y += 0.005;
    }

    cameraControl.update();
    earth.rotation.y += 0.001;
    clouds.rotation.y -= 0.001;

    //end animate code HERE
	renderer.render( scene, camera );
}
animate();