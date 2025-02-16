// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DownloadInvoicePage from 'views/DownloadInvoicePage/DownloadInvoicePage';

const utilities = {
  id: 'Главное',
  title: 'Главное',
  type: 'group',
  children: [
    {
      id: 'download',
      title: 'Список накладных',
      type: 'item',
      url: '/utils/download-invoice',
      icon: DownloadOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/utils/util-typography',
      icon: IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/utils/util-color',
      icon: IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/util-shadow',
      icon: IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
