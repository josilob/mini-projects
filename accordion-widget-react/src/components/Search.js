import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('');

	useEffect(() => {
		(async () => {
			await axios.get('https://en.wikipedia.org/w/api.php?', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: term,
				},
			});
		})();
		// or we could have gone with:
		// const search = async()=>{await axios.get('asdasd')}
	}, [term]);

	console.log('I run with each render');
	return (
		<div>
			<div className='ui form'>
				<div className='field'>
					<label>Enter Search term</label>
					<input
						className='input'
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Search;
