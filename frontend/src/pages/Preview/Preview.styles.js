import config from '../../config';

export default theme => ({
  Preview: {
    height: '100%',
    width: '100%',
    '& .nav-bar': {
      margin: 0
    },
    '& main': {
      '& .content': {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '80px',
        '&.WithAnnotations': {
          marginBottom: '220px'
        },
        '& .preview-wrapper': {
          height: '100vh',
          flexShrink: 0,
          flexGrow: 1,
          '&.desktop': { maxWidth: `${config.viewportWidthDesktop}px` },
        	'&.tablet': { maxWidth: `${config.viewportWidthTablet}px` },
        	'&.phone': { maxWidth: `${config.viewportWidthPhone}px` },
        }
      }
    }
  }
});
