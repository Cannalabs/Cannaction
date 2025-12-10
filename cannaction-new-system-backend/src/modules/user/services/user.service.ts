import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { PaginationOptionsDto } from '@/modules/database/pagination/pagination-options';
import { PaginationDto } from '@/modules/database/pagination/pagination.dto';
import { Injectable } from '@nestjs/common';
import { FilterUserLabeledDto } from '../dtos/requests/filter-user-labeled.request';
import { FilterUsersDto } from '../dtos/requests/filter-user.request';
import { UserType } from '../enums/user-type.enum';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../user.entity';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository) {}

	async findAll(
		currentUser: CurrentUser,
		filter: FilterUsersDto,
		options: PaginationOptionsDto
	): Promise<PaginationDto<User>> {
		let storeId: number = null;
		if (currentUser.userType === UserType.STORE) {
			const user = await this.userRepository.findOne(currentUser.userId);
			storeId = user.store.id;
		}
		return this.userRepository.findAll(currentUser, filter, options, storeId);
	}

	async findOne(
		id: number
	): Promise<User | undefined> {
		return this.userRepository.findOne(id);
	}

	async findByClubCardCode(currentUser: CurrentUser, code: string) {
		const user = await this.userRepository.findOne(currentUser.userId);
		return this.userRepository.findByClubCardCode(code, user.store.id);
	}

	async findClubCardUserForLogin(code: string) {
		return this.userRepository.findClubCardUserForLogin(code);
	}

	async findForAuth(emailOrNickname: string): Promise<User> {
		return this.userRepository.findForAuth(emailOrNickname);
	}

	async findCountByStoreId(storeId: number) {
		return this.userRepository.findCountByStore(storeId);
	}

	async findListByStore(storeId: number) {
		return this.userRepository.findListByStore(storeId);
	}

	async findForForgotPassword(email: string,): Promise<User> {
		return this.userRepository.findForForgotPassword(email);
	}

	async findAllClubCard(currentUser: CurrentUser, search: string, options: PaginationOptionsDto): Promise<PaginationDto<User>> {
		let storeId: number = null;
		if (currentUser.userType === UserType.STORE) {
			const user = await this.userRepository.findOne(currentUser.userId);
			storeId = user.store.id;
		}
		return this.userRepository.findAllClubCard(currentUser, search, options, storeId);
	}

	async findLabeled(filter: FilterUserLabeledDto): Promise<User[]> {
		return this.userRepository.findLabeled(filter);
	}
}
