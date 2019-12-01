import { SphereGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, TextureLoader, Color, DoubleSide } from 'three';
import Canvas from '../Canvas';
import params from './params';
// @ts-ignore
import * as tgen from '../../tgen/index.js';

class Planet implements PlanetI {
  geometry: SphereGeometry;
  material: MeshBasicMaterial;
  mesh: Mesh;
	radius?: number;

	constructor(canvas: Canvas, radius?: number) {
  	this.geometry = new SphereGeometry(radius ? radius : 2, 64, 64);
  	this.material = new MeshBasicMaterial();
  	const generator = tgen.init(6000, 6000);
		const material = generator.render(params).toCanvas();
		const loader = new TextureLoader();
  	this.material.map = loader.load(material.toDataURL('image/png'));
		this.mesh = new Mesh(this.geometry, this.material);
		const ozon = new SphereGeometry(radius ? (radius + 0.1) : 2.1, 64, 64);
		const ozonMaterial = new MeshStandardMaterial();
		ozonMaterial.color = new Color('#4287f5');
		ozonMaterial.opacity = 0.2;
		ozonMaterial.side = DoubleSide;
		ozonMaterial.transparent = true;
		const ozonMesh = new Mesh(ozon, ozonMaterial);
		canvas.scene.add(this.mesh);		
		canvas.scene.add(ozonMesh);
	}
}

interface PlanetI {
	geometry: SphereGeometry;
	material: MeshBasicMaterial;
	mesh: Mesh;
	radius?: number;
}

export default Planet;