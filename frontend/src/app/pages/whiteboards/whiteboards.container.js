import React from 'react';
import {PropTypes} from 'prop-types';

import {http} from '../../base/http';
import {FormatJson} from '../../shared/format-json';
import {Header} from './whiteboards.header';
import {Views} from './whiteboards.views';

export class Whiteboards extends React.Component {

	state = {
		whiteboards: [],
		currentWhiteboard: {},
		project: {}
	};

	deleteWhiteboard = async (whiteboard) => {
		await http.delete(`whiteboards/delete/${whiteboard.id}`);

		// Need to get the first whiteboard of the project in case the currently visited is deleted.
		if (this.state.currentWhiteboard.id === whiteboard.id) {
			const whiteboards = await http.get(`whiteboards/list/${this.state.project.id}`);
			this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${whiteboards[0].id}`, {
				whiteboard: whiteboards[0]
			});
		} else {
			this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${this.state.currentWhiteboard.id}`, {whiteboard});
		}
	}

	createNewWhiteboard = async () => {
		const whiteboard = await http.post(`whiteboards/create/${this.state.project.id}`, {name: 'New whiteboard'});
		this.props.history.push(`/whiteboards/project-id/${this.state.project.id}/whiteboard-id/${whiteboard.id}`, {whiteboard});
	}

	async getData(projectId, whiteboardId) {
		const whiteboards = await http.get(`whiteboards/list/${projectId}`);

		// Need to get the whiteboard from the response in case someone opens a project via
		// /whiteboards/project-id/:projectId instead of
		// /whiteboards/project-id/:projectId/whiteboard-id/:whiteboardId
		if (!whiteboardId) {
			whiteboardId = whiteboards[0].id;
		}
		const currentWhiteboard = await http.get(`whiteboards/details/${whiteboardId}`);
		const project = await http.get(`projects/details/${projectId}`);
		return {whiteboards, currentWhiteboard, project};
	}

	async componentDidMount() {

		// Get IDs from path parameters
		const {projectId, whiteboardId} = this.props.match.params;
		this.setState(await this.getData(projectId, whiteboardId));
	}

	async componentWillReceiveProps(nextProps) {

		// Get whiteboard ID from click on dropdown item in whiteboards.header.js
		const whiteboardId = nextProps.location.state.whiteboard.id;
		const {projectId} = this.props.match.params;
		this.setState(await this.getData(projectId, whiteboardId));
	}

	render() {
		return (
			<main id="whiteboard" className="container">
				<Header
					project={this.state.project}
					currentWhiteboard={this.state.currentWhiteboard}
					whiteboards={this.state.whiteboards}
					onCreateNewWhiteboard={this.createNewWhiteboard}
					onDeleteWhiteboard={this.deleteWhiteboard}
				/>
				<Views views={this.state.currentWhiteboard.views} />
				<FormatJson
					project={this.state.project}
					whiteboards={this.state.whiteboards}
					currentWhiteboard={this.state.currentWhiteboard}
				/>
			</main>
		);
	}
}

Whiteboards.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object
};
