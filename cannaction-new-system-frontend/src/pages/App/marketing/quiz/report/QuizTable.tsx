import React, { useState } from 'react';
import DataTable from '../../../../../components/tableDinamic';
import { columns } from './colums';
import { useQuizes } from '../../../../../hooks/querys/quiz/useQuizes';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const QuizTable: React.FC = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const {
		data: quizList,

		isLoading,
	} = useQuizes({ search: searchConfirmed, take: limit, page: currentPage });

	const handleNavigate = () => {
		navigate('/add-quiz');
	};

	const data = [
		{
			id: 1,
			option: 'Yes',
			percent: '50%',
			total: 10,
		},
		{
			id: 2,
			option: 'No',
			percent: '50%',
			total: 10,
		},
	];

	return (
		<Grid container sx={{ width: '50%' }}>
			<DataTable
				isLoading={isLoading}
				limit={limit}
				meta={quizList?.meta}
				itemCount={quizList?.meta?.itemCount ?? 0}
				onPageChange={setCurrentPage}
				onLimitChange={setLimit}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				cadaster
				hasSearch
				hasInteraction
				titleTable="Quiz Name"
				handleOpen={handleNavigate}
				search={search}
				setSearch={setSearch}
				setSearchConfirmed={setSearchConfirmed}
				columns={columns}
				rows={data.map((quiz) => ({
					option: quiz.option,
					percent: quiz.percent,
					total: quiz.total,
				}))}
			/>
		</Grid>
	);
};
