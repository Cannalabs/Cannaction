import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ClubCardCodeListService } from '@/modules/club-card-code-list/club-card-code-list.service';
import { Country } from '@/modules/country/country.entity';
import { CountryService } from '@/modules/country/services/country.service';
import { ExtractOperator } from '@/modules/extract/enums/extract-operator.enum';
import { ExtractPersistenceService } from '@/modules/extract/services/extract-persistence.service';
import { ExtractService } from '@/modules/extract/services/extract.service';
import { Language } from '@/modules/language/language.entity';
import { ProfilePontuationService } from '@/modules/profile-pontuation/services/profile-pontuation.service';
import { StorePersistenceService } from '@/modules/store/services/store-persistence.service';
import { StoreService } from '@/modules/store/services/store.service';
import { Store } from '@/modules/store/store.entity';
import { UserNotCreatedError } from '@/modules/user/errors/user-not-created.error';
import { UserNotFoundError } from '@/modules/user/errors/user-not-found.error';
import { generateTemporaryPassword, generateUserCode, hash } from '@/utils/crypto';
import { createBufferedAvatarImage } from '@/utils/image';
import { createNewAccountEmail, createNewPasswordEmail, sendMail } from '@/utils/mail';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { UserCreateByMarketingRequest } from '../dtos/requests/create-user-by-marketing.request';
import { CreateClubCardUserRequest } from '../dtos/requests/create-user-club-card.request';
import { UserCreateRequest } from '../dtos/requests/create-user.request';
import { UpdateClubCardUserRequest } from '../dtos/requests/update-club-card-user-request';
import { UpdateUserByMarketingRequest } from '../dtos/requests/update-user-by-marketing.request';
import { UpdateUserProfileRequest } from '../dtos/requests/update-user-profile.request';
import { UserType } from '../enums/user-type.enum';
import { CantDeleteUserError } from '../errors/cant-delete-user.error';
import { ClubCardCodeAlreadyInUseError } from '../errors/club-card-code-already-in-use.error';
import { ClubCardCodeNotFoundError } from '../errors/club-card-code-not-found.error';
import { UserNotUpdatedError } from '../errors/user-not-updated.error';
import { UserPasswordNotUpdatedError } from '../errors/user-password-not-updated.error';
import { UserRepository } from '../repositories/user.repository';
import { UserS3Repository } from '../repositories/user.s3.repository';
import { User } from '../user.entity';

@Injectable()
export class UserPersistenceService {
	constructor(
		private readonly userRepository: UserRepository,
		@Inject(forwardRef(() => StorePersistenceService)) private readonly storePersistenceService: StorePersistenceService,
		private readonly countryService: CountryService,
		private readonly storeService: StoreService,
		private readonly userS3Repository: UserS3Repository,
		private readonly profilePontuationService: ProfilePontuationService,
		private readonly extractPersistenceService: ExtractPersistenceService,
		private readonly extractService: ExtractService,
		private readonly clubCardCodeListService: ClubCardCodeListService
	) {}

	async create(newUser: UserCreateRequest): Promise<User> {
		if (newUser.userType === UserType.CUSTOMER && !newUser.storeId)
			throw new UserNotCreatedError(
				'Store is mandatory for customer user.'
			);

		const userByNickname = await this.userRepository.findByNickname(
			newUser.nickname
		);
		if (userByNickname) throw new UserNotCreatedError('Nickname already in use.');
		const userByEmail = await this.userRepository.findByEmail(newUser.email);
		if (userByEmail) throw new UserNotCreatedError('Email already in use.');

		const hashPassword = await hash(newUser.password);
		const country = new Country({ id: newUser.countryId });
		const pontuations = await this.profilePontuationService.findAll();

		let active: boolean = false;

		try {
			await sendMail(
				newUser.email,
				'New Account Password',
				createNewAccountEmail(newUser.password)
			);
			active = true;
		} catch (e) {
			active = false;
		}


		switch (newUser.userType) {
			case UserType.STORE:
				const storeUser = await this.userRepository.create({
					code: `${country.code.toUpperCase()}${generateUserCode()}`,
					name: newUser.name,
					lastName: newUser.lastName,
					language: new Language({ id: newUser.languageId }),
					nickname: newUser.nickname,
					email: newUser.email,
					password: hashPassword,
					telephone: newUser.telephone ?? null,
					birthdate: newUser.birthdate ? new Date(newUser.birthdate) : null,
					userType: newUser.userType,
					active,
					country,
					newsletter: true,
				});
				await this.extractPersistenceService.createExtract({
					userId: storeUser.id,
					amount: 1,
					points: pontuations.find(pp => pp.id == 1).points,
					operator: ExtractOperator.ADDITION,
					description: 'Signup points. Welcome to Cannaction!',
					balance: pontuations.find(pp => pp.id == 1).points
				});
				await this.updateUserPoints(storeUser.id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 1).points);

				const newStore = await this.storePersistenceService.createbyUser(
					{
						name: newUser.storeName,
						address: newUser.storeAddress ?? null,
						contactEmail: newUser.storeContactEmail ?? null,
						contactTelephone: newUser.storeContactTelephone ?? null,
					},
					storeUser,
					country,
					active
				);
				await this.userRepository.update({ id: storeUser.id, store: newStore });
				storeUser.store = newStore;
				await this.extractPersistenceService.createExtract({
					storeId: newStore.id,
					amount: 1,
					points: pontuations.find(pp => pp.id == 2).points,
					operator: ExtractOperator.ADDITION, description: 'Signup points. Welcome to Cannaction!',
					balance: pontuations.find(pp => pp.id == 2).points
				});
				await this.storePersistenceService.updateStorePoints(storeUser.id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 2).points);

				return storeUser;

			case UserType.CUSTOMER:
			default:
				const user = await this.userRepository.create({
					code: `${country.code.toUpperCase()}${generateUserCode()}`,
					name: newUser.name,
					lastName: newUser.lastName,
					language: new Language({ id: newUser.languageId }),
					nickname: newUser.nickname,
					email: newUser.email,
					password: hashPassword,
					telephone: newUser.telephone ?? null,
					birthdate: newUser.birthdate ? new Date(newUser.birthdate) : null,
					userType: newUser.userType,
					store: new Store({ id: newUser.storeId }),
					active,
					country,
					newsletter: true,
				});
				await this.extractPersistenceService.createExtract({
					userId: user.id,
					amount: 1,
					points: pontuations.find(pp => pp.id == 1).points,
					operator: ExtractOperator.ADDITION,
					description: 'Signup points. Welcome to Cannaction!',
					balance: pontuations.find(pp => pp.id == 1).points
				});
				await this.updateUserPoints(user.id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 1).points);

				return user;
		}
	}

	async createByMarketing(body: UserCreateByMarketingRequest) {
		const userByNickname = await this.userRepository.findByNickname(
			body.nickname
		);
		if (userByNickname) throw new UserNotCreatedError('Nickname already in use.');
		const userByEmail = await this.userRepository.findByEmail(body.email);
		if (userByEmail) throw new UserNotCreatedError('Email already in use.');

		const country = await this.countryService.findOne(body.countryId);
		const newPassword = body.password ? body.password : generateTemporaryPassword();

		let active: boolean = false;

		try {
			await sendMail(
				body.email,
				'New Account Password',
				createNewAccountEmail(newPassword)
			);
			active = true;
		} catch (e) {
			active = false;
		}

		const hashPassword = await hash(newPassword);
		const user = await this.userRepository.create({
			code: `${country.code.toUpperCase()}${generateUserCode()}`,
			name: body.name,
			lastName: body.lastName,
			language: new Language({ id: 1 }),
			nickname: body.nickname,
			email: body.email,
			password: hashPassword,
			telephone: null,
			birthdate: null,
			userType: body.userType,
			store: body.storeId ? new Store({ id: body.storeId }) : null,
			active,
			country,
			newsletter: body.newsletter,
		});
		const pontuations = await this.profilePontuationService.findAll();

		await this.extractPersistenceService.createExtract({
			userId: user.id,
			amount: 1,
			points: pontuations.find(pp => pp.id == 1).points,
			operator: ExtractOperator.ADDITION,
			description: 'Signup points. Welcome to Cannaction!',
			balance: pontuations.find(pp => pp.id == 1).points
		});
		await this.updateUserPoints(user.id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 1).points);
	}

	async updateByMarketing(id: number, body: UpdateUserByMarketingRequest) {
		const userAccount = await this.userRepository.findOne(id);
		if (!userAccount) throw new UserNotFoundError();
		if (body.email && body.email != userAccount.email) {
			const userByEmail = await this.userRepository.findByEmail(body.email);
			if (userByEmail) throw new UserNotCreatedError('Email already in use!');
		}

		await this.userRepository.update({
			id,
			name: body.name ? body.name : userAccount.name,
			lastName: body.lastName ? body.lastName : userAccount.lastName,
			email: body.email ? body.email : userAccount.email,
			nickname: body.nickname ? body.nickname : userAccount.nickname,
			userType: body.userType ? body.userType : userAccount.userType,
			store: body.storeId ? new Store({ id: body.storeId }) : userAccount.store,
			country: body.countryId ? new Country({ id: body.countryId }) : userAccount.country,
			newsletter: body.newsletter ? body.newsletter : userAccount.newsletter
		});

		if (body.password) {
			const hashPassword = await hash(body.password);
			await this.userRepository.update({ id, password: hashPassword });
		}
	}

	async updateUserProfile(id: number, body: UpdateUserProfileRequest) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new UserNotFoundError();

		if (body.password && body.repeatNewPassword && body.newPassword) {
			const userPassword = await this.userRepository.findForAuth(user.nickname);
			const success = await compare(body.password, userPassword.password);
			if (!success) throw new UserPasswordNotUpdatedError('Incorrect password!');
			if (success && body.repeatNewPassword === body.newPassword) {
				const hashPassword = await hash(body.newPassword);
				await this.userRepository.update({ id, password: hashPassword });
			}
		}

		if ((body.birthdate && !user.birthdate) || (body.gender && !user.gender)) {
			const pontuations = await this.profilePontuationService.findAll();
			const birthdateExtract = await this.extractService.findByUserAndDescription(id, 'Completed Profile Information: Birthdate');
			const genderExtract = await this.extractService.findByUserAndDescription(id, 'Completed Profile Information: Gender');
			if (body.birthdate && !user.birthdate && !birthdateExtract) {
				await this.extractPersistenceService.createExtract({ userId: id, amount: 1, points: pontuations.find(pp => pp.id == 5).points, operator: ExtractOperator.ADDITION, description: 'Completed Profile Information: Birthdate', balance: user.points + pontuations.find(pp => pp.id == 5).points });
				await this.updateUserPoints(id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 5).points);
			}

			if (body.gender && !user.gender && !genderExtract) {
				await this.extractPersistenceService.createExtract({ userId: id, amount: 1, points: pontuations.find(pp => pp.id == 6).points, operator: ExtractOperator.ADDITION, description: 'Completed Profile Information: Gender', balance: user.points + pontuations.find(pp => pp.id == 6).points });
				await this.updateUserPoints(id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 6).points);
			}
		}

		await this.userRepository.update({
			id,
			name: body.name,
			lastName: body.lastName,
			nickname: body.nickname,
			birthdate: body.birthdate ? body.birthdate : user.birthdate,
			gender: body.gender ? body.gender : user.gender,
			email: body.newEmail ? body.newEmail : user.email,
			language: new Language({ id: body.languageId })
		});

	}

	async generateNewPassword(id: number) {
		const userAccount = await this.userRepository.findOne(id);
		if (!userAccount) throw new UserNotFoundError();

		const newPassword = generateTemporaryPassword();
		const hashPassword = await hash(newPassword);

		await this.userRepository.update({ id, password: hashPassword });

		await sendMail(
			userAccount.email,
			'Forgot Password',
			createNewPasswordEmail(newPassword)
		);
	}

	async update(id: number, user: DeepPartial<User>) {
		const userAccount = await this.userRepository.findOne(id);
		if (!userAccount) throw new UserNotFoundError();
		await this.userRepository.update({ id, ...user });
	}

	async inactive(id: number): Promise<void> {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new UserNotFoundError();
		if (!user.active) return;
		return this.userRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new UserNotFoundError();
		if (user.active) return;
		return this.userRepository.active(id);
	}

	async updateLastInteractionDate(id: number): Promise<void> {
		await this.userRepository.update({ id, lastInteractionDate: new Date() });
	}

	async createClubCardUser(currentUser: CurrentUser, body: CreateClubCardUserRequest) {
		const clubCardCode = await this.clubCardCodeListService.findByCode(body.cardId);
		if (!clubCardCode) throw new ClubCardCodeNotFoundError();
		if (clubCardCode.validated) throw new ClubCardCodeAlreadyInUseError();
		if (body.email) {
			const userByEmail = await this.userRepository.findByEmail(body.email);
			if (userByEmail) throw new UserNotCreatedError('Email already in use!');
		}
		let store: Store;
		if (currentUser.userType === UserType.STORE && !body.storeId) {
			const user = await this.userRepository.findOne(currentUser.userId);
			store = await this.storeService.findOne(user.store.id);
		} else {
			store = await this.storeService.findOne(body.storeId);
		}

		await this.clubCardCodeListService.setValidated(clubCardCode.id);

		const hashPassword = body.password ? await hash(body.password) : null;

		const user = await this.userRepository.create({
			code: body.cardId,
			name: body.name,
			lastName: body.lastName,
			email: body.email,
			birthdate: body.birthdate ? new Date(body.birthdate) : null,
			language: new Language({ id: 1 }),
			userType: UserType.CLUB_CARD,
			store,
			active: true,
			country: store.country,
			createdAt: new Date(),
			newsletter: false,
			password: hashPassword
		});
		const pontuations = await this.profilePontuationService.findAll();

		await this.extractPersistenceService.createExtract({
			userId: user.id,
			amount: 1,
			points: pontuations.find(pp => pp.id == 1).points,
			operator: ExtractOperator.ADDITION,
			description: 'Signup points. Welcome to Cannaction!',
			balance: pontuations.find(pp => pp.id == 1).points
		});
		await this.updateUserPoints(user.id, ExtractOperator.ADDITION, pontuations.find(pp => pp.id == 1).points);

	}

	async updatedClubCardUser(id: number, body: UpdateClubCardUserRequest) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new UserNotFoundError();
		if (body.email) {
			const userByEmail = await this.userRepository.findByEmail(body.email);
			if (userByEmail && userByEmail.id != user.id) throw new UserNotUpdatedError('Email already in use!');
		}
		if (user.userType !== UserType.CLUB_CARD) return;
		const hashPassword = body.password ? await hash(body.password) : user.password;

		await this.userRepository.update({
			id,
			store: body.storeId ? new Store({ id: body.storeId }) : user.store,
			name: body.name,
			lastName: body.lastName,
			birthdate: body.birthdate ? new Date(body.birthdate) : null,
			email: body.email,
			password: hashPassword
		});
	}

	async deleteClubCardUser(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new UserNotFoundError();
		try {
			await this.userRepository.deleteClubCardUser(id);
		} catch (e) {
			throw new CantDeleteUserError();
		}

	}

	async updateProfilePic(id: number, image: string) {
		const user = await this.userRepository.findOne(id);
		if (!user) throw new UserNotFoundError();

		const buffer = await createBufferedAvatarImage(image);

		const imageUrl = await this.userS3Repository.save(
			id,
			buffer
		);

		await this.userRepository.update({ id, profilePic: imageUrl });
	}

	async updateUserPoints(id: number, operator: ExtractOperator, points: number) {
		const user = await this.userRepository.findOne(id);
		if (operator === ExtractOperator.ADDITION) {
			await this.userRepository.update({ id, points: user.points + points });
		} else {
			await this.userRepository.update({ id, points: user.points - points });
		}
	}

	async removeStoreWorkers(storeId: number) {
		const workersList = await this.userRepository.findStoreWorkersList(storeId);

		for (const worker of workersList) {
			await this.update(worker.id, { store: null });
		}
	}
}
