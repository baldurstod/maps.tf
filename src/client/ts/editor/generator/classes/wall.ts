import { MapElement } from './mapelement';

export class Wall extends MapElement{
	protected openings = new Set<Opening>;
	minOpenings: number = 0;
	maxOpenings: number = Infinity;


	addOpening(o: Opening): boolean {
		return true;

	}

	moveOpening(o: Opening): boolean {
		return true;
	}

}


function test(test: HasOpenings) {

}
test(new Wall());
