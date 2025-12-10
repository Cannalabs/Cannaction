import env from '@/config/env';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

type S3Upload = {
	key: string;
	type: string;
	encoding?: string;
	body: Buffer | string;
};

type S3Delete = {
	key: string;
};

export abstract class S3BaseRepository {
	private s3: S3Client;
	constructor() {
		this.s3 = new S3Client({
			region: 'us-east-2',
			credentials: {
				accessKeyId: env.IAM_USER_KEY,
				secretAccessKey: env.IAM_USER_SECRET,
			},
		});
	}

	private createObjectUrl(key: string) {
		return `https://${env.S3_BUCKET}.s3.amazonaws.com/${key}`;
	}

	protected async upload({ key, type, body, encoding }: S3Upload) {
		const command = new PutObjectCommand({
			ACL: 'public-read',
			Bucket: env.S3_BUCKET,
			ContentEncoding: encoding,
			ContentType: type,
			Key: key,
			Body: body,
		});

		await this.s3.send(command);
		return this.createObjectUrl(key);
	}

	protected async delete({ key }: S3Delete): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: env.S3_BUCKET,
			Key: key,
		});

		await this.s3.send(command);
	}
}
