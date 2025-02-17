//////// hooks
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

////// icons
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

////// style
import './style.scss';
import { format } from 'date-fns';

////// fns
import { crudInvoiceMoreReq, getInvoiceReq } from 'store/reducers/invoiceSlice';
import { ru } from 'date-fns/locale';

/////// components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';
import { myAlert } from 'helpers/myAlert';

export default function MoreActions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [del, setDel] = useState(false);

  const dispatch = useDispatch();

  const { activeDate } = useSelector((state) => state.invoiceSlice);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const editCheckKeyFN = async (check_key) => {
    const send = { action_type: 1, date: activeDate, check_key };
    setAnchorEl(null);
    const res = await dispatch(crudInvoiceMoreReq(send)).unwrap();
    if (!!res) dispatch(getInvoiceReq({ date: activeDate }));
  };

  const delAllInvoiceFN = async () => {
    const send = { action_type: 2, date: activeDate };
    setAnchorEl(null);
    setDel(false);
    const res = await dispatch(crudInvoiceMoreReq(send)).unwrap();
    if (!!res) {
      dispatch(getInvoiceReq({ date: activeDate }));
      myAlert('Накладные удалены');
    }
  };

  const closeModal = () => {
    setDel(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <button id="demo-customized-button" onClick={handleClick} className="moreActinBtn">
        <p>...</p>
      </button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={closeModal}
      >
        {/* <MenuItem onClick={handleClose}>
          <DeleteIcon />
          Удалить последние данные
        </MenuItem> */}
        <MenuItem onClick={() => editCheckKeyFN(1)}>
          <CheckBoxIcon />
          Отметить все накладные
        </MenuItem>
        <MenuItem onClick={() => editCheckKeyFN(0)}>
          <CheckBoxOutlineBlankIcon />
          Удалить метки у всех накладных
        </MenuItem>
        <MenuItem onClick={() => setDel(true)}>
          <DeleteIcon />
          Удалить накладные за {activeDate}
        </MenuItem>
      </StyledMenu>
      <ConfirmModal state={del} title="Удалить накладные за сегодняшнюю дату?" yesFN={delAllInvoiceFN} noFN={closeModal} />
    </div>
  );
}

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300]
    })
  }
}));
