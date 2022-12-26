import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// renderer.setClearColor('chocolate');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(100, 50, 10);
orbit.update();
////////////////LOADERS///////////////////////

const loadingManager = new THREE.LoadingManager();

//declaramos var para cargar la barra
const progressBar = document.getElementById('progress-bar');

loadingManager.onProgress = function( url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
    console.log(`started Loading: ${url} ${total}`);
};

const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onLoad = function() {
    progressBarContainer.style.display = 'none';
}

///////////////ESCENA HDRI////////////////////
const hdrTextURL = new URL("../img/natStudio.hdr", import.meta.url);

///TRATAMIENTO DE LA IMAGEN /////////////////
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

const loader = new RGBELoader(loadingManager);
loader.load(hdrTextURL, function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  //para añadir la iluminacion del HDRI:
  scene.environment = texture;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 50, 50),
    new THREE.MeshStandardMaterial({
      color: "chocolate",
      metalness: 1,
      roughness: 0.1,
      transparent: true,
      
    }),
    loadingManager

  );
  scene.add(sphere);
});
//////////////////////////////////////////////////

//////////////////OBJETOS/////////////////////////
const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  new THREE.MeshStandardMaterial({
    color: "olive",
    metalness: 1,
    roughness: 0.8,
    transparent: true,
  }),
  loadingManager
);
scene.add(sphere2);
sphere2.position.x = -5;

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  new THREE.MeshStandardMaterial({
    color: "red",
    metalness: 1,
    roughness: 0.8,
    transparent: true,
  })
);
scene.add(sphere3);
sphere3.position.x = -5;

const sphere4 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  new THREE.MeshStandardMaterial({
    color: "orange",
    metalness: Math.random(Math.sin()),
    roughness: 0,
    transparent: true,
  })
);
scene.add(sphere4);
sphere4.position.x = -5;

const sphere5 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 50, 50),
  new THREE.MeshStandardMaterial({
    metalness: 1,
    roughness: 0,
    transparent: true,
  })
);
scene.add(sphere5);
sphere5.position.x = -5;

function animate(time) { 

  sphere2.position.x = 5 * Math.sin(time / 1000);
  sphere2.position.y = 5 * Math.cos(time / 1000);
  
  sphere3.position.x = 15 * Math.sin(time / 1000);
  sphere3.position.z = 15 * Math.cos(time / 1000);
  
  sphere4.position.x = 25 * Math.sin(time / 1000);
  sphere4.position.y = 25 * Math.cos(time / 1000);
  sphere4.material.metalness = Math.sin(time/ 500);
  sphere4.material.roughness = Math.cos(time/ 500);
  
  sphere5.position.x = 35 * Math.sin(time / 1000);
  sphere5.position.z = 35 * Math.cos(time / 1000);

  


  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  (camera.aspect = window.innerWidth / this.window.innerHeight),
    camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
