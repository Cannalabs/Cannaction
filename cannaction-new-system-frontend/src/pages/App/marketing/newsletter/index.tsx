import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DataTable from '../../../../components/tableDinamic';
import { BsPencilSquare, BsTrash3 } from '../../../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { columnsNewsletter } from './columnsNewsletter';
import NewsletterEntity from '../../../../models/entities/NewsletterEntity';
import { getNewsletterStatusChip } from '../../../../models/enums/newsletterStatus.enum';
import { useNewsletters } from '../../../../hooks/querys/newsletter/useNewsletters';
import { useSnackbar } from '../../../../contexts/Snackbar';
import NewsletterService from '../../../../services/NewsletterService';
import { getNewsletterUserTypeText } from '../../../../models/enums/NewsletterUserType.enum';
import { formatDate } from '../../../../utils/string';
import { useModal } from '../../../../contexts/ModalMessage';
import { useTranslation } from 'react-i18next';

export const NewsLetter: React.FC = () => {	
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [newsletter, setNewsletter] = useState<NewsletterEntity>();
	const {
		data: newsletters,
		isLoading,
		isRefetching,
		refetch,
	} = useNewsletters({ search: searchConfirmed });
	const { openSnackbar } = useSnackbar();
	const { showConfirm } = useModal();
	const {t} = useTranslation();

	const handleDeleteNewsletter = async (id: number) => {
		try {
			await NewsletterService.deleteNewsletter(id);
			refetch();
			openSnackbar(t('marketing.addNewsletter.newsletterDeleted'), 'success');
		}catch (e: unknown) {
			openSnackbar(e, 'error');
		
		}
	};

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	const handleNavigate = (id: number) => {
		navigate(`/edit-newsletter/${id}`);
	};

	const handleAdd = () => {
		navigate(`/add-newsletter`);
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				limit={limit}
				meta={newsletters?.meta}
				itemCount={newsletters?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('marketing.newsletter.Nesletters')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={() => handleAdd()}
				columns={columnsNewsletter}
				rows={newsletters?.data.map((news) => ({
					title: news.title,
					typeUser: getNewsletterUserTypeText(news.userType),
					country: news.country.name,
					created: formatDate(news.createdAt),
					status: getNewsletterStatusChip(news.published),
					actions: (
						<>
							<Tooltip title={t('marketing.newsletter.actionsColumnEditTooltip')} placement="top">
								<IconButton
									onClick={() => {
										setNewsletter(newsletter);
										handleNavigate(news.id);
									}}
								>
									<BsPencilSquare size="14px" />
								</IconButton>
							</Tooltip>
							<Tooltip title={t('marketing.newsletter.actionsColumnRemoveTooltip')}>
								<IconButton
									onClick={() =>
										showConfirm(
											t('marketing.addNewsletter.newsletterDeleteConfirm'),
											{
												title: t('marketing.addNewsletter.newsletterDelete'),
												onConfirm: () => handleDeleteNewsletter(news.id),
											}
										)
									}
								>
									<BsTrash3 size="14px" />
								</IconButton>
							</Tooltip>
						</>
					),
				}))}
				isLoading={isLoading || isRefetching}
			/>
		</div>
	);
};
