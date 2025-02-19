// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

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
      icon: InventoryOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Заявки',
      type: 'item',
      url: '/utils/orders',
      icon: NoteAddOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'prods',
      title: 'Список товаров',
      type: 'item',
      url: '/utils/prods',
      icon: ReceiptLongOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: 'user',
      title: 'Пользователи',
      type: 'item',
      url: '/users/info',
      icon: PeopleOutlineOutlinedIcon,
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
