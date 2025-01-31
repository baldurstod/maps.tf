import { MapElement } from './mapelement';

export class Corridor extends MapElement{
	//hasOpenings: true = true;
	protected openings = new Set<Opening>;


	addOpening(o: Opening): boolean {
		return true;

	}

	moveOpening(o: Opening): boolean {
		return true;
	}

}
