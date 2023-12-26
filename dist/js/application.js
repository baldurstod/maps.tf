function createElement(tagName, options) {
	let element = document.createElement(tagName);
	createElementOptions(element, options);
	if (options?.elementCreated) {
		options.elementCreated(element);
	}
	return element;
}

function createElementOptions(element, options) {
	if (options) {
		for (let optionName in options) {
			let optionValue = options[optionName];
			switch (optionName) {
				case 'class':
					element.classList.add(...optionValue.split(' '));
					break;
				case 'i18n':
					element.setAttribute('data-i18n', optionValue);
					element.innerHTML = optionValue;
					element.classList.add('i18n');
					break;
				case 'i18n-title':
					element.setAttribute('data-i18n-title', optionValue);
					element.classList.add('i18n-title');
					break;
				case 'i18n-placeholder':
					element.setAttribute('data-i18n-placeholder', optionValue);
					element.classList.add('i18n-placeholder');
					break;
				case 'i18n-label':
					element.setAttribute('data-i18n-label', optionValue);
					element.classList.add('i18n-label');
					break;
				case 'i18n-json':
					element.setAttribute('data-i18n-json', JSON.stringify(optionValue));
					element.classList.add('i18n');
					break;
				case 'i18n-values':
					element.setAttribute('data-i18n-values', JSON.stringify(optionValue));
					element.classList.add('i18n');
					break;
				case 'parent':
					optionValue.append(element);
					break;
				case 'child':
					if (optionValue) {
						element.append(optionValue);
					}
					break;
				case 'childs':
					optionValue.forEach(entry => {
						if (entry !== null && entry !== undefined) {
							element.append(entry);
						}
					});
					break;
				case 'events':
					for (let eventType in optionValue) {
						let eventParams = optionValue[eventType];
						if (typeof eventParams === 'function') {
							element.addEventListener(eventType, eventParams);
						} else {
							element.addEventListener(eventType, eventParams.listener, eventParams.options);
						}
					}
					break;
				case 'hidden':
					if (optionValue) {
						hide(element);
					}
					break;
				case 'attributes':
					for (let attributeName in optionValue) {
						element.setAttribute(attributeName, optionValue[attributeName]);
					}
					break;
				case 'list':
					element.setAttribute(optionName, optionValue);
					break;
				default:
					if (optionName.startsWith('data-')) {
						element.setAttribute(optionName, optionValue);
					} else {
						element[optionName] = optionValue;
					}
					break;
			}
		}
	}
	return element;
}

function display(htmlElement, visible) {
	if (htmlElement == undefined) return;

	if (visible) {
		htmlElement.style.display = '';
	} else {
		htmlElement.style.display = 'none';
	}
}

function hide(htmlElement) {
	display(htmlElement, false);
}

function styleInject(css) {
	document.head.append(createElement('style', {textContent: css}));
}

var css$4 = ".editor{\r\n\tflex: 1;\r\n\twidth:100%;\r\n\tbackground-color: red;\r\n\tdisplay: flex;\r\n}\r\n\r\n.editor > .offset{\r\n\theight: 100%;\r\n\tmin-width: 20px;\r\n\tflex:0;\r\n\tbackground-color: darkgray;\r\n\tfont-size: 0.7rem;\r\n}\r\n";
styleInject(css$4);

class Editor {
	#html;
	#htmlOffset;
	#hexFile;
	#bytesPerRow = 16;
	constructor() {
	}

	#initHTML() {
		this.#html = createElement('div', {
			class: 'editor',
			childs: [
				this.#htmlOffset = createElement('div', {
					class: 'offset',
				})

			],
		});
		this.#refresh();
		return this.#html;

	}

	setFile(file) {
		this.#hexFile = file;
		this.#refresh();
	}

	get html() {
		return this.#html ?? this.#initHTML();
	}

	#refresh() {
		this.#refreshOffset();
	}

	#refreshOffset() {
		const length = (this.#hexFile?.length ?? 0) + 1/* account for eof */;
		const offset = this.#hexFile?.offset ?? 0;
		const offsetChars = Math.max(8, (length).toString(16).length);
		const rows = Math.max(1, Math.ceil(length / this.#bytesPerRow));
		console.log(offsetChars, rows);

		this.#htmlOffset.innerText = '';
		let lineOffset = Math.floor(offset / this.#bytesPerRow) * this.#bytesPerRow;
		for (let i = 0; i < rows; ++i) {

			this.#htmlOffset.append(createElement('div', {
				innerText: (lineOffset).toString(16).padStart(offsetChars, '0'),
			}));



			lineOffset += this.#bytesPerRow;
		}

	}

	set bytesPerRow(bytesPerRow) {
		this.#bytesPerRow = Math.max(bytesPerRow, 1);
	}
}

var css$3 = ".toolbar{\r\n\theight:2rem;\r\n\twidth:100%;\r\n\tbackground-color: blue;\r\n}\r\n";
styleInject(css$3);

class Statusbar {
	#html;
	constructor() {
	}

	#initHTML() {
		this.#html = createElement('div', {
			class: 'statusbar',
			innerText: 'this is the statusbar',
		});
		return this.#html;

	}

	get html() {
		return this.#html ?? this.#initHTML();
	}
}

class ControllerClass extends EventTarget {
	constructor() {
		super();
	}
}

const Controller = new ControllerClass();

var css$2 = ".toolbar{\r\n\theight:5rem;\r\n\twidth:100%;\r\n\tbackground-color: chocolate;\r\n}\r\n";
styleInject(css$2);

class Toolbar {
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
		});
		return this.#html;

	}

	get html() {
		return this.#html ?? this.#initHTML();
	}
}

var css$1 = "html{\r\n\theight:100%;\r\n\twidth:100%;\r\n\t--font-size: 16px;\r\n\tfont-size: var(--font-size);\r\n}\r\nbody{\r\n\taccent-color: var(--accent-primary);\r\n\tcolor: var(--text-primary);\r\n\tscrollbar-color: var(--scrollbar-color) var(--scrollbar-bg);\r\n\tfont-family: helvetica;\r\n\tmargin:0rem;\r\n\toverflow: hidden;\r\n\tbackground-color: #000000;\r\n\theight:100%;\r\n\twidth:100%;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\tbackground-color: var(--background-primary);\r\n\tflex-direction: column;\r\n}\r\n";
styleInject(css$1);

var css = "@media (prefers-color-scheme: light){\r\n\tbody{\r\n\t\t--background-primary: #fff;\r\n\t\t--background-secondary: #eee;\r\n\t\t--background-tertiary: #c8c8c8;\r\n\t\t--background-quaternary: #b1b1b1;\r\n\r\n\t\t--border-primary:  #cdcdcd;\r\n\t\t--border-secondary:  #cdcdcd;\r\n\r\n\t\t--text-primary: #1b1b1b;\r\n\t\t--text-secondary: #4e4e4e;\r\n\t\t--text-inactive: #9e9e9ea6;\r\n\t\t--text-link: #0069c2;\r\n\t\t--text-invert: #fff;\r\n\r\n\t\t--accent-primary: #0085f2;\r\n\r\n\t\t--scrollbar-bg: transparent;\r\n\t\t--scrollbar-color: rgba(0, 0, 0, 0.25);\r\n\t}\r\n}\r\n@media (prefers-color-scheme: dark){\r\n\tbody{\r\n\t\t--background-primary: #1b1b1b;\r\n\t\t--background-secondary: #101822;\r\n\t\t--background-tertiary: #343434;\r\n\t\t--background-quaternary: #4e4e4e;\r\n\r\n\t\t--border-primary:  #858585;\r\n\t\t--border-secondary:  #696969;\r\n\r\n\t\t--text-primary: #fff;\r\n\t\t--text-secondary: #cdcdcd;\r\n\t\t--text-inactive: #cdcdcda6;\r\n\t\t--text-link: #8cb4ff;\r\n\t\t--text-invert: #1b1b1b;\r\n\r\n\t\t--accent-primary: #5e9eff;\r\n\r\n\t\t--scrollbar-bg: transparent;\r\n\t\t--scrollbar-color: rgba(255, 255, 255, 0.25);\r\n\t}\r\n}\r\n";
styleInject(css);

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
