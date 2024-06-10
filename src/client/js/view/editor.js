import { vec2, vec4 } from 'gl-matrix';
import { Camera, Scene, GraphicsEvents, GRAPHICS_EVENT_TICK, Graphics, Sphere, MeshFlatMaterial, OrbitControl, ContextObserver, AmbientLight, ORTHOGRAPHIC_CAMERA, Manipulator } from 'harmony-3d';
import { createElement } from 'harmony-ui';
import 'harmony-ui/dist/define/harmony-splitter.js';

import editorCSS from '../../css/editor.css';

export class Editor {
	#htmlElement;
	#htmlCanvas;
	#htmlHorizSplitter;
	#htmlVertSplitter;
	#scene;
	#views = [];
	#manipulator;
	#split = vec2.create();
	constructor() {
		this.#scene = new Scene();
		let ambientLight = this.#scene.addChild(new AmbientLight({ intensity: 1.0 }));

		let camera = new Camera();
		camera.position = [0, -200, 0];
		camera.farPlane = 10000;
		camera.nearPlane = 0.1;
		camera.verticalFov = 5;

		this.#views.push(new EditorView({ viewport: [0, 0, 0.5, 0.5], type: 'front'}));
		this.#views.push(new EditorView({ viewport: [0.5, 0., 0.5, 0.5], type: '3d'}));
		this.#views.push(new EditorView({ viewport: [0, 0.5, 0.5, 0.5], type: 'top'}));
		this.#views.push(new EditorView({ viewport: [0.5, 0.5, 0.5, 0.5], type: 'side'}));


		this.#scene.addChild(new Sphere({radius: 10, segments: 12, rings: 12, material: new MeshFlatMaterial()}));
		this.#manipulator = new Manipulator();
		this.#manipulator.size = 3;
		//this.#manipulator.camera = this.#camera;
		this.#scene.addChild(this.#manipulator);
		this.#resizeViews();
	}

	#resizeViews(split = vec2.fromValues(0.5, 0.5)) {
		vec2.copy(this.#split, split);
		this.#views[0].viewport[2] = split[0];
		this.#views[0].viewport[3] = split[1];

		this.#views[1].viewport[0] = split[0];
		this.#views[1].viewport[2] = 1 - split[0];
		this.#views[1].viewport[3] = split[1];

		this.#views[2].viewport[1] = split[1];
		this.#views[2].viewport[2] = split[0];
		this.#views[2].viewport[3] = 1 - split[1];

		this.#views[3].viewport[0] = split[0];
		this.#views[3].viewport[1] = split[1];
		this.#views[3].viewport[2] = 1 - split[0];
		this.#views[3].viewport[3] = 1 - split[1];

	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			attachShadow: { mode: 'closed' },
			adoptStyle: editorCSS,
			childs: [
				createElement('div', {
					class: 'view',
					childs: [
						this.#htmlCanvas = createElement('canvas'),
						createElement('div', {
							class: 'splitters',
							childs: [
								this.#htmlHorizSplitter = createElement('harmony-splitter', {
									attributes: {
										orientation: 'horizontal',
									},
									events: {
										change: event => this.#horizSplit(event.detail.value),
									},
									childs: [
										createElement('div', {
											slot: '1',
											class: 'panel',
										}),
										createElement('div', {
											slot: '2',
											class: 'panel',
										}),
									],
								}),
								this.#htmlVertSplitter = createElement('harmony-splitter', {
									attributes: {
										orientation: 'vertical',
									},
									events: {
										change: event => this.#vertSplit(event.detail.value),
									},
									childs: [
										createElement('div', {
											slot: '1',
											class: 'panel',
										}),
										createElement('div', {
											slot: '2',
											class: 'panel',
										}),
									],
								}),
							]
						}),
					],
				}),
				createElement('div', {
					class: 'commands',
				}),
			],
		})
		this.#refresh();
		this.#initRenderer();
		return this.#htmlElement;
	}

	#horizSplit(value) {
		this.#resizeViews([this.#split[0], 1 - value]);
	}
	#vertSplit(value) {
		this.#resizeViews([value, this.#split[1]]);
	}

	#initRenderer() {
		this.renderer = Graphics.initCanvas({
			canvas : this.#htmlCanvas,
			alpha : true,
			autoResize : true,
			preserveDrawingBuffer:true,
			premultipliedAlpha:false
		});
		this.renderer.clearColor([0, 0, 0, 1]);

		let animate = event => {
			let renderer = this.renderer;
			renderer.scissorTest = true;
			for (const view of this.#views) {
				view.setupRenderer(renderer);
				const camera = view.getCamera()
				//this.#scene.activeCamera = camera;
				this.#manipulator.resize(camera);
				renderer.render(this.#scene, camera, event.detail.delta);
			}

		}
		this.renderer.play();
		GraphicsEvents.addEventListener(GRAPHICS_EVENT_TICK, animate);
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}

	#refresh() {
	}
}


const viewport = vec4.create();
class EditorView {
	#viewport = vec4.create();
	#camera = new Camera();

	constructor({ viewport = [0, 0, 1, 1], type = 'front' } = {}) {
		//ContextObserver.observe(GraphicsEvents, this.#camera);
		vec4.copy(this.#viewport, viewport);
		this.setType(type);
	}

	get viewport() {
		return this.#viewport;
	}

	setType(type) {
		switch (type) {
			case 'front':
				this.#setFront();
				break;
			case 'top':
				this.#setTop();
				break;
			case 'side':
				this.#setSide();
				break;
			case '3d':
				this.#set3D();
				break;
			default:
				break;
		}
	}

	#setFront() {
		this.#camera.projectionType = ORTHOGRAPHIC_CAMERA;
		this.#camera.position = [0, -100, 0];
		this.#camera.quaternion = [1, 0, 0, 1];
		this.#camera.nearPlane = 0.1;
		this.#camera.farPlane = 10000;
		this.#camera.orthoZoom = 10;
	}

	#setTop() {
		this.#camera.projectionType = ORTHOGRAPHIC_CAMERA;
		this.#camera.position = [0, 0, 100];
		//this.#camera.quaternion = [1, 0, 0, 1];
		this.#camera.nearPlane = 0.1;
		this.#camera.farPlane = 10000;
		this.#camera.orthoZoom = 10;
	}

	#setSide() {
		this.#camera.projectionType = ORTHOGRAPHIC_CAMERA;
		this.#camera.position = [100, 0, 0];
		this.#camera.quaternion = [0, 1, 0, 1];
		this.#camera.nearPlane = 0.1;
		this.#camera.farPlane = 10000;
		this.#camera.orthoZoom = 10;
	}

	#set3D() {
		//this.#camera.projectionType = ORTHOGRAPHIC_CAMERA;
		this.#camera.position = [0, 0, 100];
		//this.#camera.quaternion = [0, 1, 0, 1];
		this.#camera.nearPlane = 0.1;
		this.#camera.farPlane = 10000;
		this.#camera.verticalFov = 50;
		//this.#camera.orthoZoom = 10;
	}

	getCamera() {
		return this.#camera;
	}

	setupRenderer(renderer) {
		vec4.copy(viewport, this.#viewport);

		let w = renderer._width / 2.0 * viewport[2];
		let h = renderer._height / 2.0 * viewport[3];

		this.#camera.left = -w;
		this.#camera.right = w;
		this.#camera.bottom = -h;
		this.#camera.top = h;

		viewport[0] *= renderer._width;
		viewport[1] *= renderer._height;
		viewport[2] *= renderer._width;
		viewport[3] *= renderer._height;
		renderer.viewport = viewport;
		renderer.scissor = viewport;

		this.#camera.aspectRatio = viewport[2] / viewport[3];
	}

}
