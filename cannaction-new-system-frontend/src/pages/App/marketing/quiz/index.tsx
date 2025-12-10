import { IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../../../../components/tableDinamic';

import { MenuComponent } from '../../../../components/menuComponent';
import {
	// BsPieChart,
	BsThreeDotsVertical,
	BsTrash3,
} from '../../../../themes/icons';
import { useNavigate } from 'react-router-dom';
import { useColumnsQuiz } from './columnsQuiz';
import { getStatusChipQuiz } from '../../../../models/enums/quizStatus.enum';
import QuizzEntity from '../../../../models/entities/QuizEntity';
import { useQuizes } from '../../../../hooks/querys/quiz/useQuizes';
import { formatDate } from '../../../../utils/string';
import { useSnackbar } from '../../../../contexts/Snackbar';
import QuizService from '../../../../services/QuizService';

import { useModal } from '../../../../contexts/ModalMessage';
import { useTranslation } from 'react-i18next';

export const Quiz: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [quiz, setQuiz] = useState<QuizzEntity>();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const open = Boolean(anchorEl);
	const {
		data: quizList,
		refetch,
		isRefetching,
		isLoading,
	} = useQuizes({ search: searchConfirmed, take: limit, page: currentPage });
	const { openSnackbar } = useSnackbar();
	const { showConfirm } = useModal();
	const { t } = useTranslation();
	const { columnsQuiz } = useColumnsQuiz();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchConfirmed]);

	const handleQuizStatus = async (id: number, active: boolean) => {
		setAnchorEl(null);
		try {
			await QuizService.changeQuizStatus(id, active);
			refetch();
			openSnackbar(t('marketing.Quiz.quizStatus'), 'success');
		} catch (e) {
			openSnackbar(e, 'error');
		}
	};

	const handleDeleteQuiz = async (id: number) => {
		setAnchorEl(null);
		try {
			await QuizService.deleteQuiz(id);
			refetch();
			openSnackbar(t('marketing.Quiz.quizDeleted'), 'success');
		} catch (e: unknown) {
			openSnackbar(e, 'error');
		}
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleAddQuiz = () => {
		navigate('/add-quiz');
	};

	const handleOpenEdit = (id: number) => {
		navigate(`/edit-quiz/${id}`);
	};

	// const handleViewReport = (id: number) => {
	// 	navigate(`/report-quiz/${id}`);
	// };

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				limit={limit}
				meta={quizList?.meta}
				itemCount={quizList?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				hasPagination
				hasInteraction
				hasSearch
				titleTable={t('tables.userMarketing.quiz.tableTitle')}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				handleOpen={() => handleAddQuiz()}
				columns={columnsQuiz}
				rows={quizList?.data?.map((quiz) => ({
					name: quiz.description,
					points: quiz.points,
					country: quiz.country.name,
					created: formatDate(quiz.createdAt),
					active: getStatusChipQuiz(quiz.published),
					actions: (
						<>
							<Tooltip title={t('marketing.Quiz.actionsColumnMoreTooltip')}>
								<IconButton
									onClick={(event) => {
										handleClick(event);
										setQuiz(quiz);
									}}
								>
									<BsThreeDotsVertical size="14px" />
								</IconButton>
							</Tooltip>

							{/* <Tooltip title={t('marketing.Quiz.actionsColumnViewReportTooltip')}>
								<IconButton onClick={() => handleViewReport(quiz.id)}>
									<BsPieChart size="14px" />
								</IconButton>
							</Tooltip> */}

							<Tooltip title={t('marketing.Quiz.actionsColumnRemoveTooltip')}>
								<IconButton
									onClick={() =>
										showConfirm(t('marketing.Quiz.quizRemoveConfirm'), {
											title: t('marketing.Quiz.quizRemove'),
											onConfirm: () => handleDeleteQuiz(quiz.id),
										})
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

			{quiz && (
				<MenuComponent
					handleClose={() => handleClose()}
					anchorEl={anchorEl}
					open={open}
					handleOpenEdit={() => handleOpenEdit(quiz?.id)}
					handleActive={() => handleQuizStatus(quiz.id, quiz.published)}
					handleInactive={() => handleQuizStatus(quiz.id, quiz.published)}
					active={quiz.published}
					entityId={quiz.id}
				/>
			)}
		</div>
	);
};
