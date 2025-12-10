import env from '@/config/env';
import { S3BaseRepository } from '@/modules/aws/s3-base.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloadS3Repository extends S3BaseRepository {
	constructor() {
		super();
	}

	private composeKey(folderName: string, archiveName: string) {
		const key = `${env.DB_DATABASE}/downloads/${folderName}/$${archiveName}`; //TODO: Permitir zip e outros arquivos
		return key.replace(/_/g, '-');
	}

	async save(
		folderName: string,
		archiveName: string,
		buf: Buffer,
		mimeType: string
	): Promise<string> {
		try {
			return await this.upload({
				key: this.composeKey(folderName, archiveName),
				type: mimeType,
				body: buf,
			});
		} catch (error) {
			console.log(error)
		}
	}

	async remove(folderName: string, archiveName: string) {
		try {
			await this.delete({
				key: this.composeKey(folderName, archiveName),
			});
		} catch (error) {
			console.log(error);
		}
	}
}