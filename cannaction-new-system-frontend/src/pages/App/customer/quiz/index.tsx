import { Grid, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from '../../../../components/tableDinamic';
import { useNavigate } from 'react-router-dom';
import { columnsQuiz, columnsQuizAnswered } from './columnsQuiz';
import { BsArrowReturnRight } from '../../../../themes/icons';
import { useAnsweredQuizes } from '../../../../hooks/querys/quiz/useAnsweredQuiz';
import { useUnansweredQuizes } from '../../../../hooks/querys/quiz/useUnansweredQuiz';
import { formatDate } from '../../../../utils/string';
import { useTranslation } from 'react-i18next';

export const QuizCustomer: React.FC = () => {
	const navigate = useNavigate();
	const [searchUnanswered, setSearchUnanswered] = useState('');
	const [searchConfirmedUnanswered, setSearchConfirmedUnanswered] = useState('');
	const [searchAnswered, setSearchAnswered] = useState('');
	const [searchConfirmedAnswered, setSearchConfirmedAnswered] = useState('');
	const [limitUnanswered, setLimitUnanswered] = useState(10);
	const [limitAnswered, setLimitAnswered] = useState(10);
	const [currentPageUnanswered, setCurrentPageUnanswered] = useState<number>(1);
	const [currentPageAnswered, setCurrentPageAnswered] = useState<number>(1);
	const {t} = useTranslation();

	const handleReply = (id: number) => {
		navigate(`/reply-quiz/${id}`);
	};

	const {
		data: answeredList,
		refetch: refetchAnswered,
		isRefetching: isRefetchingAnswered,
		isLoading: isLoadingAnswered,
	} = useAnsweredQuizes({
		search: searchConfirmedAnswered,
		take: limitAnswered,
		page: currentPageAnswered,
	});

	const {
		data: unansweredList,
		refetch: refetchUnanswered,
		isRefetching: isRefetchingUnanswered,
		isLoading: isLoadingUnanswered,
	} = useUnansweredQuizes({
		search: searchConfirmedUnanswered,
		take: limitUnanswered,
		page: currentPageUnanswered,
	});

	useEffect(() => {
		refetchAnswered()
		refetchUnanswered()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="container-xl px-4 mt-n10">
			<DataTable
				hasPagination
				currentPage={currentPageUnanswered}
				setCurrentPage={setCurrentPageUnanswered}
				hasInteraction
				meta={unansweredList?.meta}
				onPageChange={setCurrentPageUnanswered}
				onLimitChange={setLimitUnanswered}
				itemCount={unansweredList?.meta.itemCount ?? 0}
				hasSearch
				titleTable={t('store.quiz.unansweredQuizzes')}
				search={searchUnanswered}
				setSearch={setSearchUnanswered}
				setSearchConfirmed={setSearchConfirmedUnanswered}
				columns={columnsQuiz}
				rows={unansweredList?.data.map((quiz) => ({
					name: quiz.description,
					points: quiz.points,
					created: formatDate(quiz.createdAt),
					actions: (
						<Tooltip title={t('store.quiz.reply')}>
							<IconButton onClick={() => handleReply(quiz.id)}>
								<BsArrowReturnRight size="14px" />
							</IconButton>
						</Tooltip>
					),
				}))}
				isLoading={isLoadingUnanswered || isRefetchingUnanswered}
				limit={limitUnanswered}
			/>
			<Grid mt={2}>
				<DataTable
					hasPagination
					currentPage={currentPageAnswered}
					setCurrentPage={setCurrentPageAnswered}
					hasInteraction
					meta={answeredList?.meta}
					onPageChange={setCurrentPageAnswered}
					onLimitChange={setLimitAnswered}
					itemCount={answeredList?.meta.itemCount ?? 0}
					hasSearch
					titleTable={t('store.quiz.answeredQuizzes')}
					search={searchAnswered}
					setSearch={setSearchAnswered}
					setSearchConfirmed={setSearchConfirmedAnswered}
					columns={columnsQuizAnswered}
					rows={answeredList?.data.map((quiz) => ({
						name: quiz.description,
						points: quiz.points,
						created: formatDate(quiz.createdAt),
						answered: formatDate(quiz.quizUsers[0].answerDate ?? ''),
					}))}
					isLoading={isLoadingAnswered || isRefetchingAnswered}
					limit={limitAnswered}
				/>
			</Grid>
		</div>
	);
};
