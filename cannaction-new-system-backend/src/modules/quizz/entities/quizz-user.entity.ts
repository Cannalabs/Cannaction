import { RDSBase } from "@/modules/database/entities/rds-base.entity";
import { User } from "@/modules/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Quizz } from "./quizz.entity";

@Entity('quiz_user')
export class QuizUser extends RDSBase<number> {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@ManyToOne(() => Quizz)
	@JoinColumn({ name: 'quiz_id' })
	quiz: Quizz;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column({ name: 'answer_date', nullable: true })
	answerDate?: Date;

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

	constructor(options?: Partial<QuizUser>) {
		super(options);
	}
}