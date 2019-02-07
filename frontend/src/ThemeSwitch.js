import React from 'react';
import themes from './theme';
import { ThemeProvider } from 'react-jss';
const availableThemes = Object.keys(themes);
let currentTheme = window.localStorage.getItem('iforp.theme') || availableThemes[0];
const themeChangeListeners = [];

export const switchTheme = theme => {
  if (availableThemes.indexOf(theme) === -1) {
    return;
  }

  window.localStorage.setItem('iforp.theme', theme);
  currentTheme = theme;
  themeChangeListeners.forEach(listener => listener(theme));
};

export const getCurrentThemeName = () => currentTheme;

export const getAvailableThemes = () => [...availableThemes];

export const onThemeChange = listener => {
  themeChangeListeners.push(listener);
  return () => {
    themeChangeListeners.filter(l => l !== listener);
  };
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: currentTheme,
    };
    this.onThemeChangeUnregister = onThemeChange(theme =>
      this.setState({ theme })
    );
  }

  componentWillUnmount() {
    this.onThemeChangeUnregister();
  }

  render() {
    return (
      <ThemeProvider theme={themes[currentTheme]}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
