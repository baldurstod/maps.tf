import { vec3 } from 'gl-matrix';
import { MapElement } from './mapelement';

export class Opening extends MapElement {
	protected minSize = vec3.create();
	protected maxSize = vec3.fromValues(Infinity, Infinity, Infinity);
	protected size = vec3.create();

}
