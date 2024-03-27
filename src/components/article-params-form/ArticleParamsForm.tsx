import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState } from 'react';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [open, setOpen] = useState(false);

	const isOpen = () => {
		setOpen((prevState) => !prevState);
	};

	return (
		<>
			<ArrowButton state={open} onOpen={isOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: open,
				})}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
