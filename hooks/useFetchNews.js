import axios from 'axios';
import { useState } from 'react';

import { NEWS_API_ENTRY_POINT, NEWS_API_KEY } from '../api';

function useFetchNews() {
	const [results, setResults] = useState([]);

	async function fetchNewsAction(query, category) {
		try {
			const { data } = await axios.get(
				`${NEWS_API_ENTRY_POINT}/top-headlines?q=${query}&category=${category}&apiKey=${NEWS_API_KEY}`
			);

			if (data.status === 'ok' && data?.articles) {
				setResults(data.articles);
			} else {
				setResults([]);
			}
		} catch (err) {
			console.log('err', err);
			setResults([]);
		}
	}

	return { fetchNewsAction, results };
}

export default useFetchNews;
