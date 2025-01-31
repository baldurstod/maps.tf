import { Property } from './property';

const undoHistory: Array<History> = [];
let currentLevel = -1;

class History {
	property: Property;
	value: any;

	constructor(property: Property, value: any) {
		this.property = property;
		this.value = value;
	}
}

export function pushHistory(property: Property, value: any) {
	++currentLevel;
	undoHistory[currentLevel] = new History(property, value);
}

export function undo() {
	if (currentLevel < 0) {
		return;
	}

	const history = undoHistory[currentLevel];
	const property = history.property;

	const oldValue = property.getValue();
	property.setValue(history.value);
	property.getParent().propertyUpdated(property.getName(), oldValue, history.value);
}
