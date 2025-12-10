import { Column } from '../../../../../components/tableDinamic';

export const columnsStock: Column[] = [
	{ id: 'product', label: 'Product', minWidth: 170 },
	{ id: 'lastUpdate', label: 'Last Update', minWidth: 100 },
	{ id: 'input', label: 'Input', minWidth: 100 },
	{ id: 'output', label: 'Output', minWidth: 100 },
	// { id: 'minimumAmount', label: 'Minimum Amount', minWidth: 100 },
	{ id: 'total', label: 'Total', minWidth: 100 },
	// { id: 'actions', label: 'Actions', minWidth: 100 },
];

export const columnsPointsStatement: Column[] = [
	{ id: 'description', label: 'Description', minWidth: 170 },
	{ id: 'type', label: 'Type', minWidth: 100 },
	{ id: 'points', label: 'points', minWidth: 100 },
	{ id: 'amount', label: 'Amount', minWidth: 100 },
	{ id: 'total', label: 'total', minWidth: 100 },
	{ id: 'balance', label: 'Balance', minWidth: 100 },
	{ id: 'created', label: 'created', minWidth: 100 },
];

export const columnsPromotions: Column[] = [
	// { id: 'thumb', label: 'Thumb', minWidth: 170 },
	{ id: 'promotion', label: 'Promotion', minWidth: 100 },
	{ id: 'coupons', label: 'Coupons', minWidth: 100 },
	{ id: 'created', label: 'Created', minWidth: 100 },
	{ id: 'active', label: 'Status', minWidth: 100 },
	// { id: 'actions', label: 'Actions', minWidth: 100 },
];

export const columnsCoupons: Column[] = [
	{ id: 'code', label: 'Promo Code', minWidth: 170 },
	{ id: 'item', label: 'item', minWidth: 100 },
	{ id: 'date', label: 'Date', minWidth: 100 },
	{ id: 'type', label: 'Type', minWidth: 100 },
	{ id: 'customer', label: 'Customer', minWidth: 100 },
	{ id: 'store', label: 'Store', minWidth: 100 },
	{ id: 'country', label: 'Country', minWidth: 100 },
	{ id: 'actions', label: 'Actions', minWidth: 100 },
];

export const columnsCustomers: Column[] = [
	{ id: 'code', label: 'Code', minWidth: 170 },
	{ id: 'name', label: 'Name', minWidth: 100 },
	{ id: 'email', label: 'Email', minWidth: 100 },
	{ id: 'status', label: 'Status', minWidth: 100 },
	// { id: 'actions', label: 'Actions', minWidth: 100 },
];

export const columnsWorkers: Column[] = [
	{ id: 'name', label: 'Name', minWidth: 100 },
	{ id: 'email', label: 'Email', minWidth: 100 },
	{ id: 'points', label: 'Points', minWidth: 100 },
	{ id: 'createdAt', label: 'Created At', minWidth: 100 },
	{ id: 'actions', label: 'Actions', minWidth: 100 },
];
