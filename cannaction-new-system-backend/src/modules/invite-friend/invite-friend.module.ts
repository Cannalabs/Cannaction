import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { ExtractModule } from "../extract/extract.module";
import { ProfilePontuationModule } from "../profile-pontuation/profile-pontuation.module";
import { UserModule } from "../user/user.module";
import { InviteFriendController } from "./invite-friend.controller";
import { InviteFriend } from "./invite-friend.entity";
import { InviteFriendRepository } from "./invite-friend.repository";
import { InviteFriendPersistenceService } from "./services/invite-friend-persistence.service";
import { InviteFriendService } from "./services/invite-friend.service";

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([InviteFriend]), ExtractModule, ProfilePontuationModule, UserModule],
	providers: [InviteFriendService, InviteFriendPersistenceService, InviteFriendRepository],
	controllers: [InviteFriendController],
})
export class InviteFriendModule {}