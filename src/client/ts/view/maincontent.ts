import { createElement, hide, show } from 'harmony-ui';
import { Editor } from './editor.js';
import { PAGE_TYPE_EDITOR, PAGE_TYPE_UNKNOWN } from '../constants.js';

import mainContentCSS from '../../css/maincontent.css';

export class MainContent {
	#htmlElement;
	#editor = new Editor();

	#initHTML() {
		this.#htmlElement = createElement('section', {
			attachShadow: { mode: 'closed' },
			adoptStyle: mainContentCSS,
			childs: [
				this.#editor.htmlElement,
			],
		});
		this.setActivePage(PAGE_TYPE_UNKNOWN);
		return this.#htmlElement;
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}

	setActivePage(pageType, pageSubType) {
		hide(this.#editor.htmlElement);

		switch (pageType) {
			case PAGE_TYPE_UNKNOWN:
				break;
			case PAGE_TYPE_EDITOR:
				show(this.#editor.htmlElement);
				break;
			default:
				throw `Unknown page type ${pageType}`;
		}
	}
}
