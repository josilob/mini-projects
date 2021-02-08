// since JSX syntax is not being used there's need to import React on top
import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
	// invoke piece of state with sole purpose to force rerender
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	useEffect(() => {
		const onLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		window.addEventListener('popstate', onLocationChange);

		// clean event listener when we change location
		return () => {
			window.removeEventListener('popstate', onLocationChange);
		};
	}, []);
	return currentPath === path ? children : null;
};

export default Route;
