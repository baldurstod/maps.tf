import { createElement } from 'harmony-ui';

import '../../css/statusbar.css';

export class Statusbar {
	#html;
	constructor() {
	}

	#initHTML() {
		this.#html = createElement('div', {
			class: 'statusbar',
			innerText: 'this is the statusbar',
		})
		return this.#html;

	}

	get html() {
		return this.#html ?? this.#initHTML();
	}
}
