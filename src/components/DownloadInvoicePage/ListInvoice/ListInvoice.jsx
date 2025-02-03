////// hooks
import React from 'react';
///// components
///// fns
///// helpers
///// icons
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
///// style
import './style.scss';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { crudInvoiceReq, listInvoiceFN } from 'store/reducers/invoiceSlice';

const ListInvoice = (props) => {
  const { listInvoice } = props;

  const dispatch = useDispatch();

  const listTitel = [
    { name: 'ЭЛИМЕ 1-я ул. 52,  ж/м Оскон-Ордо' },
    { name: '333 ул.Фрунзе/Деповская' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' },
    { name: 'АДЕМИ ж/м Ала-Тоо ул. Талды-Булак 39 тел: 0502 185-975 Жаныл эже.' }
  ];

  const onChange = async (invoice) => {
    const send = {
      action_type: 2,
      invoice_guid: invoice?.invoice_guid,
      check_key: invoice?.check_key == 1 ? 0 : 1
    };
    const res = await dispatch(crudInvoiceReq(send)).unwrap();

    const list = listInvoice?.map((item) => {
      if (item?.invoice_guid == invoice?.invoice_guid) {
        return { ...item, check_key: invoice?.check_key == 1 ? 0 : 1 };
      } else {
        return item;
      }
    });
    dispatch(listInvoiceFN(list));

    if (!!!res) {
      const listRevers = listInvoice?.map((item) => {
        if (item?.invoice_guid == invoice?.invoice_guid) {
          return { ...item, check_key: invoice?.check_key != 1 ? 0 : 1 };
        } else {
          return item;
        }
      });
      dispatch(listInvoiceFN(listRevers));
    }
  };

  return (
    <div className="invoice-container">
      {/* <div className="titles">
        {listTitel?.map((item, index) => (
          <div key={index}>
            <p>{item?.name}</p>
            <ArrowForwardIosRoundedIcon />
          </div>
        ))}
      </div> */}
      <div className="prods">
        {listInvoice?.map((invoice, index) => (
          <div key={index} className="invoice-card">
            <h2>{invoice?.order_point_name}</h2>
            <div className="info">
              <p>{invoice?.point_name}</p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!invoice?.check_key}
                    onChange={() => onChange(invoice)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                  />
                }
              />
            </div>
            <div className="product-list">
              <table className="product-table">
                <thead>
                  <tr>
                    <th align="center" style={{ textAlign: 'center' }}>
                      №
                    </th>
                    <th>Название товара</th>
                    <th>Ед. изм.</th>
                    <th>Кол-во</th>
                    <th>Цена</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.prods?.map((product, index) => (
                    <tr key={index}>
                      <td align="center" style={{ textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td>{product?.product_name}</td>
                      <td>{product?.unit}</td>
                      <td>{product?.count}</td>
                      <td>{product?.price} сом</td>
                      <td>{product?.total} сом</td>
                    </tr>
                  ))}
                  <tr key={index}>
                    <td align="center"></td>
                    <td>Итого</td>
                    <td>{}</td>
                    <td>{invoice?.total_count}</td>
                    <td>{}</td>
                    <td>{invoice?.total_price} сом</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListInvoice;
