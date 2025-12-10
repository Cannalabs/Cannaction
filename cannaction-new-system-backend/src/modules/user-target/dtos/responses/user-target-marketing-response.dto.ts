import { PaginationDto } from "@/modules/database/pagination/pagination.dto";
import { UserTarget } from "../../user-target.entity";

export class UserTargetMarketingResponse {
	concluded: PaginationDto<UserTarget>;
	notConcluded: PaginationDto<UserTarget>;
}
