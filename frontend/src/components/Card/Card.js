import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';

const Card = ({ classes, children }) => (
  <div className={classes.Card}>{children}</div>
);

export default injectSheet(styles)(Card);
