import { themeCSS } from 'harmony-css';
import { createElement, documentStyle } from 'harmony-ui';
import { PAGE_TYPE_EDITOR } from './constants.js';
import { Controller } from './controller.js';
import { MainContent } from './view/maincontent.js';
import { Statusbar } from './view/statusbar.js';
import { Toolbar } from './view/toolbar.js';

import applicationCSS from '../css/application.css';
import htmlCSS from '../css/html.css';

documentStyle(htmlCSS);
documentStyle(themeCSS);

class Application {
	#htmlElement;
	//#editor = new Editor();
	#appContent = new MainContent();
	#appStatusbar = new Statusbar();
	#appToolbar = new Toolbar();
	#pageType;
	constructor() {
		this.#initListeners();
		this.#initHTML();
		this.#startup();
	}

	async #startup(historyState = {}) {
		this.#restoreHistoryState(historyState);
		let pathname = document.location.pathname;
		switch (true) {
			case pathname == '/':
				break;
			case pathname.includes('@editor'):
				this.#pageType = PAGE_TYPE_EDITOR;
				break;
			default:
				this.#navigateTo('/');
				break;
		}

		this.#appContent.setActivePage(this.#pageType);
	}

	#restoreHistoryState({ } = {}) {
	}

	#navigateTo(url, replaceSate  = false) {
		history[replaceSate ? 'replaceState' : 'pushState']({}, undefined, url);
		this.#startup();
	}

	#initListeners() {
		Controller.addEventListener('createnewfile', event => this.#createNewFile());
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			parent: document.body,
			attachShadow: { mode: 'closed' },
			adoptStyle: applicationCSS,
			childs:[
				this.#appToolbar.htmlElement,
				this.#appContent.htmlElement,
				this.#appStatusbar.htmlElement,
			]
		});
		/*
		document.body.append(this.#appToolbar.html);
		//document.body.append(this.#editor.html);
		document.body.append(this.#appStatusbar.html);
		*/
	}

	#createNewFile() {
	}
}
new Application();
