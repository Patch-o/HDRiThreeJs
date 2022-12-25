import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

const renderer =  new THREE.WebGL1Renderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// renderer.setClearColor('chocolate');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit =  new OrbitControls(camera , renderer.domElement);

camera.position.set(100,50,10);
orbit.update();         



///////////////ESCENA HDRI////////////////////
const hdrTextURL = new URL('../img/natStudio.hdr', import.meta.url) 


///TRATAMIENTO DE LA IMAGEN /////////////////
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

const loader = new RGBELoader();
loader.load(hdrTextURL, function(texture) {
    texture.mapping =THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    //para añadir la iluminacion del HDRI:
    scene.environment = texture;

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(2,50,50),
        new THREE.MeshStandardMaterial({
            color: 'chocolate',
            metalness: 1,
            roughness:0.1,
            transparent: true,
           
        })
    ); 
    scene.add(sphere);

    const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(2,50,50),
        new THREE.MeshStandardMaterial({
            color: 'blue',
            metalness: 1,
            roughness:0.8,
            transparent: true,

           
        })
    ); 
    scene.add(sphere2);
    sphere2.position.x = -5;
    

});
//////////////////////////////////////////////////

//////////////////OBJETOS/////////////////////////


function animate() {
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function(){
    camera.aspect = window.innerWidth / this.window.innerHeight,
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});