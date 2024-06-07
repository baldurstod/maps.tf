import * as Harmony3D from 'harmony-3d';
import { createElement } from 'harmony-ui';

import editorCSS from '../../css/editor.css';

export class Editor {
	#htmlElement;
	#htmlCanvas;
	constructor() {
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			attachShadow: { mode: 'closed' },
			adoptStyle: editorCSS,
			childs: [
				createElement('div', {
					class: 'view',
					child: this.#htmlCanvas = createElement('canvas'),
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

	#initRenderer() {
		this.renderer = Harmony3D.Graphics.initCanvas({
			canvas : this.#htmlCanvas,
			alpha : true,
			autoResize : true,
			preserveDrawingBuffer:true,
			premultipliedAlpha:false
		})
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}

	#refresh() {
	}
}
