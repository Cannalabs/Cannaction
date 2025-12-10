import env from '@/config/env';
import { S3BaseRepository } from '@/modules/aws/s3-base.repository';
import { Injectable } from '@nestjs/common';
import { UserProfilePicNotUploadError } from '../errors/user-profile-pic-not-uploaded.error';

@Injectable()
export class UserS3Repository extends S3BaseRepository {
	constructor() {
		super();
	}

	private composeKey(id: number) {
		const key = `${env.DB_DATABASE}/users/${id}.webp`;
		return key.replace(/_/g, '-');
	}

	async save(
		id: number,
		buf: Buffer
	): Promise<string> {
		try {
			return await this.upload({
				key: this.composeKey(id),
				type: 'image/webp',
				body: buf,
			});
		} catch (error) {
			console.log(error)
			throw new UserProfilePicNotUploadError(error);
		}
	}
}