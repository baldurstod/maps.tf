import { createElement } from 'harmony-ui';

import '../../css/editor.css';

export class Editor {
	#htmlElement;
	#htmlOffset;
	constructor() {
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'editor',
			childs: [
				'this is the toolbar'

			],
		})
		this.#refresh();
		return this.#htmlElement;
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}

	#refresh() {
	}
}
