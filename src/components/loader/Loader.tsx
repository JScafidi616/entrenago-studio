import React from 'react';

interface LoaderProps {
	message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => (
	<div className="loader">
		<span className="loader-text">
			<p style={{ fontSize: '1rem', fontWeight: 500 }}>{message}</p>
		</span>
		<span className="load"></span>
	</div>
);

export default Loader;
