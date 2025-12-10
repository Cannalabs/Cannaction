import { ListByCountryForDashboardDto } from './list-by-country-for-dashboard.dto';

export interface GraphicsInfo {
	name: string;
	value: number;
	color: string;
}

export class ListForDashboardDto {
	salesByCountry: GraphicsInfo[];
	itemSalesByCountry: GraphicsInfo[];
	storesByCountry: ListByCountryForDashboardDto[];
	usersByCountry: ListByCountryForDashboardDto[];
}
