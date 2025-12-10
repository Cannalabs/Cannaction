import React from 'react';

const permissions = [
	{ id: 'create', label: 'Create' },
	{ id: 'read', label: 'Read' },
	{ id: 'update', label: 'Update' },
	{ id: 'delete', label: 'Delete' },
];

const Permission = ({ userName }) => (
	<div className="card mb-3">
		<div className="card-body">
			<div className="row">
				<div className="col-xl-3">
					<div className="d-flex align-items-center">
						<div className="fs-4 text-dark fw-500">{userName}</div>
					</div>
				</div>
				<div className="col-xl-9">
					<div className="row">
						{permissions.map((permission) => (
							<div key={permission.id} className="col-lg-3 col-sm-6 col-6">
								<div className="d-flex align-items-center">
									<div className="form-check form-switch">
										<input
											style={{ cursor: 'pointer' }}
											className="form-check-input"
											type="checkbox"
											role="switch"
											id={permission.id}
											defaultChecked
										/>
										<label className="form-check-label" htmlFor={permission.id}>
											{permission.label}
										</label>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export const Permissions: React.FC = () => {
	const users = [
		'Garrett Winters',
		'Garrett Winters',
		'Garrett Winters',
		'Garrett Winters',
		'Garrett Winters',
	];

	return (
		<div className="container-xl px-4">
			{users.map((user, index) => (
				<Permission key={index} userName={user} />
			))}
		</div>
	);
};
