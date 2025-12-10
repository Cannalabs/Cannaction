export interface ProfilePontuationEntity {
	id: number;
	type: string;
	description: string;
	active: boolean;
	points: number;
	createdAt: Date;
	updatedAt: Date;
}