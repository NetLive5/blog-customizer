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
	const [open, setOpen] = useState(false);
	const [state, setState] = useState(defaultArticleState);

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		function handleEscapeKey(event: KeyboardEvent) {
			if (event.code === 'Escape') {
				setOpen(false);
			}
		}
		document.addEventListener('keydown', handleEscapeKey);
		return () => document.removeEventListener('keydown', handleEscapeKey);
	}, []);

	const handlerClickOpen = () => {
		setOpen((prevState) => !prevState);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(state);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton stateForm={open} onOpen={handlerClickOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: open,
				})}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						selected={state.fontFamilyOption}
						onChange={(item: OptionType) => {
							setState({ ...state, fontFamilyOption: item });
						}}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title='Размер Шрифта'
						name='Font Size'
						selected={state.fontSizeOption}
						onChange={(item: OptionType) => {
							setState({ ...state, fontSizeOption: item });
						}}
						options={fontSizeOptions}></RadioGroup>
					<Select
						title='Цвет Шрифта'
						selected={state.fontColor}
						onChange={(item: OptionType) =>
							setState({ ...state, fontColor: item })
						}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={state.backgroundColor}
						onChange={(item: OptionType) =>
							setState({ ...state, backgroundColor: item })
						}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						selected={state.contentWidth}
						onChange={(item: OptionType) =>
							setState({ ...state, contentWidth: item })
						}
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
