const Route = ({ path, children }) => {
	return window.location.pathname === path ? children : null;
};

export default Route;

// since we are not utilizing JSX syntax we do not need to import React on top
