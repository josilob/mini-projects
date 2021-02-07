import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';

const items = [
	{
		title: 'What is React?',
		content: 'React is a front end javascript framework',
	},
	{
		title: 'Why use React?',
		content: 'React is a favorite JS library among engineers',
	},
	{
		title: 'How do you use React?',
		content: 'You use React by creating components',
	},
];

const options = [
	{ label: 'The Color Red', value: 'red' },
	{ label: 'The Color Green', value: 'green' },
	{ label: 'A Shade of Blue', value: 'blue' },
];

const App = () => {
	const [selected, setSelected] = useState(options[0]);

	const showAccordion = () => {
		if (window.location.pathname === '/') return <Accordion items={items} />;
	};

	return (
		<div>
			<Route path='/'>
				<Accordion items={items} />
			</Route>
			<Route path='/list'>
				<Search />
			</Route>
			<Route path='/dropdown'>
				<Dropdown
					options={options}
					selected={selected}
					onSelectedChange={setSelected}
					label='Select a Color'
				/>
			</Route>
			<Route path='/translate'>
				<Translate />
			</Route>
		</div>
	);
};
export default App;
