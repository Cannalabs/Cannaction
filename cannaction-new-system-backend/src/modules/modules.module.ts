import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BarcodeModule } from './barcode/barcode.module';
import { ChangeShopModule } from './change-shop/change-shop.module';
import { CityModule } from './city/city.module';
import { ClubCardCodeListModule } from './club-card-code-list/club-card-code-list.module';
import { CountryModule } from './country/country.module';
import { CouponModule } from './coupon/coupon.module';
import { DatabaseModule } from './database/database.module';
import { DownloadModule } from './download/download.module';
import { ExtractModule } from './extract/extract.module';
import { InviteFriendModule } from './invite-friend/invite-friend.module';
import { ItemModule } from './item/item.module';
import { LanguageModule } from './language/language.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { NotificationModule } from './notification/notification.module';
import { ProfilePontuationModule } from './profile-pontuation/profile-pontuation.module';
import { PromotionModule } from './promotion/promotion.module';
import { QuestionModule } from './question/question.module';
import { QuizzModule } from './quizz/quizz.module';
import { SaleModule } from './sale/sale.module';
import { StateModule } from './state/state.module';
import { StockModule } from './stock/stock.module';
import { StoreTargetModule } from './store-target/store-target.module';
import { StoreModule } from './store/store.module';
import { UserTargetModule } from './user-target/user-target.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		AuthModule,
		BarcodeModule,
		ChangeShopModule,
		CityModule,
		ClubCardCodeListModule,
		CountryModule,
		CouponModule,
		DatabaseModule,
		DownloadModule,
		ExtractModule,
		ItemModule,
		InviteFriendModule,
		LanguageModule,
		NewsletterModule,
		NotificationModule,
		ProfilePontuationModule,
		PromotionModule,
		StoreTargetModule,
		QuestionModule,
		QuizzModule,
		SaleModule,
		StateModule,
		StoreModule,
		StockModule,
		UserModule,
		UserTargetModule,
	],
	providers: [],
	controllers: [],
})
export class ModuleModule {}
