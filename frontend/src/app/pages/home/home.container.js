import React from 'react';
import {PropTypes} from 'prop-types';

import {get, post} from '../../base/http';
import {NewProject} from './home.new-project';
import {ProjectList} from './home.project-list';
import {FormatJson} from '../../shared/format-json';

export class Home extends React.Component {

	state = {
		projects: []
	};

	amountOfProjectsToShow = 3;

	handleNewProject = async () => {
		const newProject = await post('projects/create', {name: `Project ${this.state.projects.length + 1}`});
		const newWhiteboard = await post('whiteboards/create', {name: 'Default whiteboard'});
		this.props.history.push(`/whiteboards/project-id/${newProject.id}/whiteboard-id/${newWhiteboard.id}`);
	}

	async componentDidMount() {
		const projects = await get('projects/list');
		this.setState({projects});
	}

	render() {
		return (
			<main id="start" className="container">
				<NewProject onNewProject={this.handleNewProject} />
				<ProjectList projects={this.state.projects.filter((project, index) => index < this.amountOfProjectsToShow)} />
				<FormatJson json={this.state} />
			</main>
		);
	}
}

Home.propTypes = {
	history: PropTypes.object
};
