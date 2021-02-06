import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('code');
	const [debouncedTerm, setDebouncedTerm] = useState('code');
	const [results, setResults] = useState([]);

	// runs every time we type in the input and change its state(vlaue)
	// any time this useEffect changes, we are going to queue up a change to debouncedTerm that executes after 1 sec
	useEffect(() => {
		const timerId = setTimeout(() => {
			if (term) setDebouncedTerm(term);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [term]);

	// whenever debouncedTerm updates above in 1st useEffect, the 2nd one with the actual SEARCH will run
	// this helps solve warnings and errors with dependency array when they are combined in one
	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: debouncedTerm,
				},
			});

			if (data.query) setResults(data.query.search);
		};
		search();
	}, [debouncedTerm]);

	// useEffect(() => {
	// const search = async () => {
	// 	const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
	// 		params: {
	// 			action: 'query',
	// 			list: 'search',
	// 			origin: '*',
	// 			format: 'json',
	// 			srsearch: debouncedTerm,
	// 		},
	// 	});
	// 	setResults(data.query.search);
	// 	if (term && !results.length) {
	// 		search();
	// 	} else {
	// 		const timeoutId = setTimeout(() => {
	// 			if (term) search();
	// 		}, 500);
	// 		// cleanup portion of useEffect, which resets timeout as long as we type since [term] keeps changing
	// 		// and useEffect keeps rerunning
	// 		return () => {
	// 			clearTimeout(timeoutId);
	// 		};
	// 	}
	// 	// throttle API search (delayed request)
	// }, [term, results.length]);

	const renderedResults = results.map((result) => {
		return (
			<div className='item' key={result.pageid}>
				<div className='right floated content'>
					<a
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
						className='ui button'
						target='_blank'
						rel='noreferrer'>
						Go
					</a>
				</div>
				<div className='content'>
					<div className='header'>{result.title}</div>
					<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
					{/* other way to replace inserted spans in our results was through replace method */}
					{/* dangerouslySetInnerHTML takes a string and renders it as HTML */}
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className='ui form'>
				<div className='field'>
					<label>Enter Search Term</label>
					<input
						value={term}
						onChange={(e) => setTerm(e.target.value)}
						className='input'
					/>
				</div>
			</div>
			<div className='ui celled list'>{renderedResults}</div>
		</div>
	);
};

export default Search;
