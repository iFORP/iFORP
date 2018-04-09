import React from 'react';
import {PropTypes} from 'prop-types';

export const Views = ({views}) => {
	return (
		<div className="row justify-content-md-center text-center">
			{views ? views.map((view, index) => <View key={view.id} view={view} isNotLast={index < views.length - 1} />) : null}
		</div>
	);
};

Views.propTypes = {
	views: PropTypes.array
};

const View = ({view, isNotLast}) => {
	return (
		<React.Fragment>
			<div className="card">
				<div className="card-header">
					<h5 className="card-title mb-0">{view.name}</h5>
				</div>
				<div className="card-body">
					<div className="btn-group" role="group" aria-label="Basic example">
						<button type="button" className="btn btn-secondary"><span className="oi oi-trash"></span></button>
						<button type="button" className="btn btn-secondary"><span className="oi oi-plus"></span></button>
						<button type="button" className="btn btn-secondary"><span className="oi oi-pencil"></span></button>
					</div>
				</div>
			</div>
			{isNotLast ? <span className="card-divider-horizontal align-self-center">&nbsp;</span> : null}
		</React.Fragment>
	);
};

View.propTypes = {
	view: PropTypes.object,
	isNotLast: PropTypes.bool
};
