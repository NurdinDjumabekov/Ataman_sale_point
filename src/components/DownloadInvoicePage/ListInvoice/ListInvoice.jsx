////// hooks
import React from 'react';
///// components
///// fns
///// helpers
///// icons
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
///// style
import './style.scss';

const ListInvoice = (props) => {
  const { listInvoice } = props;

  console.log(listInvoice, 'listInvoice');

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

  return (
    <div className="invoice-container">
      <div className="titles">
        {listTitel?.map((item) => (
          <div>
            <p>{item?.name}</p>
            <ArrowForwardIosRoundedIcon />
          </div>
        ))}
      </div>
      <div className="prods">
        {listInvoice?.map((invoice, index) => (
          <div key={index} className="invoice-card">
            <h2>{invoice?.title}</h2>
            <p>{invoice?.desc}</p>
            <p>Общее количество: {invoice?.total_count_invoice}</p>
            <p className="last">Общая сумма: {invoice?.total_sum} сом</p>
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
                  {invoice.prod.map((product, index) => (
                    <tr key={index}>
                      <td align="center" style={{ textAlign: 'center' }}>
                        {index + 1}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.unit}</td>
                      <td>{product.count}</td>
                      <td>{product.price} сом</td>
                      <td>{product.total} сом</td>
                    </tr>
                  ))}
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
