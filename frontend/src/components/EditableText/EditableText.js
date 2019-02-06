/* eslint-disable filenames/match-exported */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './EditableText.styles';

export class EditableText extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = { isEditing: false, editedText: null };
  }

  handleSetEditMode = () => {
    this.setState(
      { isEditing: true, editedText: this.props.text },
      () => {
        this.inputRef.current.focus();
        this.inputRef.current.select();
      }
    );
  }

  handleInputChange = event => {
    this.setState({ editedText: event.target.value });
  }

  cancelEditing = () => {
    this.setState({ isEditing: false, editedText: null });
  }

  confirmEditing = async () => {
    await this.props.onEditingConfirmed(this.state.editedText);
    this.cancelEditing();
  }

  handleInputKeyDown = event => {
    if (event.key === 'Escape') {
      return this.cancelEditing();
    }

    if (event.key === 'Enter') {
      return this.confirmEditing();
    }
  }

  render() {
    return (
      <div className={ this.props.classes.EditableText } onClick={ this.handleSetEditMode }>
        { !this.state.isEditing &&
          <React.Fragment>
            { this.props.text }
          </React.Fragment>
        }
        { this.state.isEditing &&
          <input
            type='text'
            ref={ this.inputRef }
            value={ this.state.editedText }
            onChange={ this.handleInputChange }
            onBlur={ this.cancelEditing }
            onKeyDown={ this.handleInputKeyDown }
            minLength={ this.props.minLength || 5 }
            maxLength={ this.props.maxLength || 20 }
          />
        }
      </div>
    )
  }
}

export default injectSheet(styles)(EditableText);
