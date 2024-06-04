import { createElement } from 'harmony-ui';

import '../../css/editor.css';

export class Editor {
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
		})
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
