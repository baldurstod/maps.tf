import { createElement } from 'harmony-ui';
import { Controller } from '../controller';

import '../../css/toolbar.css';

export class Toolbar {
	#html;
	constructor() {
	}

	#initHTML() {
		this.#html = createElement('div', {
			class: 'toolbar',
			innerText: 'this is the toolbar',
			childs: [
				createElement('div', {
					class: 'button',
					innerText: 'new file',
					events: {
						click: () => Controller.dispatchEvent(new CustomEvent('createnewfile')),
					},
				})

			],
		})
		return this.#html;

	}

	get html() {
		return this.#html ?? this.#initHTML();
	}
}
