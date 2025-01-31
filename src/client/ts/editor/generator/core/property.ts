import { MapElement } from "../classes/mapelement";

export enum PropertyType {
	Number = 0,
	Boolean,
	String,
	Vec2,
	Vec3,
	Vec4,
	Quat,
}

export class Property {
	#parent: MapElement;
	#name: string
	#type: PropertyType;
	#value: any;

	constructor(parent: MapElement, name: string, type: PropertyType, value: any) {
		this.#parent = parent;
		this.#name = name;
		this.#type = type;
		this.#value = value;
	}

	getParent() {
		return this.#parent;
	}

	getName() {
		return this.#name;
	}

	getType() {
		return this.#type;
	}

	setValue(value: any) {

	}

	getValue() {
		return this.#value;
	}
}
