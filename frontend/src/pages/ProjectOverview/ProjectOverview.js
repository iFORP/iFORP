import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import styles from './ProjectOverview.styles';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ButtonTile from '../../components/Button/ButtonTile';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProjectButtonBar from '../../components/ProjectButtonBar/ProjectButtonBar';
import EditableName from '../../components/EditableName/EditableName';
import CircleButton from '../../components/Button/CircleButton';
import PlusIcon from '../../assets/img/Plus';
import { createNewProject, renameProject, deleteProject } from '../../actions/app-actions';

class ProjectOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' }
  }

  handleCreateProjectClick = () => {
    this.props.createNewProject();
  }

  handleDeleteProjectClick = projectId => {
    this.props.deleteProject(projectId);
  }

  navigateToProject = projectId => {
    this.props.history.push(`projects/${projectId}`);
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    if (!this.props.projects) return null;

    const filteredProjects = this.state.searchTerm ?
      this.props.projects.filter(project => project.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) :
      this.props.projects;

    return (
      <React.Fragment>
        <NavBar title={ `iFORP > Projektübersicht` } />
        <div className={ this.props.classes.ProjectOverview }>
          <SearchBar searchTerm={ this.state.searchTerm } onChange={ this.handleSearchTermChange } />
          <ElementGrid>
            { filteredProjects.map(project =>
              <ButtonTile
                key={ project.id }
                titleBelow
                onClick={ () => this.navigateToProject(project.id ) }
                onDeleteClick={() => this.handleDeleteProjectClick(project.id)}>
                <EditableName
                  name={ project.name }
                  onEditingConfirmed={ newName => this.props.renameProject(project.id, newName) }
                />
              </ButtonTile>
            )}
          </ElementGrid>
        </div>
        <ProjectButtonBar includeNavigationMenu={ true }>
          <div />
          <CircleButton onClick={ this.handleCreateProjectClick }>
            <PlusIcon />
          </CircleButton>
        </ProjectButtonBar>
      </React.Fragment>
    );
  }
}

const actions = { createNewProject, renameProject, deleteProject };

const mapStateToProps = state => ({
  projects: state.app.projects
});

const ProjectOverviewContainerWithStyles = injectSheet(styles)(ProjectOverview);
export default connect(mapStateToProps, actions)(ProjectOverviewContainerWithStyles);
