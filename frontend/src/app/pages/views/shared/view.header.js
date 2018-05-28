import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const Header = ({ name, projectId, whiteboardId }) => (
  <div className="row text-center mb-4">
    <div className="col-2 text-left align-self-center">
      <Link to={`/whiteboards/project/${projectId}/whiteboard/${whiteboardId}`}>
        <span className="oi oi-chevron-left" />
      </Link>
    </div>
    <div className="col-8">
      <h1 className="h2">{name}</h1>
    </div>
    <div className="col-2 text-right align-self-center" />
  </div>
);

Header.propTypes = {
  name: PropTypes.string,
  projectId: PropTypes.string,
  whiteboardId: PropTypes.string
};
