import Panel from './panel';
import PackageNav from './package-nav';

export default [
  {
    extensionPoint: 'examples-info-panel',
    extension: {
      Component: Panel,
      meta: {
        label: 'Bad code stats',
      },
    },
  },
  {
    extensionPoint: 'package-navigation',
    extension: {
      Component: PackageNav,
      meta: {
        heading: 'Bad code stats',
      },
    },
  },
];
