const getBorderRadius = props => {
  if (props.buttonStyle === 'round') return '100px';

  if (props.buttonStyle === 'rounded-corners') return '8px';

  return 0;
}

export default {
  button: {
    backgroundColor: '#F9BB1F',
    border: 'none',
    fontSize: '18px',
    color: '#fff',
    padding: '8px 45px',
    outlineStyle: 'none',
    cursor: 'pointer',
    borderRadius: getBorderRadius,
    minHeight: '30px',
    minWidth: props => props.minimumWidth || 0,
    '&:hover':{
      backgroundColor: '#FFB600',
    },
    '&[disabled]':{
      background: '#FCDD8F',
      border: 'none',
      cursor: 'not-allowed'
    },
    '&.ghost': {
      backgroundColor: 'transparent',
      border: 'none',

    }
  },
};
