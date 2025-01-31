import { createElement } from 'harmony-ui';

import '../../css/statusbar.css';

export class Statusbar {
	#htmlElement;
	constructor() {
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'statusbar',
			innerText: 'this is the statusbar',
		})
		return this.#htmlElement;

	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
