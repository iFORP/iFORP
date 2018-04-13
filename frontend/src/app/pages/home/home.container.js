import React from 'react';
import {PropTypes} from 'prop-types';

import {http} from '../../base/http';
import {NewProject} from './home.new-project';
import {ProjectList} from './home.project-list';
import {FormatJson} from '../../shared/format-json';

export class Home extends React.Component {

	state = {
		projects: []
	};

	handleNewProject = async () => {
		const newProject = await http.post('projects/create', {name: `Project ${this.state.projects.length + 1}`});
		const newWhiteboard = await http.post(`whiteboards/create/${newProject.id}`, {name: 'Default whiteboard'});
		this.props.history.push(`/whiteboards/project-id/${newProject.id}/whiteboard-id/${newWhiteboard.id}`);
	}

	async componentDidMount() {
		const projects = await http.get('projects/list');
		this.setState({projects});
	}

	render() {
		return (
			<main id="start" className="container">
				<NewProject onNewProject={this.handleNewProject} />
				<ProjectList projects={this.state.projects} />
				<FormatJson json={this.state} />
			</main>
		);
	}
}

Home.propTypes = {
	history: PropTypes.object
};
