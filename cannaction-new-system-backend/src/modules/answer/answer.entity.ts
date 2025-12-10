import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { RDSBase } from '../database/entities/rds-base.entity';
import { Question } from '../question/question.entity';
import { Quizz } from '../quizz/entities/quizz.entity';
import { User } from '../user/user.entity';

@Entity('answer')
export class Answer extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ name: 'answer' })
	answer: string;

	@ManyToOne(() => Quizz)
	@JoinColumn({ name: 'quizz_id' })
	quizz: Quizz;

	@ManyToOne(() => Question)
	@JoinColumn({ name: 'question_id' })
	question: Question;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

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

	constructor(options?: Partial<Answer>) {
		super(options);
	}
}
