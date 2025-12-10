import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { QuestionType } from './enums/question-type.enum';

@Entity('question')
export class Question extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'question' })
	question: string;

	@Column({ name: 'type' })
	type: QuestionType;

	@Column({
		name: 'options',
		type: 'character varying',
		array: true,
		nullable: true,
	})
	options?: string[];

	@ManyToMany(() => Quizz, (item) => item.questions)
	@JoinTable({
		name: 'quizz_question',
		joinColumn: {
			name: 'question_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'quizz_id',
			referencedColumnName: 'id',
		},
	})
	quizzes: Quizz[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	setId(id: number): void {
		this.id = id;
	}
	getId(): number {
		return this.id;
	}

	constructor(options?: Partial<Question>) {
		super(options);
	}
}
