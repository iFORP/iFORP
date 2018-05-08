import React from 'react';
import {PropTypes} from 'prop-types';

import {FormatJson} from '../../shared/format-json';
import {Header} from './library.header';
import {http} from '../../base/http';
import {Treeview} from './library.treeview';

export class Library extends React.Component {

	state = {
		view: null,
		directories: [],
		selectedPageId: null
	};

	handlePageClick = pageId => {
		this.setState({selectedPageId: pageId});
	}

	async componentDidMount() {

		// Get ID from path parameters
		const {viewId} = this.props.match.params;
		this.setState({view: viewId});

		// Get directories and files from the backend
		const directories = await http.get('library/directories');
		this.setState(directories);
	}

	render() {
		return (
			<main id="" className="container">
				<Header projectId={this.props.match.params.projectId} whiteboardId={this.props.match.params.whiteboardId} />
				<div className="row">
					<div className="col-3">
						{this.state.directories.length ? <Treeview
							onPageSelection={this.handlePageClick}
							directories={this.state.directories}
							selectedPageId={this.state.selectedPageId}
						/> : false}
						<a href="#" className="btn btn-secondary btn-sm">Upload new templates</a>
					</div>
					<div className="col-9">
						<div className="card">
							<div className="card-body">
							HTML Preview
							</div>
						</div>
						<div className="d-flex justify-content-end mt-3">
							<button className="btn btn-primary" disabled={!this.state.selectedPageId}>Template verwenden</button>
						</div>
					</div>
				</div>
				<FormatJson state={this.state}></FormatJson>
			</main>
		);
	}
}

Library.propTypes = {
	match: PropTypes.object
};
