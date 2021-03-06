import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Card from '../Card/Card';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Toggle from '../Toggle/Toggle';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'signIn'
    };
  }

  render() {
    return (
      <div className={ this.props.classes.LoginForm}>
        <Card>
          <Toggle
            labelLeft="Anmelden"
            labelRight="Registrieren"
            isActive={this.state.mode === 'signUp'}
            onToggle={enabled => {
              this.setState({ mode: enabled === true ? 'signUp' : 'signIn' });
            }}
          />
          {this.state.mode === 'signIn' && (
            <SignInForm handleSignIn={this.props.handleSignIn} error={this.props.signInError} />
          )}
          {this.state.mode === 'signUp' && (
            <SignUpForm handleSignUp={this.props.handleSignUp} error={this.props.signUpError} />
          )}
        </Card>
      </div>
    );
  }
}

const styles = theme => ({
  LoginForm: {
    marginTop: '140px',
    marginRight: '180px',
    marginLeft: '50px',
    width: '420px',
    height: '465px'
  },
  FormSwitch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 60px',
    '& .active': {
      color: theme.accentColor,
    },
  },
  FormSelect: {
    fontSize: '18px',
    cursor: 'pointer',
    userSelect: 'none',
  },
});

export default injectSheet(styles)(LoginForm);
