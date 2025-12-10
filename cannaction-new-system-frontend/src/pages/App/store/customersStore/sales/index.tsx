import React, { useEffect, useState } from 'react';
import { Form } from './form/Form';
import { TableSales } from './form/TableSales';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemSale } from '../../../../../dtos/requests/CreateSaleRequest';
import { useSnackbar } from '../../../../../contexts/Snackbar';
import SalesService from '../../../../../services/SalesService';
import { useUser } from '../../../../../hooks/querys/user/useUser';
import { useExtracts } from '../../../../../hooks/querys/extract/useExtracts';
import DataTable from '../../../../../components/tableDinamic';
import { columnsPointsRegistration } from '../../../customer/dashboardCustomer/columns';
import { ExtractOperatorEnum, getStatusChipExtractOperator } from '../../../../../models/enums/ExtractOperator.enum';
import { formatDate } from '../../../../../utils/string';
import { useTranslation } from 'react-i18next';

export interface SoldItem {
	itemId: number;
	itemName: string;
	amount: number;
	points: number;
	storePoints?: number;
}

export const CustomerSales: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [limit, setLimit] = useState(10);
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: customer, refetch } = useUser(id ? +id : undefined);
	const [soldItemList, setSoldItemList] = useState<SoldItem[]>([]);
	const [reverseList, setReverseList] = useState<SoldItem[]>([]);
	const [changed, setChanged] = useState(false);
	const [loading, setLoading] = useState(false);
	const { openSnackbar } = useSnackbar();
	const {
		data,
		isRefetching,
		refetch: refetchExtract,
		isLoading,
	} = useExtracts({
		search: searchConfirmed,
		take: limit,
		page: currentPage,
		userId: id ? +id : undefined,
	});
	const {t} = useTranslation();

	useEffect(() => {
		refetch();
		refetchExtract();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setReverseList(soldItemList.reverse().map((a) => a));
		setLoading(false);
	}, [soldItemList]);

	const handleAddItem = (item: SoldItem) => {
		try {
			setLoading(true);
			const itemList = soldItemList;
			itemList.push(item);
			setSoldItemList(itemList);
			setChanged(!changed);
			setReverseList(itemList.reverse().map((a) => a));
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleRemoveItem = (index: number) => {
		setLoading(true);
		const itemList = soldItemList.filter((_, i) => i !== index);
		setSoldItemList(itemList);
		setLoading(false);
		setChanged(!changed);
	};

	const submitSale = async () => {
		if (soldItemList.length == 0) return;
		setLoading(true);
		const items: ItemSale[] = [];
		for (const item of soldItemList) {
			items.push({
				itemId: item.itemId,
				amount: item.amount,
				points: item.points,
				name: item.itemName,
			});
		}
		try {
			await SalesService.createSale({
				customerId: id as unknown as number,
				items,
			});

			openSnackbar(t('store.customers.saleSubmited'), 'success');
			navigate(-1);
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl px-4 mt-4">
			<form action="">
				<div className="row gx-4">
					<div className="col-xl-12">
						<div className="card card-header-actions mb-4">
							<div className="card-header">
								{customer && customer.name
									? `${t('marketing.dashboard.salesTitle')} - ${customer?.name} ${customer?.lastName}`
									: `${t('marketing.dashboard.salesTitle')} - ${t('marketing.clubCard.title')} ${customer?.code}`}
							</div>
							<div className="card-body">
								<div className="row">
									<Form handleAddItem={handleAddItem} loading={loading} />
									<div className="col-xl-8">
										<div className="row">
											<div className="col">
												<TableSales
													changed={changed}
													itemList={reverseList}
													handleRemoveItem={handleRemoveItem}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card-footer">
								<div className="float-sm">
									<button
										disabled={loading || soldItemList.length == 0}
										onClick={submitSale}
										className="btn btn-primary btn-sm"
										type="submit"
									>
										{t('marketing.addPromotion.submitButton')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div className="row">
				<div className="col-xl-12 col-md-12 col-12">
					<DataTable
						meta={data?.meta}
						itemCount={data?.meta?.itemCount ?? 0}
						onPageChange={setCurrentPage}
						onLimitChange={setLimit}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						hasPagination
						hasInteraction
						hasSearch
						titleTable={t('customer.customerDashboard.pointsStatement.title')}
						search={search}
						setSearch={setSearch}
						setSearchConfirmed={setSearchConfirmed}
						columns={columnsPointsRegistration}
						rows={data?.data.map((points) => ({
							pointRegistration: points.description,
							type: getStatusChipExtractOperator(
								points.operator as ExtractOperatorEnum
							),
							points: points.points,
							quantity: points.amount,
							total: points.total,
							balance: points.balance,
							created: formatDate(points.createdAt),
						}))}
						isLoading={isLoading || isRefetching}
						limit={limit}
					/>
				</div>
			</div>
		</div>
	);
};
