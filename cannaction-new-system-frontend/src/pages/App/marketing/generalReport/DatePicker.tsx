import React, { useEffect } from 'react';
import { CiCalendar } from '../../../../themes/icons';
import Litepicker from 'litepicker';
import 'litepicker/dist/plugins/ranges';

export const DatePicker: React.FC = () => {
	useEffect(() => {
		const litepickerRangePlugin = document.getElementById(
			'litepickerRangePlugin'
		) as HTMLInputElement;

		if (litepickerRangePlugin) {
			const picker = new Litepicker({
				element: litepickerRangePlugin,
				startDate: new Date(),
				endDate: new Date(),
				singleMode: false,
				numberOfMonths: 2,
				numberOfColumns: 2,
				format: 'YYYY, DD, MMM',
				plugins: ['ranges'],
			});

			(litepickerRangePlugin as any).litepicker = picker;
		}

		return () => {
			if (litepickerRangePlugin) {
				const pickerInstance = (litepickerRangePlugin as any).litepicker;
				if (pickerInstance) {
					pickerInstance.destroy();
				}
			}
		};
	}, []);

	return (
		<div
			className="input-group input-group-joined border-0 shadow"
			style={{ width: '16.5rem' }}
		>
			<span className="input-group-text">
				<CiCalendar size={18} />
			</span>
			<input
				className="form-control ps-0 pointer"
				id="litepickerRangePlugin"
				placeholder="Select date range..."
			/>
		</div>
	);
};
