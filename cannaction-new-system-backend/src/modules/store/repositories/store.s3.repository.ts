import env from '@/config/env';
import { S3BaseRepository } from '@/modules/aws/s3-base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreS3Repository extends S3BaseRepository {
	constructor() {
		super();
	}

	private composeKey(id: number) {
		const key = `${env.DB_DATABASE}/stores/${id}.webp`;
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
		}
	}
}