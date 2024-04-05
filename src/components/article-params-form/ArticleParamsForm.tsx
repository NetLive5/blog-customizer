import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

type ArticleStateProps = {
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleStateProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [stateParams, setStateParams] = useState(defaultArticleState);

	const refForm = useRef<HTMLFormElement>(null);

	useEffect(() => {
		function handleEscapeKey(event: KeyboardEvent) {
			if (event.code === 'Escape') {
				setIsOpen(false);
			}
		}

		function clickOutside(e: MouseEvent) {
			if (
				setIsOpen &&
				refForm.current &&
				!refForm.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', clickOutside);
		document.addEventListener('keydown', handleEscapeKey);
		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
			document.removeEventListener('mousedown', clickOutside);
		};
	}, []);

	const handlerClickOpen = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(stateParams);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStateParams(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleOnChange =
		(key: keyof typeof stateParams) => (item: OptionType) => {
			setStateParams({ ...stateParams, [key]: item });
		};

	return (
		<>
			<ArrowButton stateForm={isOpen} onOpen={handlerClickOpen} />
			<aside
				ref={refForm}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						selected={stateParams.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title='Размер Шрифта'
						name='Font Size'
						selected={stateParams.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						options={fontSizeOptions}></RadioGroup>
					<Select
						title='Цвет Шрифта'
						selected={stateParams.fontColor}
						onChange={handleOnChange('fontColor')}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={stateParams.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						selected={stateParams.contentWidth}
						onChange={handleOnChange('contentWidth')}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
