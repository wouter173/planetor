//@ts-ignore
import { OrbitControls } from '../OrbitControls';
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from 'three';

class Canvas implements CanvasI {
	parent: HTMLElement;
	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
	controls: OrbitControls;
  width: number;
  height: number;
	resize: boolean;

	constructor(parent: HTMLElement, width?: number, height?: number) {
  	this.parent = parent;
  	this.width = width ? width : window.innerWidth;
  	this.height = height ? height : window.innerHeight;
  	this.resize = width && height ? false : true;

  	this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new WebGLRenderer();
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;
		this.renderer.setSize(this.width, this.height);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.target.set(0, 0, 0);
		this.controls.update();
		
		this.scene = new Scene();
		this.scene.background = new Color('#000000');
		
  	this.parent.prepend(this.renderer.domElement);
		
  	if (this.resize) window.addEventListener('resize', this.resizeHandler.bind(this));
	}

	resizeHandler() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}

interface CanvasI {
	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;
	parent: HTMLElement;
	controls: OrbitControls;
	width?: number;
	height?: number;
	resize?: boolean;
}

export default Canvas;