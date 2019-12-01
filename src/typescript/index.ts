import Canvas from './class/Canvas';
import Planet from './class/Planet/index';
import * as THREE from 'three';

const canvas = new Canvas(document.getElementById('body'));
const planet = new Planet(canvas);
canvas.camera.position.z = 6;

canvas.scene.add(new THREE.AmbientLight('#404040'));

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
	'../images/skybox.png',
	'../images/skybox.png',
	'../images/skybox.png',
	'../images/skybox.png',
	'../images/skybox.png',
	'../images/skybox.png'
]);
canvas.scene.background = texture;

function animate() {
	planet.mesh.rotation.y += 0.001;
	canvas.renderer.render(canvas.scene, canvas.camera);
	requestAnimationFrame(animate);
}
animate();