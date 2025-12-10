import { MultipartFile } from '@fastify/multipart';
import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { FileSizeTooLargeError } from '../errors/file-size-too-large.error';

const MAX_FILE_SIZE_16MB = 16 * 1024 * 1024;

@Injectable()
export class FileHelperService {
	public async getFileFromRequest(
		req: FastifyRequest,
	): Promise<MultipartFile> {
		try {
			const data = await req.file({
				limits: {
					fileSize: MAX_FILE_SIZE_16MB,
				},
			});
			return data;
		} catch (error) {
			if (error?.code === 'FST_REQ_FILE_TOO_LARGE') {
				throw new FileSizeTooLargeError();
			}
			throw error;
		}
	}
}
