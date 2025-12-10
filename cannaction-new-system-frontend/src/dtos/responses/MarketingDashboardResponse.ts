import ListByCountryForDashboardResponse from "./ListByCountryForDashboardResponse";

export interface GraphicsInfo {
    name: string;
	value: number;
	color: string;
}

export interface MarketingDashboardResponse {
    salesByCountry: GraphicsInfo[];
    itemSalesByCountry: GraphicsInfo[];
    storesByCountry: ListByCountryForDashboardResponse[];
    usersByCountry: ListByCountryForDashboardResponse[];
}