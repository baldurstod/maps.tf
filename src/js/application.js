import { Editor } from './view/editor.js';
import { Statusbar } from './view/statusbar.js';
import { Toolbar } from './view/toolbar.js';
import { Controller } from './controller.js';

import '../css/application.css';
import '../css/vars.css';

class Application {
	#editor = new Editor();
	#appStatusbar = new Statusbar();
	#appToolbar = new Toolbar();
	#files = new Set();
	constructor() {
		this.#initListeners();
		this.#initHTML();
	}

	#initListeners() {
		Controller.addEventListener('createnewfile', event => this.#createNewFile());
	}


	#initHTML() {
		document.body.append(this.#appToolbar.html);
		document.body.append(this.#editor.html);
		document.body.append(this.#appStatusbar.html);
	}

	#createNewFile() {
	}
}
new Application();
