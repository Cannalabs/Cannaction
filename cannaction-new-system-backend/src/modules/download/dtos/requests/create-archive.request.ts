import { UserType } from "@/modules/user/enums/user-type.enum";
import { MultipartFile } from "@fastify/multipart";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateArchiveRequest {
	@IsNotEmpty({ message: 'Folder is mandatory.' })
	folderId: number;

	@IsNotEmpty({ message: 'File is mandatory.' })
	file: MultipartFile;

	@IsOptional()
	countryId?: number;

	@IsOptional()
	@IsEnum(UserType)
	userType?: UserType;
}