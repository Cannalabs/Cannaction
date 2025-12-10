import { IsNotEmpty } from "class-validator";

export class CreateFolderRequest {
	@IsNotEmpty({ message: 'Folder name is mandatory.' })
	name: string;
}