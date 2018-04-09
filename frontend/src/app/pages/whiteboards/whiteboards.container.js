import React from 'react';
import {PropTypes} from 'prop-types';

import {get} from '../../base/http';
import {FormatJson} from '../../shared/format-json';
import {Header} from './whiteboards.header';
import {Views} from './whiteboards.views';

export class Whiteboards extends React.Component {

	state = {
		whiteboards: [],
		currentWhiteboard: {},
		project: {}
	};

	async componentDidMount() {
		const {projectId, whiteboardId} = this.props.match.params;
		const whiteboards = await get(`whiteboards/list/${projectId}`);
		const currentWhiteboard = await get(`whiteboards/details/${whiteboardId}`);
		const project = await get(`projects/details/${projectId}`);
		this.setState({whiteboards, currentWhiteboard, project});
	}

	render() {
		return (
			<main id="whiteboard" className="container">
				<Header
					project={this.state.project}
					currentWhiteboard={this.state.currentWhiteboard}
					whiteboards={this.state.whiteboards}
				/>
				<Views views={this.state.currentWhiteboard.views} />
				<FormatJson json={this.state} />
			</main>
		);
	}
}

Whiteboards.propTypes = {
	match: PropTypes.object
};
