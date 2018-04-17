import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../shared/format-json';

export class Library extends React.Component {

	state = {
		view: undefined
	};

	componentDidMount() {

		// Get ID from path parameters
		const {viewId} = this.props.match.params;
		this.setState({view: viewId});
	}

	render() {
		return (
			<main id="" className="container">
				<FormatJson state={this.state}></FormatJson>
			</main>
		);
	}
}

Library.propTypes = {
	match: PropTypes.object
};
