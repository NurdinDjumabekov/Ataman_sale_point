import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import DownloadInvoicePage from 'views/DownloadInvoicePage/DownloadInvoicePage';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'utils',
      children: [{ path: 'download-invoice', element: <DownloadInvoicePage /> }]
    },
    {
      path: 'utils',
      children: [{ path: 'util-typography', element: <UtilsTypography /> }]
    },
    {
      path: 'utils',
      children: [{ path: 'util-color', element: <UtilsColor /> }]
    },
    {
      path: 'utils',
      children: [{ path: 'util-shadow', element: <UtilsShadow /> }]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
