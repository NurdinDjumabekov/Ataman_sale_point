//////// hooks
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/////// fns
import { activeDateFN, craeteOrderReq, getInvoiceReq, listInvoiceFN, loadFileInvoiceReq } from 'store/reducers/invoiceSlice';

/////// icons

////// components
import MainCard from 'ui-component/cards/MainCard';
import DatePicker from 'react-datepicker';
import ListInvoice from 'components/DownloadInvoicePage/ListInvoice/ListInvoice';
import GeneratePdfInvoice from 'components/DownloadInvoicePage/GeneratePdfInvoice/GeneratePdfInvoice';
import GeneratePdfCheque from 'components/DownloadInvoicePage/GeneratePdfCheque/GeneratePdfCheque';
import MoreActions from 'components/DownloadInvoicePage/MoreActions/MoreActions';

////// style
import './style.scss';

////// helpers
import { ru } from 'date-fns/locale';
import { format, parse } from 'date-fns';

const OrdersPage = () => {
  const dispatch = useDispatch();

  const { listInvoice, activeDate } = useSelector((state) => state.invoiceSlice);

  const onChangeDate = async (date) => {
    dispatch(activeDateFN(format(date, 'yyyy-MM-dd', { locale: ru })));
    dispatch(getInvoiceReq({ date: format(date, 'yyyy-MM-dd', { locale: ru }), invoice_type: 2 }));
  };

  useEffect(() => {
    getData();
    return () => dispatch(listInvoiceFN([]));
  }, []);

  const getData = () => dispatch(getInvoiceReq({ date: activeDate, invoice_type: 2 }));

  const checkListInvoice = listInvoice?.length == 0;

  const obj = {
    title: (
      <>
        Список заявок ({listInvoice?.length})
        <div className={'headerOrders'}>
          <div className="dateSort">
            <DatePicker
              selected={parse(activeDate, 'yyyy-MM-dd', new Date())}
              onChange={onChangeDate}
              yearDropdownItemNumber={100}
              placeholderText="ДД.ММ.ГГГГ"
              shouldCloseOnSelect={true}
              scrollableYearDropdown
              dateFormat="dd.MM.yyyy"
              locale={ru}
              maxDate={new Date()}
            />
          </div>
          <GeneratePdfCheque listInvoice={listInvoice?.filter((item) => item.check_key == 1)} />
          <GeneratePdfInvoice listInvoice={listInvoice?.filter((item) => item.check_key == 1)} />
          <MoreActions invoice_type={2} />
        </div>
      </>
    )
  };

  const send = () => {
    const obj = {
      action_type: 1,
      comment: 'Всем привет',
      user_guid: '2183A786-C3CC-40E8-B670-17DC90F119DC',
      point_guid: '2183A786-C3CC-40E8-B670-17DC90F119DC',
      fio: 'Продавец',
      type: 2,
      total_sum: 1000,
      total_count: 20,
      list_prod: [
        { name: 'хлэб', price: 25, count: 6, total: 150, unit: 'шт' },
        { name: 'хлэбушек', price: 25, count: 10, total: 250, unit: 'шт' }
      ]
    };
    dispatch(craeteOrderReq(obj));
  };

  const sendSMS = () => {};

  return (
    <MainCard
      title={obj?.title}
      sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 0 } }}
      contentSX={{ padding: 0 }}
    >
      <div className="downloadInvoicePage">
        {!!checkListInvoice ? (
          <div className="emptyData">
            <p>Список пустой</p>
          </div>
        ) : (
          <ListInvoice list={listInvoice} />
        )}
        {/* <button onClick={sendSMS}>asdas</button> */}
      </div>
    </MainCard>
  );
};

export default OrdersPage;
