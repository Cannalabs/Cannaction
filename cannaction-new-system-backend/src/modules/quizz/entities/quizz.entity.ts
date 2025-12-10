import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Country } from '../../country/country.entity';
import { RDSBase } from '../../database/entities/rds-base.entity';
import { Question } from '../../question/question.entity';
import { QuizUser } from './quizz-user.entity';

@Entity('quizz')
export class Quizz extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'description' })
	description: string;

	@Column({ name: 'points' })
	points: number;

	@Column({ name: 'published' })
	published: boolean;

	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country: Country;

	@OneToMany(() => QuizUser, (item) => item.quiz)
	quizUsers: QuizUser[];

	@ManyToMany(() => Question, (item) => item.quizzes, { cascade: true })
	@JoinTable({
		name: 'quizz_question',
		joinColumn: {
			name: 'quizz_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'question_id',
			referencedColumnName: 'id',
		},
	})
	questions: Question[];

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

	constructor(options?: Partial<Quizz>) {
		super(options);
	}
}
