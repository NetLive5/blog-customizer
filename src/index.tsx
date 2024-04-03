import clsx from 'clsx';
import { CSSProperties, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Article } from './components/article/Article';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateDefault, setStateDefault] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stateDefault.fontFamilyOption.value,
					'--font-size': stateDefault.fontSizeOption.value,
					'--font-color': stateDefault.fontColor.value,
					'--container-width': stateDefault.contentWidth.value,
					'--bg-color': stateDefault.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleState={setStateDefault} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
