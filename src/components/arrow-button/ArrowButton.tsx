import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
export type OnClick = () => void;

type arrowButton = {
	stateForm: boolean;
	onOpen: OnClick;
};

export const ArrowButton = ({ stateForm, onOpen }: arrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: stateForm,
			})}
			onClick={onOpen}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: stateForm,
				})}
			/>
		</div>
	);
};
