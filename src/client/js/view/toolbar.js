import { createElement } from 'harmony-ui';
import { Controller } from '../controller';

import '../../css/toolbar.css';

export class Toolbar {
	#htmlElement;
	constructor() {
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'toolbar',
			innerText: 'this is the toolbar',
			childs: [
			],
		})
		return this.#htmlElement;

	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
