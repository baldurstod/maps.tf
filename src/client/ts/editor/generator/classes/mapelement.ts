import { quat, vec3 } from 'gl-matrix';
import { Property, PropertyType } from '../core/property';

export class MapElement {
	#properties = new Map<string, Property>();

	constructor() {
		this.addProperty('position', PropertyType.Vec3, vec3.create());
		this.addProperty('orientation', PropertyType.Quat, vec3.create());
		this.addProperty('scale', PropertyType.Vec3, vec3.fromValues(1, 1, 1));
	}

	addProperty(name: string, type: PropertyType, value: any) {
		if (this.#properties.has(name)) {
			return;
		}

		this.#properties.set(name, new Property(this, name, type, value));
	}

	getPropertyValue(name: string): any {
		return this.#properties.get(name)?.getValue();
	}

	isResizeable(): boolean {
		return true;
	}

	resize(newSize: number): boolean {
		return true;
	}

	propertyUpdated(name:string, oldValue:any, newValue:any) {
	}
}
