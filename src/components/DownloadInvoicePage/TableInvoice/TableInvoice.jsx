////// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// ////// fns

////// components
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox } from '@mui/material';

////// helpers
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';
import { myAlert } from 'helpers/myAlert';

////// icons
import DeleteIcon from 'assets/MyIcons/DeleteIcon';

////// styles
import { styleCategName, styleCategBox, styleInnerTable, obj52, obj82 } from './style';
import './style.scss';

import { crudInvoiceReq, listInvoiceFN } from 'store/reducers/invoiceSlice';

const TableInvoice = (props) => {
  const { item } = props;
  const dispatch = useDispatch();

  const { listInvoice } = useSelector((state) => state.invoiceSlice);

  const [del, setDel] = useState('');

  const clickInvoice = ({ invoice_guid, is_open }) => {
    const copyList = listInvoice;
    const list = listInvoice?.map((item) => {
      if (item?.invoice_guid == invoice_guid) {
        return { ...item, is_open: !!is_open ? 0 : 1 };
      } else return item;
    });
    dispatch(listInvoiceFN(list));
  };

  const editInvoiceFN = async (invoice) => {
    const send = {
      action_type: 2,
      invoice_guid: invoice?.invoice_guid,
      check_key: invoice?.check_key == 1 ? 0 : 1
    };
    const res = await dispatch(crudInvoiceReq(send)).unwrap();
    const list = listInvoice?.map((item) => {
      if (item?.invoice_guid == invoice?.invoice_guid) {
        return { ...item, check_key: invoice?.check_key == 1 ? 0 : 1 };
      } else return item;
    });
    dispatch(listInvoiceFN(list));
    if (!!!res) {
      const listRevers = listInvoice?.map((item) => {
        if (item?.invoice_guid == invoice?.invoice_guid) {
          return { ...item, check_key: invoice?.check_key != 1 ? 0 : 1 };
        } else return item;
      });
      dispatch(listInvoiceFN(listRevers));
    }
  };

  const delInvoiceFN = async () => {
    const newListFN = listInvoice?.filter((c) => c?.invoice_guid != del);
    const send = { action_type: 2, status: -1, invoice_guid: del };
    setDel('');
    const res = await dispatch(crudInvoiceReq(send)).unwrap();
    if (!!res) {
      myAlert('Накладная удалена');
      dispatch(listInvoiceFN(newListFN));
    } else myAlert('Упс, повторите пожалуйста еще раз', 'error');
  };

  return (
    <>
      <TableRow sx={styleInnerTable}>
        <TableCell sx={{ width: 75, minWidth: 75, padding: 0, border: 'none' }} onClick={() => clickInvoice(item)}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton aria-label="expand row" size="small">
              {!!item?.is_open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </div>
        </TableCell>
        <TableCell sx={styleCategName} onClick={() => clickInvoice(item)}>
          {item?.order_point_name} ({item?.point_name})
        </TableCell>
        <TableCell sx={styleCategBox}>
          <div className="actionsInv">
            <div onClick={() => editInvoiceFN(item)}>
              <Checkbox checked={!!item?.check_key} sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }} />
            </div>
            <div style={{ height: 21 }} onClick={() => setDel(item?.invoice_guid)}>
              <DeleteIcon width="20" height="20" color="red" />
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={!!item?.is_open} timeout={'auto'}>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {item?.prods?.map((i, ind) => (
                  <TableRow key={ind}>
                    <TableCell sx={obj52} onClick={() => editStatus(i)}>
                      <p style={{ textAlign: 'center', fontWeight: 400 }}>{ind + 1}</p>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 13, fontWeight: 400, width: '50%' }}
                      style={{ padding: '10px' }}
                      onClick={() => editStatus(i)}
                    >
                      {i?.product_name || '...'}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, fontWeight: 400 }} style={{ padding: '10px' }} onClick={() => editStatus(i)}>
                      {i?.count} {i?.unit}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, fontWeight: 400 }} style={{ padding: '10px' }} onClick={() => editStatus(i)}>
                      {i?.price} сом
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, fontWeight: 400 }} style={{ padding: '10px' }} onClick={() => editStatus(i)}>
                      {i?.total} сом
                    </TableCell>
                    <TableCell sx={obj82}>
                      <div style={{ display: 'flex', padding: 10, alignItems: 'center' }}>
                        <div onClick={() => editStatus(i)}>
                          {/* <Checkbox checked={!!i?.status} sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }} /> */}
                        </div>
                        {/* <div style={{ height: 21 }} onClick={() => setDel(i)}>
                          <DeleteIcon width="20" height="20" color="red" />
                        </div> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell style={{ padding: 0, paddingLeft: 33 }}>Итого</TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 400 }} style={{ padding: '10px' }}>
                    {item?.total_count} шт
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 400 }} style={{ padding: '10px' }} onClick={() => editStatus(i)}>
                    {item?.total_price} сом
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <ConfirmModal state={!!del} title="Удалить накладную?" yesFN={delInvoiceFN} noFN={() => setDel('')} />
    </>
  );
};

export default TableInvoice;

TableInvoice.propTypes = {
  row: PropTypes.shape({
    ind: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    prods: PropTypes.arrayOf(
      PropTypes.shape({
        ind: PropTypes.number.isRequired,
        historyRow: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};
