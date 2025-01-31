import { MapElement } from './mapelement';
import { Wall } from './wall';

export enum RoomShape {
	Parallelepiped = 0,
	Custom = 1,
}

export class Room extends MapElement {
	protected openings = new Set<Opening>;
	protected minOpenings: number = 0;
	protected maxOpenings: number = Infinity;
	protected walls = new Set<Wall>;
	protected ground? = new Set<Wall>;
	#shape: RoomShape = RoomShape.Parallelepiped;

	addOpening(o: Opening): boolean {
		return true;

	}

	moveOpening(o: Opening): boolean {
		return true;
	}

}
