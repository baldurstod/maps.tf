import { quat, vec3 } from 'gl-matrix';
import { MapElement } from './mapelement';

export class Group extends MapElement {
	protected position = vec3.create();
	protected orientation = quat.create();
	protected scale = vec3.fromValues(1, 1, 1);

}
