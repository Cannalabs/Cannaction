import React, { useState } from 'react';
import invite from '../../../../assets/img/illustrations/invite.svg';
import DataTable from '../../../../components/tableDinamic';
import { columnsInvite } from './columns';
import { getInviteStatusChip } from '../../../../models/enums/inviteStatus.enum';
import { useInviteFriends } from '../../../../hooks/querys/inviteFriend/useInviteFriends';
import { formatDate } from '../../../../utils/string';
import { useSnackbar } from '../../../../contexts/Snackbar';
import InviteFriendService from '../../../../services/InviteFriendService';


export const InviteFriend: React.FC = () => {
	const [search, setSearch] = useState('');
	const [searchConfirmed, setSearchConfirmed] = useState('');
	const [limit, setLimit] = useState(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [email, setEmail] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const { openSnackbar } = useSnackbar();


	const { data, isLoading, isRefetching, refetch } = useInviteFriends({
		search: searchConfirmed,
		take: limit,
		page: currentPage
	});

	const handleInvitation = async () => {
		setLoading(true);
		try {
			await InviteFriendService.createInvteFriend({email});
			openSnackbar('Invite generated successfully!', 'success');
			setEmail('');
			refetch();
		}catch (e: unknown) {
			openSnackbar(e, 'error');
		
		}  finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl px-4 mt-n10">
			<div className="row">
				<div className="col-xl-12 col-md-12 col-12 mb-4">
					<div className="card">
						<div className="card-body p-5">
							<div className="row align-items-center justify-content-between">
								<div className="col-xl-6 col-sm-9 order-1 order-lg-0">
									<input
										className="form-control"
										value={email}
										disabled={loading}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Your Friend's Email"
									/>
									<button
										disabled={loading}
										type="submit"
										onClick={handleInvitation}
										className="btn btn-primary w-100 mt-3"
									>
										Send Invitation
									</button>
								</div>
								<div className="col-xl-6 col-sm-3 mb-4">
									<img className="img-fluid px-xl-4 mt-xxl-n5" src={invite} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12 mb-4">
					<DataTable
						isLoading={isLoading || isRefetching}
						limit={limit}
						hasSearch
						search={search}
						setSearch={setSearch}
						setSearchConfirmed={setSearchConfirmed}
						currentPage={currentPage}
						itemCount={data?.meta.itemCount ?? 0}
						meta={data?.meta}
						columns={columnsInvite}
						onLimitChange={setLimit}
						onPageChange={setCurrentPage}
						setCurrentPage={setCurrentPage}
						titleTable="Invitation Sent"
						rows={data?.data.map((invite) => ({
							email: invite.email,
							sendDate: formatDate(invite.createdAt),
							status: getInviteStatusChip(invite.status),
						}))}
					/>
				</div>
			</div>
		</div>
	);
};
