import React from 'react';
import PropTypes from 'prop-types';

export default function Filters (props) {

	return (
		<div>
          <button className={props.filter === 'all' ? 'active' : ''} onClick={() => {props.changeFilter('all')}}>All</button>
          <button className={props.filter === 'active' ? 'active' : ''} onClick={() => {props.changeFilter('active')}}>Active</button>
          <button className={props.filter === 'completed' ? 'active' : ''} onClick={() => {props.changeFilter('completed')}}>Completed</button>
        </div>
	);
}


Filters.propTypes = {
     
     filter:PropTypes.string.isRequired,
     changeFilter:PropTypes.func.isRequired,
}


