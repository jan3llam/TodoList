import React from 'react';
import PropTypes from 'prop-types';

export default function TodosRemaining (props) {

	return (
		<div>{props.remaining} items left</div>
	);
}


TodosRemaining.propTypes = {

	remaining:PropTypes.number.isRequired,
}



