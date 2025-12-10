import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Typography, Box } from '@mui/material';
import './styles.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
// import { usePrevNextButtons } from '../carousel/ArrowButtons';
import { useNavigate } from 'react-router-dom';
import { ItemEntity } from '../../../../../models/entities/ItemEntity';
import img from '../../../../../../public/favicon.ico';
import { useItemForExchange } from '../../../../../hooks/querys/item/useItemForExchange';
import { useTranslation } from 'react-i18next';

const ItemComponent: React.FC<{ item: ItemEntity }> = ({ item }) => {
	const navigate = useNavigate();
	const {t} = useTranslation();
	return (
		<div
			style={{ cursor: 'pointer' }}
			onClick={() => navigate('/exchange-points')}
		>
			<Box
				component="img"
				sx={{
					height: 250,
					display: 'block',
					overflow: 'hidden',
					width: '100%',
				}}
				src={item.image ?? img}
				alt={item.name}
			/>
			<Box p={2} textAlign="center">
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="subtitle1">{item.points} {t('customer.customerDashboard.pointsStatement.table.points')}</Typography>
			</Box>
		</div>
	);
};

interface EmblaCarouselProps {
	options?: EmblaOptionsType;
}

export const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ options }) => {
	const { data } = useItemForExchange();
	const { t } = useTranslation();

	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: true, delay: 3000 }),
	]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setIsPlaying] = useState(true);

	useEffect(() => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		setIsPlaying(autoplay.isPlaying());
		emblaApi
			.on('autoplay:play', () => setIsPlaying(true))
			.on('autoplay:stop', () => setIsPlaying(false))
			.on('reInit', () => setIsPlaying(autoplay.isPlaying()));
	}, [emblaApi]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<div className="col-xl-4 col-md-12 col-12 mb-4">
			<div className="card card-header-actions h-100 ">
				<div className="card-header">
					{t('customer.customerDashboard.exchangePointsTitle')}
					<div className="dropdown no-caret">
						<button
							id="prevButton"
							className="btn btn-transparent-dark btn-icon"
							type="button"
							onClick={scrollPrev}
						>
							<FaChevronLeft />
						</button>
						<button
							id="nextButton"
							className="btn btn-transparent-dark btn-icon"
							type="button"
							onClick={scrollNext}
						>
							<FaChevronRight />
						</button>
					</div>
				</div>
				<Box className="embla" ref={emblaRef}>
					<Box className="embla__container">
						{data?.map((item, index) => (
							<Box className="embla__slide" key={index}>
								<ItemComponent item={item} />
							</Box>
						))}
					</Box>
				</Box>
			</div>
		</div>
	);
};
