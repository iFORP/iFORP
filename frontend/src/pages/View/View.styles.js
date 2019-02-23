import config from '../../config';
import { NavBarHeight } from '../../components/NavBar/NavBar';

export default () => ({
  View: {
    height: '100%',
    width: '100%',
    '& main': {
      height: 'calc(100% - 120px)',
      display: 'flex',
      alignItems: 'stretch',
      paddingTop: `${NavBarHeight}`,
      '& .content': {
        padding: '20px',
        display: 'flex',
        flexGrow: 1,
        '& .preview-wrapper': {
          height: '100vh',
          flexGrow: 1,
          flexShrink: 0,
          '&.desktop': { maxWidth: `${config.viewportWidthDesktop}px` },
        	'&.tablet': { maxWidth: `${config.viewportWidthTablet}px` },
        	'&.phone': { maxWidth: `${config.viewportWidthPhone}px` },
        },
      }
    }
  }
});
