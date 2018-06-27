import React from 'react';
import { PropTypes } from 'prop-types';

import { FormatJson } from '../../../shared/format-json'; // eslint-disable-line no-unused-vars
import { http } from '../../../base/http';
import { Header } from '../shared/view.header';
import { Iframe } from '../../../shared/iframe';
import { LinkEditor } from './edit-view-link-editor';

export class EditView extends React.Component {
  state = {
    currentView: {
      id: null,
      name: '',
      htmlElementAttributes: {},
      head: '',
      body: '',
      interactionElements: [],
      assets: []
    },
    availableViews: [],
    viewportSize: 'desktop'
  };

  handleViewportChange = updatedViewportSize => {
    this.setState({ viewportSize: updatedViewportSize });
  };

  handleTargetViewChange = async (interactionElementId, targetViewId) => {
    const { projectId, whiteboardId, viewId } = this.props.match.params;

    // Update state
    this.setState(prevState => {
      const interactionElements = prevState.currentView.interactionElements.map(
        element => {
          element.targetViewId =
            element.id === interactionElementId
              ? targetViewId
              : element.targetViewId;
          return element;
        }
      );

      return {
        ...prevState,
        currentView: {
          ...prevState.currentView,
          interactionElements
        }
      };
    });

    // Save changes
    const updatedView = await http.patch(
      `projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`,
      this.state.currentView.interactionElements
    );
    this.setState({ currentView: updatedView });
  };

  async componentDidMount() {
    // Get IDs from path params
    const { projectId, whiteboardId, viewId } = this.props.match.params;

    const currentView = await http.get(
      `projects/${projectId}/whiteboards/${whiteboardId}/views/${viewId}`
    );
    const availableViews = await http.get(
      `projects/${projectId}/whiteboards/${whiteboardId}/views`
    );
    this.setState({ currentView, availableViews });
  }

  render() {
    return (
      <main id="whiteboard" className="container">
        <Header
          name={this.state.currentView.name}
          projectId={this.props.match.params.projectId}
          whiteboardId={this.props.match.params.whiteboardId}
        />
        <div className="row">
          <div className="col-9">
            <div className="preview-wrapper">
              <Iframe
                htmlElementAttributes={
                  this.state.currentView.htmlElementAttributes || {}
                }
                head={this.state.currentView.head}
                body={this.state.currentView.body}
                assets={this.state.currentView.assets}
                viewportSize={this.state.viewportSize}
              />
            </div>
          </div>
          <div className="col-3">
            <LinkEditor
              interactionElements={this.state.currentView.interactionElements}
              availableViews={this.state.availableViews}
              onChangeTargetView={this.handleTargetViewChange}
            />
          </div>
        </div>
        <FormatJson state={this.state} />
      </main>
    );
  }
}

EditView.propTypes = {
  match: PropTypes.object
};
