interface HasOpenings {
	minOpenings: number;
	maxOpenings: number;

	addOpening(o: Opening): boolean;
	moveOpening(o: Opening): boolean;
}
