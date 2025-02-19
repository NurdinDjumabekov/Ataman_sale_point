//////// hooks
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/////// fns
import { activeDateFN, getInvoiceReq, listInvoiceFN, loadFileInvoiceReq } from 'store/reducers/invoiceSlice';

/////// icons
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

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
import { myAlert } from 'helpers/myAlert';

const DownloadInvoicePage = () => {
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const { listInvoice, activeDate } = useSelector((state) => state.invoiceSlice);

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const formData = new FormData();
      formData.append('file', droppedFile);
      const res = await dispatch(loadFileInvoiceReq(formData)).unwrap();
      e.target.value = '';
      if (!!res) {
        myAlert('Накладная добавлена в список');
        dispatch(getInvoiceReq({ date: format(new Date(), 'yyyy-MM-dd', { locale: ru }), invoice_type: 1 }));
        dispatch(activeDateFN(format(new Date(), 'yyyy-MM-dd', { locale: ru })));
      }
    }
  };

  const onChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', selectedFile?.name);
      const res = await dispatch(loadFileInvoiceReq(formData)).unwrap();
      e.target.value = '';
      if (!!res) {
        myAlert('Накладная добавлена в список');
        dispatch(getInvoiceReq({ date: format(new Date(), 'yyyy-MM-dd', { locale: ru }), invoice_type: 1 }));
        dispatch(activeDateFN(format(new Date(), 'yyyy-MM-dd', { locale: ru })));
      }
    }
  };

  const onChangeDate = async (date) => {
    dispatch(activeDateFN(format(date, 'yyyy-MM-dd', { locale: ru })));
    dispatch(getInvoiceReq({ date: format(date, 'yyyy-MM-dd', { locale: ru }), invoice_type: 1 }));
  };

  //// чтобы избежать открытия файла в браузере и перезагрузки страницы
  const handleDragOver = (e) => e.preventDefault();
  //// нажатте на button => открытие кнопки
  const handleButtonClick = () => fileInputRef.current.click();

  useEffect(() => {
    getData();
    return () => dispatch(listInvoiceFN([]));
  }, []);

  const getData = () => dispatch(getInvoiceReq({ date: activeDate, invoice_type: 1 }));

  const checkListInvoice = listInvoice?.length == 0;

  return (
    <MainCard
      title={`Список накладных (${listInvoice?.length})`}
      sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 0px)', padding: 0 } }}
      contentSX={{ padding: 0 }}
    >
      <div className="downloadInvoicePage" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className={checkListInvoice ? 'header' : 'header headerBig'}>
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
          <button onClick={handleButtonClick} className="downloadFileSecond">
            <DownloadOutlinedIcon />
            <p>Загрузить файл</p>
          </button>
          <MoreActions invoice_type={1} />
        </div>

        {!!checkListInvoice ? (
          <button onClick={handleButtonClick} className="downloadFileMain">
            <DownloadOutlinedIcon />
            <p>Загрузить файл</p>
          </button>
        ) : (
          <ListInvoice list={listInvoice} />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </MainCard>
  );
};

export default DownloadInvoicePage;
