import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { usePrevNextButtons } from './ArrowButtons';
import './styles.css';
import { FaChevronLeft, FaChevronRight } from '../../../../../themes/icons';
import img1 from '../../../../../assets/img/illustrations/camisa-1024x1024.jpg';
import img2 from '../../../../../assets/img/illustrations/camisa-2.jpg';

export type Products = {
	img: string;
	points: string;
	productName: string;
};

interface CarouselProps {
	slides: Products[];
	options?: EmblaOptionsType;
}

export const Carousel: React.FC<CarouselProps> = ({ slides, options }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [
		Autoplay({ playOnInit: false, delay: 3000 }),
	]);
	const [isPlaying, setIsPlaying] = useState(true);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi);

	const onButtonAutoplayClick = useCallback(
		(callback: () => void) => {
			const autoplay = emblaApi?.plugins()?.autoplay;
			if (!autoplay) return;

			const resetOrStop =
				autoplay.options.stopOnInteraction === false
					? autoplay.reset
					: autoplay.stop;

			resetOrStop();
			callback();
		},
		[emblaApi]
	);

	useEffect(() => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		setIsPlaying(autoplay.isPlaying());
		emblaApi
			.on('autoplay:play', () => setIsPlaying(true))
			.on('autoplay:stop', () => setIsPlaying(false))
			.on('reInit', () => setIsPlaying(autoplay.isPlaying()));
	}, [emblaApi]);

	const handleNextButtonClick = () => {
		if (emblaApi) {
			emblaApi.scrollNext();
		}
	};

	const handlePrevButtonClick = () => {
		if (emblaApi) {
			emblaApi.scrollPrev();
		}
	};

	return (
		<div className="col-xl-4 col-md-12 col-12 mb-4">
			<div className="card card-header-actions h-100">
				<div className="card-header">
					Exchange Points
					<div className="dropdown no-caret">
						<button
							id="prevButton"
							className="btn btn-transparent-dark btn-icon"
							type="button"
							onClick={() => onButtonAutoplayClick(handlePrevButtonClick)}
							disabled={prevBtnDisabled}
						>
							<FaChevronLeft />
						</button>
						<button
							id="nextButton"
							className="btn btn-transparent-dark btn-icon"
							type="button"
							onClick={() => onButtonAutoplayClick(handleNextButtonClick)}
							disabled={nextBtnDisabled}
						>
							<FaChevronRight />
						</button>
					</div>
				</div>
				<div className="embla" ref={emblaRef}>
					<div className="embla__container">
						{slides.map((slide, index) => (
							<div className="embla__slide" key={index}>
								<img
									src={slide.img}
									className="d-block w-100"
									style={{ aspectRatio: '16/13' }}
								/>
								<div className="carousel-caption d-none d-md-block">
									<h4 className="h1 bg-white text-primary fw-900">{slide.points}</h4>
									<p className="badge bg-white text-dark fw-600">{slide.productName}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
